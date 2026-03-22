import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Candidate from '@/models/Candidate';

export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const constituencyId = searchParams.get('constituencyId');
    const party = searchParams.get('party');
    const search = searchParams.get('search');
    
    if (id) {
      const candidate = await Candidate.findById(id);
      if (!candidate) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
      const obj = candidate.toObject();
      return NextResponse.json({ 
        success: true, 
        candidate: { ...obj, id: obj._id.toString() } 
      });
    }

    let query: any = {};

    if (constituencyId) {
      query.constituency = constituencyId;
    }

    if (party && party !== 'All') {
      query.party = { $regex: new RegExp(`^${party}$`, 'i') };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { constituency: { $regex: search, $options: 'i' } }
      ];
    }

    const candidates = await Candidate.find(query).sort({ name: 1 });

    const formattedCandidates = candidates.map(c => {
      const obj = c.toObject();
      return { ...obj, id: obj._id.toString() };
    });

    return NextResponse.json({
      success: true,
      count: candidates.length,
      candidates: formattedCandidates
    });
  } catch (error: any) {
    console.error('API_GET_CANDIDATES_ERROR:', error);
    return NextResponse.json(
      { success: false, error: 'Database synchronization failed' },
      { status: 500 }
    );
  }
}
