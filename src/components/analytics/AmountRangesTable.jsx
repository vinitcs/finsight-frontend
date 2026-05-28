import React from 'react'
import { Skeleton } from '../common/Skeleton'
import { EmptyState } from '../common/EmptyState'
import { formatCurrency } from '../../utils/formatCurrency'
import { useAmountRanges } from '../../hooks/useAmountRanges'

export const AmountRangesTable = ({ selectedAccount = null, dateRange = {} }) => {
  const { amountRanges, loading } = useAmountRanges(
    selectedAccount?.id,
    dateRange.startDate,
    dateRange.endDate
  )

  const tableData = amountRanges && Array.isArray(amountRanges) ? amountRanges : []

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-secondary mb-4">
        Amount Range Breakdown
      </h2>

      {loading ? (
        <Skeleton count={1} height="h-64" />
      ) : amountRanges && tableData.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full">
            <thead>
              <tr className="bg-ternary text-center">
                <th className="text-light font-medium text-[0.9rem] border-b border-r border-slate-200 p-3">
                  Amount Range
                </th>
                <th className="text-light font-medium text-[0.9rem] border-b border-r border-slate-200 p-3">
                  Count
                </th>
                <th className="text-light font-medium text-[0.9rem] border-b border-r border-slate-200 p-3">
                  Total Amount
                </th>
                <th className="text-light font-medium text-[0.9rem] border-b border-slate-200 p-3">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, idx) => (
                <tr key={idx} className="text-center hover:bg-light">
                  <td className="border-t border-r border-slate-200 p-3 text-left">
                    {item.label}
                  </td>
                  <td className="border-t border-r border-slate-200 p-3">
                    {item.count}
                  </td>
                  <td className="border-t border-r border-slate-200 p-3">
                    {formatCurrency(item.total)}
                  </td>
                  <td className="border-t border-slate-200 p-3">
                    {item.percentage.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          title="No Data Available"
          description="No transactions found for the selected period"
        />
      )}
    </div>
  )
}
