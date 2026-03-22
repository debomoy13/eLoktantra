'use client';

import Link from 'next/link';
import { useCandidate } from '@/lib/api/candidates';
import { useParams } from 'next/navigation';

export default function CandidateProfilePage() {
  const params = useParams();
  const id = params?.id as string;
  const { data: candidate, isLoading, isError } = useCandidate(id);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 min-h-screen">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-gray-500 font-black uppercase tracking-widest text-[10px]">Loading Audit Data...</p>
      </div>
    );
  }

  if (isError || !candidate) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-black text-white mb-4">CANDIDATE NOT FOUND</h2>
        <Link href="/candidates" className="text-primary font-bold">Return to Directory</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/candidates" className="group flex items-center text-gray-500 hover:text-primary font-bold transition-colors">
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Candidates
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Header Region - Left Col */}
          <div className="lg:col-span-4">
            <div className="glass-card p-10 text-center sticky top-24 border-white/5">
              <div className="w-32 h-32 rounded-3xl bg-secondary/50 flex items-center justify-center font-black text-5xl text-primary mx-auto mb-8 shadow-2xl overflow-hidden shadow-primary/20">
                {candidate.photo_url ? (
                  <img src={candidate.photo_url} alt={candidate.name} className="w-full h-full object-cover" />
                ) : (
                  candidate.name.charAt(0)
                )}
              </div>
              <h1 className="text-3xl font-black mb-2 orange-text-gradient uppercase tracking-tight">{candidate.name}</h1>
              <p className="text-lg text-gray-400 font-bold mb-8">{candidate.party}</p>
              
              <div className="space-y-4 pt-8 border-t border-white/5">
                <div className="bg-secondary/50 p-4 rounded-2xl border border-white/5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Constituency</div>
                  <div className="text-lg font-bold text-gray-200">{candidate.constituency}</div>
                </div>
                <div className={`p-4 rounded-2xl border ${candidate.criminal_cases > 0 ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-green-500/10 border-green-500/20 text-green-500'}`}>
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Criminal Cases</div>
                  <div className="text-2xl font-black">{candidate.criminal_cases}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Region - Right Col */}
          <div className="lg:col-span-8 space-y-8">
            {/* Background & Education */}
            <section className="glass-card p-8 border-white/5">
              <h2 className="text-2xl font-black mb-8 border-b border-white/5 pb-4 uppercase tracking-tight">Audit Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-4">Background</h3>
                  <div className="p-6 rounded-2xl bg-secondary/30 border border-white/5">
                    <div className="text-xs font-bold text-gray-500 mb-1">Education</div>
                    <div className="text-lg font-bold text-gray-200">{candidate.education || 'Not Disclosed'}</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-500 uppercase tracking-widest mb-4">Wealth Check</h3>
                  <div className="p-6 rounded-2xl bg-secondary/30 border border-white/5">
                    <div className="text-xs font-bold text-gray-500 mb-1">Net Worth</div>
                    <div className="text-2xl font-black text-green-500">₹{candidate.net_worth || '0'}</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Promises Tracker */}
            <section className="glass-card p-8 border-white/5">
              <h2 className="text-2xl font-black mb-8 border-b border-white/5 pb-4 uppercase tracking-tight">Campaign Promises</h2>
              <div className="space-y-8">
                {(candidate.promises && candidate.promises.length > 0) ? (
                  candidate.promises.map((promise, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex justify-between items-end">
                        <div>
                          <h4 className="font-black text-gray-200">{promise.title}</h4>
                          <span className={`text-[10px] font-black uppercase tracking-widest ${
                            promise.status === 'Completed' ? 'text-green-500' : 'text-primary'
                          }`}>
                            {promise.status}
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full orange-gradient transition-all duration-1000 ${
                            promise.status === 'Completed' ? 'w-full' : promise.status === 'InProgress' ? 'w-1/2' : 'w-[5%]'
                          }`} 
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 font-bold">No campaign promises registered for this candidate.</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
