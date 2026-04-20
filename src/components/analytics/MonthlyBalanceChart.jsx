import React, { useState } from 'react'
import {
     LineChart,
     Line,
     XAxis,
     YAxis,
     CartesianGrid,
     Tooltip,
     Legend,
     ResponsiveContainer,
} from 'recharts'
import { formatCurrency } from '../../utils/formatCurrency'
import { useMonthlyBalance } from '../../hooks/useMonthlyBalance'
import DatePicker from '../DatePicker/DatePicker'
import { Skeleton } from '../common/Skeleton'

const CustomTooltip = ({ active, payload, label }) => {
     if (active && payload && payload.length) {
          return (
               <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 shadow-lg">
                    <p className="text-slate-300 text-sm font-medium">{payload[0].payload.name}</p>
                    {payload.map((entry, index) => (
                         <p key={index} style={{ color: entry.color }} className="text-sm">
                              {entry.name}:{' '}
                              {entry.name === 'Transactions'
                                   ? entry.value
                                   : formatCurrency(entry.value)}
                         </p>
                    ))}
               </div>
          )
     }
     return null
}

export const MonthlyBalanceChart = ({ selectedAccount = null }) => {
     const currentYear = new Date().getFullYear()
     const [selectedYear, setSelectedYear] = useState(currentYear)
     const { monthlyBalance, loading } = useMonthlyBalance(selectedAccount?.id, selectedYear)

     const handleYearChange = (year) => {
          setSelectedYear(year)
     }

     const [visibleLines, setVisibleLines] = useState({
          credit: true,
          debit: false,
          netBalance: false,
          transactionCount: false,
     })

     const toggleLine = (line) => {
          setVisibleLines((prev) => ({
               ...prev,
               [line]: !prev[line],
          }))
     }

     if (loading) {
          return <Skeleton count={1} height="h-96" />
     }

     if (!monthlyBalance || monthlyBalance.length === 0) {
          return (
               <div className="rounded-xl border border-light p-6">
                    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 h-96 flex items-center justify-center">
                         <p className="text-slate-400">No data available</p>
                    </div>
               </div>
          )
     }

     // Transform data for chart - use abbreviated month names
     const chartData = monthlyBalance.map((month) => ({
          name: month.monthName.substring(0, 3), // Jan, Feb, Mar, etc.
          credit: month.credit,
          debit: month.debit,
          netBalance: month.netBalance,
          transactionCount: month.transactionCount,
     }))

     const lineConfig = {
          credit: { color: '#22c55e', label: 'Credit' },
          debit: { color: '#ef4444', label: 'Debit' },
          netBalance: { color: '#06b6d4', label: 'Net Balance' },
          transactionCount: { color: '#f59e0b', label: 'Transactions' },
     }

     // Check if only transaction count is visible
     const isOnlyTransactionCount =
          visibleLines.transactionCount &&
          !visibleLines.credit &&
          !visibleLines.debit &&
          !visibleLines.netBalance

     // Determine Y-axis formatter
     const yAxisFormatter = isOnlyTransactionCount
          ? (value) => Math.round(value)
          : (value) => `₹${(value / 1000).toFixed(0)}K`

     return (
          <div className="space-y-4 rounded-xl border border-light p-4">
               <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-secondary mb-2">Monthly Balance</h2>
                    <DatePicker
                         showYearPicker={true}
                         placeholder="Select Year"
                         value={new Date(selectedYear, 0, 1)}
                         onDateChange={handleYearChange}
                    />
               </div>
               <div>
                    <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                         <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                         <XAxis
                              dataKey="name"
                              stroke="#94a3b8"
                              style={{ fontSize: '12px' }}
                         />
                         <YAxis
                              stroke="#94a3b8"
                              style={{ fontSize: '12px' }}
                              tickFormatter={yAxisFormatter}
                         />
                         <Tooltip
                              content={<CustomTooltip />}
                              contentStyle={{
                                   backgroundColor: '#1e293b',
                                   border: '1px solid #475569',
                                   borderRadius: '0.5rem',
                                   color: '#e2e8f0',
                              }}
                              labelStyle={{ color: '#cbd5e1' }}
                         />
                         <Legend
                              wrapperStyle={{ paddingTop: '20px' }}
                              iconType="line"
                         />
                         {visibleLines.credit && (
                              <Line
                                   type="monotone"
                                   dataKey="credit"
                                   stroke="#22c55e"
                                   name="Credit"
                                   strokeWidth={2}
                                   dot={{ fill: '#22c55e', r: 4 }}
                                   activeDot={{ r: 6 }}
                              />
                         )}
                         {visibleLines.debit && (
                              <Line
                                   type="monotone"
                                   dataKey="debit"
                                   stroke="#ef4444"
                                   name="Debit"
                                   strokeWidth={2}
                                   dot={{ fill: '#ef4444', r: 4 }}
                                   activeDot={{ r: 6 }}
                              />
                         )}
                         {visibleLines.netBalance && (
                              <Line
                                   type="monotone"
                                   dataKey="netBalance"
                                   stroke="#06b6d4"
                                   name="Net Balance"
                                   strokeWidth={2}
                                   dot={{ fill: '#06b6d4', r: 4 }}
                                   activeDot={{ r: 6 }}
                              />
                         )}
                         {visibleLines.transactionCount && (
                              <Line
                                   type="monotone"
                                   dataKey="transactionCount"
                                   stroke="#f59e0b"
                                   name="Transactions"
                                   strokeWidth={2}
                                   dot={{ fill: '#f59e0b', r: 4 }}
                                   activeDot={{ r: 6 }}
                              />
                         )}
                    </LineChart>
               </ResponsiveContainer>

               {/* Toggle Buttons */}
               <div className="flex gap-2 mt-6 flex-wrap">
                    {Object.entries(lineConfig).map(([key, { color, label }]) => (
                         <button
                              key={key}
                              onClick={() => toggleLine(key)}
                              className={`px-4 py-2 rounded-lg font-medium transition-all ${visibleLines[key]
                                        ? 'text-white'
                                        : 'bg-slate-700 text-white'
                                   }`}
                              style={
                                   visibleLines[key]
                                        ? { backgroundColor: color, opacity: 1 }
                                        : { backgroundColor: color, opacity: 0.3 }
                              }
                         >
                              {label}
                         </button>
                    ))}
               </div>
               </div>
          </div>
     )
}
