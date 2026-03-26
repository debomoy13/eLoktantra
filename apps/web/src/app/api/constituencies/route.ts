import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { getBackendUrl } from '@/lib/api/config';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const ACTUAL_BACKEND = getBackendUrl();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const electionId = searchParams.get('electionId');

    const res = await axios.get(`${ACTUAL_BACKEND}/api/constituencies`, {
      params: { electionId },
      timeout: 45000
    });

    // Senior Fix: Standardize response shape
    const result = res.data;
    const list = result.constituencies || result.data || result.list || [];

    return NextResponse.json({ 
      success: true, 
      count: list.length, 
      constituencies: list.map((c: any) => ({
        ...c,
        _id: c.id || c._id // Support both ID formats
      }))
    });
  } catch (err: any) {
    console.error('Constituencies fetch failed:', err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 502 });
  }
}
