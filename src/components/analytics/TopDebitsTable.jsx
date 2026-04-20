import React from 'react'
import { Skeleton } from '../common/Skeleton'
import { EmptyState } from '../common/EmptyState'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'
import { useTopDebits } from '../../hooks/useTopDebits'
import { PAGINATION_DEFAULTS } from '../../utils/constants'

export const TopDebitsTable = ({ selectedAccount = null, dateRange = {} }) => {
  const { topDebits, loading } = useTopDebits(
    selectedAccount?.id,
    dateRange.startDate,
    dateRange.endDate,
    PAGINATION_DEFAULTS.limit
  )

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-secondary mb-4">
        Top Debit Transactions
      </h2>

      {loading ? (
        <Skeleton count={1} height="h-64" />
      ) : topDebits && topDebits.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full">
            <thead>
              <tr className="bg-ternary text-center">
                <th className="text-light font-medium text-[0.9rem] border-b border-r border-slate-200 p-3">
                  Rank
                </th>
                <th className="text-light font-medium text-[0.9rem] border-b border-r border-slate-200 p-3">
                  Date
                </th>
                <th className="text-light font-medium text-[0.9rem] border-b border-r border-slate-200 p-3 text-left">
                  Description
                </th>
                <th className="text-light font-medium text-[0.9rem] border-b border-r border-slate-200 p-3">
                  Amount
                </th>
                <th className="text-light font-medium text-[0.9rem] border-b border-slate-200 p-3">
                  Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {topDebits.map((transaction, idx) => (
                <tr key={idx} className="text-center hover:bg-light">
                  <td className="border-t border-r border-slate-200 p-3 text-sm font-medium">
                    {transaction.rank}
                  </td>
                  <td className="border-t border-r border-slate-200 p-3 text-sm">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="border-t border-r border-slate-200 p-3 text-sm text-left">
                    <span className="truncate max-w-xs" title={transaction.description}>
                      {transaction.description}
                    </span>
                  </td>
                  <td className="border-t border-r border-slate-200 p-3 text-sm font-medium text-red-500">
                    {formatCurrency(transaction.amount)}
                  </td>
                  <td className="border-t border-slate-200 p-3 text-sm">
                    {transaction.balance !== null ? formatCurrency(transaction.balance) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          title="No Data Available"
          description="No debit transactions found for the selected period"
        />
      )}
    </div>
  )
}
