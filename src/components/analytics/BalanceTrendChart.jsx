import React from 'react'
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
import { useBalanceTrend } from '../../hooks/useBalanceTrend'
import { Skeleton } from '../common/Skeleton'
import { formatDate } from '../../utils/formatDate'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 shadow-lg">
        <p className="text-slate-300 text-sm font-medium">
          {formatDate(new Date(data.date))}
        </p>
        <p style={{ color: payload[0].color }} className="text-sm">
          Balance: {formatCurrency(data.balance)}
        </p>
      </div>
    )
  }
  return null
}

export const BalanceTrendChart = ({ selectedAccount = null }) => {
  const { balanceTrend, loading } = useBalanceTrend(selectedAccount?.id, 20)

  if (loading) {
    return <Skeleton count={1} height="h-96" />
  }

  if (!balanceTrend || balanceTrend.length === 0) {
    return (
      <div className="rounded-xl border border-light p-6 h-96 flex items-center justify-center">
        <p className="text-slate-400">No balance trend data available</p>ś
      </div>
    )
  }

  // Transform data for chart - format dates
  const chartData = balanceTrend.map((item) => ({
    date: new Date(item.date),
    dateString: new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: '2-digit',
    }),
    balance: item.balance,
  }))

  // Calculate min and max balance for better chart scaling
  const balances = chartData.map((item) => item.balance)
  const minBalance = Math.min(...balances)
  const maxBalance = Math.max(...balances)
  const range = maxBalance - minBalance
  const padding = range * 0.1

  return (
    <div className="space-y-4 rounded-xl border border-light p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-secondary mb-2">
          Balance Trend
        </h2>
        <p className="text-slate-400 text-sm">
          Last {Math.min(balanceTrend.length, 20)} months
        </p>
      </div>
      <div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 80 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="dateString"
              stroke="#94a3b8"
              style={{ fontSize: '11px' }}
              angle={-45}
              textAnchor="end"
              height={100}
              interval={Math.max(0, Math.floor(chartData.length / 8))}
            />
            <YAxis
              stroke="#94a3b8"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
              domain={[minBalance - padding, maxBalance + padding]}
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
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#06b6d4"
              name="Balance"
              strokeWidth={2}
              dot={{ fill: '#06b6d4', r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-slate-400 text-sm mb-1">Latest Balance</p>
          <p className="text-xl font-semibold text-cyan-400">
            {formatCurrency(chartData[chartData.length - 1].balance)}
          </p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-slate-400 text-sm mb-1">Highest Balance</p>
          <p className="text-xl font-semibold text-green-400">
            {formatCurrency(maxBalance)}
          </p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-slate-400 text-sm mb-1">Lowest Balance</p>
          <p className="text-xl font-semibold text-red-400">
            {formatCurrency(minBalance)}
          </p>
        </div>
      </div>
    </div>
  )
}
