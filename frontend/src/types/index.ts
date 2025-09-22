export interface User {
  id: string;
  name: string;
  email: string;
  role: 'scientist' | 'government' | 'company' | 'public';
  department?: string;
  organization?: string;
  verified?: boolean;
}

export interface Dataset {
  id: string;
  name: string;
  type: 'csv' | 'json' | 'image' | 'fasta';
  size: string;
  uploadDate: string;
  status: 'processing' | 'ready' | 'error';
  tags: string[];
}

export interface OtolithResult {
  id: string;
  imageUrl: string;
  species: string;
  confidence: number;
  age: number;
  location: string;
}

export interface eDNAMatch {
  id: string;
  sequence: string;
  species: string;
  confidence: number;
  location: string;
  date: string;
}

export interface CompanyApplication {
  id: string;
  companyName: string;
  contactEmail: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
  submissionDate: string;
  reviewDate?: string;
}