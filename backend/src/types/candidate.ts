export interface CreateCandidateRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  education?: string;
  experience?: string;
}

export interface UpdateCandidateRequest extends Partial<CreateCandidateRequest> {
  id: number;
}

export interface CandidateResponse {
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
  createdAt: Date;
  updatedAt: Date;
}

export interface FileUploadResponse {
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
} 