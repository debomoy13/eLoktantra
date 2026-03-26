import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { getBackendUrl, ADMIN_API_KEY } from '@/lib/api/config';

// Critical: Set max duration for Render/Vercel to survive cold starts
export const maxDuration = 60; 
export const dynamic = 'force-dynamic';

// Simple in-memory cache to prevent "flooding" Render with identical requests
const cache = new Map<string, { data: any, timestamp: number }>();
const CACHE_TTL = 30000; // 30 seconds

const ACTUAL_BACKEND = getBackendUrl();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const candidateId = searchParams.get('candidateId');
  
  if (!candidateId) {
    return NextResponse.json({ success: false, error: 'Candidate ID required' }, { status: 400 });
  }

  // Check Cache
  const cached = cache.get(candidateId);
  if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
    return NextResponse.json(cached.data);
  }

  // Optimized proxy with fewer retries and localized timeout
  const maxRetries = 1; // Only 1 retry (max 2 attempts) to prevent "78s" hangs
  let lastError = null;

  for (let attempt = 0; attempt < (maxRetries + 1); attempt++) {
    try {
      const response = await axios.get(`${ACTUAL_BACKEND}/api/admin/manifesto`, {
        params: { candidateId },
        headers: { 'x-admin-key': ADMIN_API_KEY },
        timeout: 25000, // 25s timeout (slightly under Render's 30s limit)
      });

      const data = response.data;
      const list = Array.isArray(data) ? data : (data.manifestos || data.data || []);
      
      const result = { 
        success: true, 
        count: list.length, 
        manifestos: list.map((m: any) => ({ ...m, id: m.id || m._id?.toString() })) 
      };

      // Update Cache
      cache.set(candidateId, { data: result, timestamp: Date.now() });
      
      return NextResponse.json(result);
    } catch (err: any) {
      console.warn(`Manifesto fetch attempt ${attempt + 1} failed:`, err.message);
      lastError = err;
      
      // Only retry if it's potentially a transient cold-start issue
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  console.error('Manifesto proxy ultimate failure:', lastError?.message);
  return NextResponse.json({ 
    success: false, 
    error: 'Source of truth taking too long', 
    detail: lastError?.message 
  }, { status: 504 }); // 504 Gateway Timeout is more accurate
}
