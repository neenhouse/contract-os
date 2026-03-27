import type { Template, Contract, AuditEvent } from './types';

export const templates: Template[] = [
  {
    id: 'nda',
    title: 'Non-Disclosure Agreement',
    description: 'Protect confidential information shared between parties during business discussions or partnerships.',
    category: 'Confidentiality',
    clauses: [
      { id: 'nda-1', title: 'Definition of Confidential Information', content: 'For purposes of this Agreement, "Confidential Information" means any data or information that is proprietary to {{company_name}} and not generally known to the public, including but not limited to trade secrets, business plans, financial information, and technical data disclosed on or after {{effective_date}}.', order: 0 },
      { id: 'nda-2', title: 'Obligations of Receiving Party', content: 'The Receiving Party agrees to hold and maintain the Confidential Information in strict confidence for the sole benefit of {{company_name}}. The Receiving Party shall not, without the prior written consent of {{company_name}}, disclose to any third party any Confidential Information.', order: 1 },
      { id: 'nda-3', title: 'Term and Duration', content: 'This Agreement shall remain in effect for a period of {{duration}} from the Effective Date. The obligations of confidentiality shall survive termination and continue for {{survival_period}} thereafter.', order: 2 },
      { id: 'nda-4', title: 'Return of Materials', content: 'Upon termination of this Agreement or upon request by {{company_name}}, the Receiving Party shall promptly return or destroy all documents and materials containing Confidential Information.', order: 3 },
    ],
  },
  {
    id: 'freelance',
    title: 'Freelance Agreement',
    description: 'Define scope, payment terms, and deliverables for independent contractor engagements.',
    category: 'Services',
    clauses: [
      { id: 'fl-1', title: 'Scope of Services', content: '{{contractor_name}} agrees to perform the following services for {{company_name}}: {{scope_description}}. The services shall commence on {{start_date}} and conclude on {{end_date}}.', order: 0 },
      { id: 'fl-2', title: 'Compensation', content: '{{company_name}} shall pay {{contractor_name}} a total fee of {{payment_amount}} for the services described herein. Payment shall be made {{payment_schedule}} upon receipt of invoice.', order: 1 },
      { id: 'fl-3', title: 'Intellectual Property', content: 'All work product, deliverables, and materials created by {{contractor_name}} in the course of performing services shall be the sole and exclusive property of {{company_name}}.', order: 2 },
      { id: 'fl-4', title: 'Independent Contractor Status', content: '{{contractor_name}} is an independent contractor and not an employee of {{company_name}}. Nothing in this Agreement shall be construed to create an employment relationship.', order: 3 },
      { id: 'fl-5', title: 'Termination', content: 'Either party may terminate this Agreement with {{notice_period}} written notice. Upon termination, {{contractor_name}} shall deliver all completed work and {{company_name}} shall pay for services rendered.', order: 4 },
    ],
  },
  {
    id: 'saas',
    title: 'SaaS Terms of Service',
    description: 'Standard terms governing the use of software-as-a-service products including licensing and liability.',
    category: 'Technology',
    clauses: [
      { id: 'saas-1', title: 'Grant of License', content: '{{company_name}} grants {{client_name}} a non-exclusive, non-transferable license to access and use the Service during the Subscription Term beginning {{effective_date}}.', order: 0 },
      { id: 'saas-2', title: 'Service Level Agreement', content: '{{company_name}} shall use commercially reasonable efforts to make the Service available {{uptime_guarantee}} of the time during each calendar month, excluding scheduled maintenance windows.', order: 1 },
      { id: 'saas-3', title: 'Data Protection', content: '{{company_name}} shall implement and maintain appropriate technical and organizational measures to protect Customer Data in accordance with {{compliance_standard}}.', order: 2 },
      { id: 'saas-4', title: 'Subscription Fees', content: '{{client_name}} shall pay {{subscription_fee}} per {{billing_period}}. Fees are non-refundable except as expressly set forth in this Agreement.', order: 3 },
      { id: 'saas-5', title: 'Limitation of Liability', content: 'In no event shall {{company_name}}\'s aggregate liability exceed the total fees paid by {{client_name}} during the {{liability_period}} immediately preceding the claim.', order: 4 },
    ],
  },
  {
    id: 'employment',
    title: 'Employment Offer Letter',
    description: 'Formal offer of employment including role details, compensation, benefits, and start date.',
    category: 'Employment',
    clauses: [
      { id: 'emp-1', title: 'Position and Duties', content: 'We are pleased to offer you the position of {{job_title}} at {{company_name}}, reporting to {{manager_name}}. Your primary responsibilities will include {{job_responsibilities}}.', order: 0 },
      { id: 'emp-2', title: 'Compensation', content: 'Your annual base salary will be {{salary}} paid on a {{pay_frequency}} basis. You will also be eligible for {{bonus_structure}}.', order: 1 },
      { id: 'emp-3', title: 'Benefits', content: 'You will be eligible to participate in {{company_name}}\'s employee benefits program, including {{benefits_list}}, subject to the terms of each plan.', order: 2 },
      { id: 'emp-4', title: 'Start Date', content: 'Your anticipated start date is {{start_date}}. This offer is contingent upon successful completion of {{contingencies}}.', order: 3 },
      { id: 'emp-5', title: 'At-Will Employment', content: 'Employment with {{company_name}} is at-will. Either party may terminate the employment relationship at any time, with or without cause or notice.', order: 4 },
    ],
  },
  {
    id: 'consulting',
    title: 'Consulting Agreement',
    description: 'Comprehensive agreement for professional consulting engagements with defined milestones and deliverables.',
    category: 'Services',
    clauses: [
      { id: 'con-1', title: 'Engagement', content: '{{company_name}} engages {{consultant_name}} to provide consulting services as described in Exhibit A, commencing on {{start_date}}.', order: 0 },
      { id: 'con-2', title: 'Fees and Expenses', content: '{{company_name}} shall pay {{consultant_name}} at a rate of {{hourly_rate}} per hour, not to exceed {{max_amount}} without prior written approval. Reasonable expenses shall be reimbursed within {{reimbursement_period}}.', order: 1 },
      { id: 'con-3', title: 'Confidentiality', content: '{{consultant_name}} agrees to maintain the confidentiality of all proprietary information belonging to {{company_name}} both during and after the term of this Agreement.', order: 2 },
      { id: 'con-4', title: 'Non-Solicitation', content: 'During the term and for {{non_solicit_period}} thereafter, {{consultant_name}} shall not solicit any employees or clients of {{company_name}}.', order: 3 },
      { id: 'con-5', title: 'Deliverables', content: '{{consultant_name}} shall deliver the following: {{deliverables_list}}. All deliverables must meet the acceptance criteria outlined in Exhibit A.', order: 4 },
    ],
  },
  {
    id: 'partnership',
    title: 'Partnership Agreement',
    description: 'Establish roles, profit-sharing, and governance for a business partnership between two or more entities.',
    category: 'Business Formation',
    clauses: [
      { id: 'part-1', title: 'Formation', content: 'The partners hereby form a partnership under the name {{partnership_name}}, effective {{effective_date}}, for the purpose of {{business_purpose}}.', order: 0 },
      { id: 'part-2', title: 'Capital Contributions', content: 'Each partner shall contribute the following: {{partner_a_name}} shall contribute {{partner_a_contribution}}, and {{partner_b_name}} shall contribute {{partner_b_contribution}}.', order: 1 },
      { id: 'part-3', title: 'Profit and Loss Distribution', content: 'Net profits and losses shall be allocated {{profit_split}} between the partners, unless otherwise agreed upon in writing.', order: 2 },
      { id: 'part-4', title: 'Management and Voting', content: 'Each partner shall have {{voting_rights}} in all partnership decisions. Major decisions requiring unanimous consent include: {{major_decisions}}.', order: 3 },
      { id: 'part-5', title: 'Dissolution', content: 'The partnership may be dissolved by mutual written agreement, by {{dissolution_notice}} notice from any partner, or upon the occurrence of events described in {{governing_law}}.', order: 4 },
      { id: 'part-6', title: 'Dispute Resolution', content: 'Any dispute arising under this Agreement shall be resolved through {{dispute_method}} in {{jurisdiction}} under the laws of {{governing_law}}.', order: 5 },
    ],
  },
];

export const mockContracts: Contract[] = [
  { id: 'c1', title: 'Acme Corp NDA', templateId: 'nda', status: 'active', createdAt: '2025-06-15', expiresAt: '2026-06-15', parties: ['Acme Corp', 'ContractOS Inc'], value: '$0' },
  { id: 'c2', title: 'Freelance Design - J. Smith', templateId: 'freelance', status: 'active', createdAt: '2025-09-01', expiresAt: '2026-03-01', parties: ['Jane Smith', 'ContractOS Inc'], value: '$12,000' },
  { id: 'c3', title: 'CloudStack SaaS Agreement', templateId: 'saas', status: 'expiring-soon', createdAt: '2025-04-10', expiresAt: '2026-04-10', parties: ['CloudStack Ltd', 'ContractOS Inc'], value: '$48,000/yr' },
  { id: 'c4', title: 'Senior Engineer Offer - M. Chen', templateId: 'employment', status: 'active', createdAt: '2025-11-20', expiresAt: '2026-11-20', parties: ['Michael Chen', 'ContractOS Inc'], value: '$185,000/yr' },
  { id: 'c5', title: 'Strategy Consulting - Deloitte', templateId: 'consulting', status: 'pending-signature', createdAt: '2026-03-01', expiresAt: '2026-09-01', parties: ['Deloitte Consulting', 'ContractOS Inc'], value: '$75,000' },
  { id: 'c6', title: 'Marketing Partnership - BrandCo', templateId: 'partnership', status: 'draft', createdAt: '2026-03-20', expiresAt: '2027-03-20', parties: ['BrandCo LLC', 'ContractOS Inc'], value: 'Revenue share' },
  { id: 'c7', title: 'Office Lease Amendment', templateId: 'nda', status: 'expired', createdAt: '2024-01-15', expiresAt: '2025-12-31', parties: ['Realty Group', 'ContractOS Inc'], value: '$8,500/mo' },
  { id: 'c8', title: 'Data Processing Agreement', templateId: 'saas', status: 'active', createdAt: '2025-07-01', expiresAt: '2026-07-01', parties: ['DataVault Inc', 'ContractOS Inc'], value: '$24,000/yr' },
  { id: 'c9', title: 'Freelance Dev - A. Patel', templateId: 'freelance', status: 'expiring-soon', createdAt: '2025-10-15', expiresAt: '2026-04-15', parties: ['Arjun Patel', 'ContractOS Inc'], value: '$18,000' },
  { id: 'c10', title: 'Vendor NDA - SupplyChain Co', templateId: 'nda', status: 'active', createdAt: '2025-08-22', expiresAt: '2027-08-22', parties: ['SupplyChain Co', 'ContractOS Inc'], value: '$0' },
  { id: 'c11', title: 'Product Manager Offer - L. Garcia', templateId: 'employment', status: 'expired', createdAt: '2024-06-01', expiresAt: '2025-06-01', parties: ['Laura Garcia', 'ContractOS Inc'], value: '$155,000/yr' },
  { id: 'c12', title: 'IT Consulting - TechAdvisors', templateId: 'consulting', status: 'active', createdAt: '2025-12-01', expiresAt: '2026-12-01', parties: ['TechAdvisors LLC', 'ContractOS Inc'], value: '$50,000' },
  { id: 'c13', title: 'Joint Venture - InnovateCo', templateId: 'partnership', status: 'expiring-soon', createdAt: '2025-05-01', expiresAt: '2026-04-01', parties: ['InnovateCo', 'ContractOS Inc'], value: '50/50 split' },
  { id: 'c14', title: 'API License Agreement', templateId: 'saas', status: 'draft', createdAt: '2026-03-22', expiresAt: '2027-03-22', parties: ['APIHub Inc', 'ContractOS Inc'], value: '$36,000/yr' },
  { id: 'c15', title: 'Executive NDA - Board Member', templateId: 'nda', status: 'pending-signature', createdAt: '2026-03-18', expiresAt: '2028-03-18', parties: ['R. Thompson', 'ContractOS Inc'], value: '$0' },
];

export const mockAuditEvents: AuditEvent[] = [
  { id: 'a1', contractId: 'c1', action: 'Contract Created', actor: 'Sarah Mitchell', timestamp: '2025-06-15T09:00:00Z', details: 'Created from NDA template' },
  { id: 'a2', contractId: 'c1', action: 'Clause Edited', actor: 'Sarah Mitchell', timestamp: '2025-06-15T09:25:00Z', details: 'Modified "Definition of Confidential Information" clause' },
  { id: 'a3', contractId: 'c1', action: 'Clause Added', actor: 'David Park', timestamp: '2025-06-15T10:10:00Z', details: 'Added "Non-Compete" clause' },
  { id: 'a4', contractId: 'c1', action: 'Variables Filled', actor: 'Sarah Mitchell', timestamp: '2025-06-15T11:00:00Z', details: 'Completed all placeholder fields' },
  { id: 'a5', contractId: 'c1', action: 'Sent for Signature', actor: 'Sarah Mitchell', timestamp: '2025-06-15T14:00:00Z', details: 'Sent to john@acme.com, legal@acme.com' },
  { id: 'a6', contractId: 'c1', action: 'Viewed by Signer', actor: 'John Reynolds (Acme Corp)', timestamp: '2025-06-15T15:30:00Z', details: 'First viewed via signature link' },
  { id: 'a7', contractId: 'c1', action: 'Signed', actor: 'John Reynolds (Acme Corp)', timestamp: '2025-06-15T15:45:00Z', details: 'Signature captured - drawn' },
  { id: 'a8', contractId: 'c1', action: 'Signed', actor: 'Lisa Wong (Legal, Acme Corp)', timestamp: '2025-06-16T09:15:00Z', details: 'Signature captured - typed' },
  { id: 'a9', contractId: 'c1', action: 'Fully Executed', actor: 'System', timestamp: '2025-06-16T09:15:00Z', details: 'All parties have signed. Contract is now active.' },
  { id: 'a10', contractId: 'c1', action: 'Exported', actor: 'Sarah Mitchell', timestamp: '2025-06-16T10:00:00Z', details: 'Exported as PDF with embedded signatures' },
  { id: 'a11', contractId: 'c1', action: 'Renewal Reminder Sent', actor: 'System', timestamp: '2026-03-15T08:00:00Z', details: 'Automated 90-day expiration reminder sent to all parties' },
];
