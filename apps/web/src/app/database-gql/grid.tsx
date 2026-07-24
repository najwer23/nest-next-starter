'use client';

import React, { useTransition } from 'react';
import { markReviewed } from './actions';

interface Row {
  id: string;
  name: string;
  reviewedAt: string | null;
  reviewedBy: string | null;
}

interface ReviewCheckboxProps {
  row: Row;
}

interface GridProps {
  initialRows: Row[];
}

const ReviewCheckbox: React.FC<ReviewCheckboxProps> = ({ row }) => {
  const [isPending, startTransition] = useTransition();

  const handleChange = () => {
    startTransition(async () => {
      await markReviewed(row.id);
    });
  };

  return (
    <input
      type="checkbox"
      checked={!!row.reviewedAt}
      disabled={isPending}
      onChange={handleChange}
      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
    />
  );
};

export const Grid: React.FC<GridProps> = ({ initialRows }) => (
  <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Reviewed</th>
          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            Reviewed By
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
            Reviewed At
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200 bg-white">
        {initialRows.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.name}</td>

            <td className="px-4 py-3">
              <ReviewCheckbox row={row} />
            </td>

            <td className="px-4 py-3 text-sm text-gray-500">{row.reviewedBy ?? '—'}</td>

            <td className="px-4 py-3 text-sm text-gray-500">
              {row.reviewedAt ? new Date(row.reviewedAt).toLocaleString() : '—'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
