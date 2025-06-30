export interface Candidate {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  education?: string;
  experience?: string;
  cvFileName?: string;
  cvFilePath?: string;
  cvFileSize?: number;
  cvMimeType?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCandidateData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  education?: string;
  experience?: string;
}

export interface UpdateCandidateData extends Partial<CreateCandidateData> {
  id: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
}

export interface CandidatesResponse extends ApiResponse<Candidate[]> {}
export interface CandidateResponse extends ApiResponse<Candidate> {} 