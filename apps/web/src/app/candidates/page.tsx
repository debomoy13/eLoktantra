'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { useCandidates } from '@/lib/api/candidates';

export default function CandidatesListPage() {
  const { data: candidates = [], isLoading, isError } = useCandidates();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParty, setSelectedParty] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'net_worth' | 'criminal_cases'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const parties = useMemo(() => {
    const p = new Set(candidates.map(c => c.party));
    return ['All', ...Array.from(p)];
  }, [candidates]);

  const filteredCandidates = useMemo(() => {
    return candidates
      .filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             c.constituency.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesParty = selectedParty === 'All' || c.party === selectedParty;
        return matchesSearch && matchesParty;
      })
      .sort((a, b) => {
        const valA = a[sortBy] ?? '';
        const valB = b[sortBy] ?? '';
        
        if (typeof valA === 'string' && typeof valB === 'string') {
          // Special handling for net_worth sorting if needed, but simple string compare for now
          const compare = valA.localeCompare(valB);
          return sortOrder === 'asc' ? compare : -compare;
        }
        
        if (typeof valA === 'number' && typeof valB === 'number') {
           return sortOrder === 'asc' ? valA - valB : valB - valA;
        }
        
        return 0;
      });
  }, [candidates, searchTerm, selectedParty, sortBy, sortOrder]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 min-h-screen">
      <header className="mb-12 text-center max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            Unified Candidate Directory
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 orange-text-gradient uppercase tracking-tighter leading-none">
          Electoral Leaders
        </h1>
        <p className="text-lg text-gray-400 font-medium leading-relaxed">
          Transparent access to every candidate's record, verified by eLoktantra Audit Systems.
          Explore profiles, promises, and financial disclosures.
        </p>
      </header>

      {/* Control Bar */}
      <div className="glass-card p-6 md:p-8 mb-12 border-white/5 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Search */}
          <div className="lg:col-span-12 relative">
            <input
              type="text"
              placeholder="Search by name, party, or constituency..."
              className="w-full bg-secondary/30 border border-white/10 rounded-2xl px-14 py-5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-lg font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="w-6 h-6 absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Party Filters */}
          <div className="lg:col-span-8 flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {parties.map(party => (
              <button
                key={party}
                onClick={() => setSelectedParty(party)}
                className={`px-6 py-3 rounded-xl font-black text-xs transition-all whitespace-nowrap uppercase tracking-widest border ${
                  selectedParty === party 
                  ? 'bg-primary text-white border-primary shadow-[0_0_20px_rgba(255,107,0,0.3)]' 
                  : 'bg-secondary/40 text-gray-400 border-white/5 hover:border-white/20'
                }`}
              >
                {party}
              </button>
            ))}
          </div>

          {/* Sort Filters */}
          <div className="lg:col-span-4 flex items-center justify-end space-x-4">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-secondary/40 border border-white/10 rounded-xl px-4 py-3 text-white text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-primary h-full appearance-none cursor-pointer pr-10 relative"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'white\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
            >
              <option value="name">Sort by Name</option>
              <option value="net_worth">Sort by Wealth</option>
              <option value="criminal_cases">Sort by Cases</option>
            </select>
            
            <button 
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="p-3 bg-secondary/40 border border-white/10 rounded-xl text-white hover:bg-primary/20 transition-all group"
              title="Toggle Sort Direction"
            >
              <svg className={`w-5 h-5 transition-transform duration-300 ${sortOrder === 'desc' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Initializing Direct Sync...</p>
        </div>
      ) : isError ? (
        <div className="p-16 glass-card text-center border-red-500/20 max-w-2xl mx-auto shadow-2xl">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/20">
            <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Audit Connection Failed</h3>
          <p className="text-gray-400 mb-10 font-medium">We were unable to establish a secure link with the candidate registry. Please ensure your network is stable.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-10 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-all active:scale-95"
          >
            Reconnect System
          </button>
        </div>
      ) : filteredCandidates.length === 0 ? (
        <div className="p-20 glass-card text-center border-white/5 opacity-60">
             <h3 className="text-white font-black text-2xl mb-2 uppercase tracking-tight">No Matches Found</h3>
             <p className="text-gray-500 font-medium">Try broadening your search or filter parameters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredCandidates.map((candidate) => (
            <div 
              key={candidate.id} 
              className="group glass-card overflow-hidden transition-all duration-500 hover:-translate-y-3 border-white/5 hover:border-primary/30 flex flex-col shadow-xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
              <div className="p-8 flex-grow">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-20 h-20 rounded-[2rem] bg-secondary/50 flex items-center justify-center font-black text-3xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 border border-white/5 shadow-inner overflow-hidden">
                    {candidate.photo_url ? (
                      <img src={candidate.photo_url} alt={candidate.name} className="w-full h-full object-cover" />
                    ) : (
                      candidate.name.charAt(0)
                    )}
                  </div>
                  <div className="text-right">
                    <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/5 text-gray-400 border border-white/10 group-hover:border-primary/40 group-hover:text-primary transition-all">
                      {candidate.party}
                    </span>
                    <div className="mt-3 flex items-center justify-end space-x-1 text-emerald-500">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-3xl font-black mb-2 group-hover:text-primary transition-colors leading-tight uppercase tracking-tighter">{candidate.name}</h2>
                <div className="flex items-center text-gray-500 font-bold text-sm mb-8">
                  <svg className="w-4 h-4 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {candidate.constituency}
                </div>
                
                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/5">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Net Worth</div>
                    <div className="text-xl font-black text-gray-100 flex items-baseline">
                      <span className="text-xs text-gray-500 mr-1">₹</span>
                      {candidate.net_worth || '0'}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">Legal Cases</div>
                    <div className={`text-2xl font-black ${candidate.criminal_cases > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                      {candidate.criminal_cases}
                    </div>
                  </div>
                </div>
              </div>
              
              <Link 
                href={`/candidates/${candidate.id}`}
                className="bg-white/5 py-5 px-8 text-center text-[10px] font-black uppercase tracking-widest text-primary group-hover:bg-primary group-hover:text-white transition-all border-t border-white/5 group-hover:border-transparent flex items-center justify-center space-x-2"
              >
                <span>Examine Audit Record</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
