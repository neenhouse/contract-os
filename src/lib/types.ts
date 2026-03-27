export interface Clause {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  clauses: Clause[];
}

export interface Signer {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'signed' | 'declined';
  signedAt?: string;
}

export type ContractStatus = 'draft' | 'active' | 'expiring-soon' | 'expired' | 'pending-signature';

export interface Contract {
  id: string;
  title: string;
  templateId: string;
  status: ContractStatus;
  createdAt: string;
  expiresAt: string;
  parties: string[];
  value?: string;
}

export interface AuditEvent {
  id: string;
  contractId: string;
  action: string;
  actor: string;
  timestamp: string;
  details?: string;
}
