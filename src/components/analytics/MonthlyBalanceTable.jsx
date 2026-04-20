import React from 'react'
import { formatCurrency } from '../../utils/formatCurrency'

export const MonthlyBalanceTable = ({ data = [] }) => {
  const getNetBalanceColor = (netBalance) => {
    if (netBalance > 0) return 'text-green-400'
    if (netBalance < 0) return 'text-red-400'
    return 'text-slate-400'
  }

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-white">Monthly Balance Breakdown</h3>
        <p className="text-sm text-slate-400 mt-1">Summary of credits, debits, and net balance for each month</p>
      </div>

      {data.length === 0 ? (
        <div className="px-6 py-8 text-center">
          <p className="text-slate-400">No data available</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-700/50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Month</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-slate-300">Credit</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-slate-300">Debit</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-slate-300">Net Balance</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-slate-300">Transactions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((month, index) => (
                <tr key={index} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-white font-medium">
                    {month.monthName}
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-green-400">
                    {formatCurrency(month.credit)}
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-red-400">
                    {formatCurrency(month.debit)}
                  </td>
                  <td className={`px-6 py-4 text-sm text-right font-medium ${getNetBalanceColor(month.netBalance)}`}>
                    {formatCurrency(month.netBalance)}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-slate-400">
                    {month.transactionCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
