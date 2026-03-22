import { useQuery } from '@tanstack/react-query';

import { apiClient } from './client';

export interface Candidate {
  id: string;
  name: string;
  party: string;
  constituency: string;
  photo_url?: string;
  age?: number;
  education: string | null;
  net_worth: string | null;
  criminal_cases: number;
  promises: Array<{
    title: string;
    status: string;
  }>;
}

export const fetchCandidates = async (): Promise<Candidate[]> => {
  const response = await fetch('/api/candidates');
  const data = await response.json();
  return data.candidates || [];
};

export const fetchCandidateById = async (id: string): Promise<Candidate> => {
  const response = await fetch(`/api/candidates?id=${id}`);
  const data = await response.json();
  return data.candidate;
};

export const fetchCandidatesByConstituency = async (constituencyId: string): Promise<Candidate[]> => {
  const response = await fetch(`/api/candidates?constituencyId=${constituencyId}`);
  const data = await response.json();
  return data.candidates || [];
};

export const useCandidates = () => {
  return useQuery({
    queryKey: ['candidates'],
    queryFn: fetchCandidates,
  });
};

export const useCandidate = (id: string) => {
  return useQuery({
    queryKey: ['candidate', id],
    queryFn: () => fetchCandidateById(id),
    enabled: !!id,
  });
};

export const useConstituencyCandidates = (constituencyId: string) => {
  return useQuery({
    queryKey: ['constituencyCandidates', constituencyId],
    queryFn: () => fetchCandidatesByConstituency(constituencyId),
    enabled: !!constituencyId,
  });
};
