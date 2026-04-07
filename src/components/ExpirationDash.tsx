import { useState, useMemo } from 'react';
import { mockContracts } from '../lib/data';
import type { ContractStatus } from '../lib/types';

const PAGE_LOAD_TIME = Date.now();

type SortField = 'title' | 'expiresAt' | 'status';
type SortDir = 'asc' | 'desc';

const STATUS_ORDER: Record<ContractStatus, number> = {
  'expired': 0,
  'expiring-soon': 1,
  'pending-signature': 2,
  'active': 3,
  'draft': 4,
};

export default function ExpirationDash() {
  const [sortField, setSortField] = useState<SortField>('expiresAt');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [statusFilter, setStatusFilter] = useState<ContractStatus | 'all'>('all');

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const sorted = useMemo(() => {
    let list = [...mockContracts];
    if (statusFilter !== 'all') {
      list = list.filter(c => c.status === statusFilter);
    }
    list.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case 'title':
          cmp = a.title.localeCompare(b.title);
          break;
        case 'expiresAt':
          cmp = new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime();
          break;
        case 'status':
          cmp = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
          break;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [sortField, sortDir, statusFilter]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: mockContracts.length };
    for (const c of mockContracts) {
      counts[c.status] = (counts[c.status] || 0) + 1;
    }
    return counts;
  }, []);

  const sortArrow = (field: SortField) => {
    if (sortField !== field) return '';
    return sortDir === 'asc' ? ' \u2191' : ' \u2193';
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  };

  const daysUntil = (dateStr: string) => {
    const diff = Math.ceil((new Date(dateStr).getTime() - PAGE_LOAD_TIME) / (1000 * 60 * 60 * 24));
    if (diff < 0) return `${Math.abs(diff)}d overdue`;
    if (diff === 0) return 'Today';
    return `${diff}d`;
  };

  return (
    <div className="expiration-dash">
      <div className="expiration-dash__header">
        <h2>Expiration Dashboard</h2>
        <p className="expiration-dash__subtitle">Track contract expirations and take timely action</p>
      </div>

      <div className="expiration-dash__stats">
        {(['all', 'active', 'expiring-soon', 'expired', 'draft', 'pending-signature'] as const).map(status => (
          <button
            key={status}
            className={`stat-card ${statusFilter === status ? 'stat-card--active' : ''} ${status !== 'all' ? `stat-card--${status}` : ''}`}
            onClick={() => setStatusFilter(status)}
          >
            <span className="stat-card__count">{statusCounts[status] || 0}</span>
            <span className="stat-card__label">{status === 'all' ? 'All' : formatStatus(status)}</span>
          </button>
        ))}
      </div>

      <div className="expiration-dash__table-wrap">
        <table className="expiration-table" data-testid="expiration-table">
          <thead>
            <tr>
              <th onClick={() => toggleSort('title')} className="sortable">
                Contract{sortArrow('title')}
              </th>
              <th>Parties</th>
              <th onClick={() => toggleSort('status')} className="sortable">
                Status{sortArrow('status')}
              </th>
              <th onClick={() => toggleSort('expiresAt')} className="sortable">
                Expires{sortArrow('expiresAt')}
              </th>
              <th>Time Left</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(contract => (
              <tr key={contract.id} className={`expiration-table__row expiration-table__row--${contract.status}`}>
                <td className="expiration-table__title">{contract.title}</td>
                <td className="expiration-table__parties">{contract.parties.join(' & ')}</td>
                <td>
                  <span className={`status-badge status-badge--${contract.status}`}>
                    {formatStatus(contract.status)}
                  </span>
                </td>
                <td className="expiration-table__date">{formatDate(contract.expiresAt)}</td>
                <td className={`expiration-table__days ${contract.status === 'expired' ? 'overdue' : ''}`}>
                  {daysUntil(contract.expiresAt)}
                </td>
                <td className="expiration-table__value">{contract.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {sorted.length === 0 && (
          <div className="expiration-dash__empty">No contracts match this filter.</div>
        )}
      </div>
    </div>
  );
}

function formatStatus(status: string): string {
  return status
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
