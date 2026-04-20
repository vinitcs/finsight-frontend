import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { formatCurrency } from '../../utils/formatCurrency'

export const BarChartWidget = ({ data, title, height = 100, formatAsCurrency = true }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl p-5 border border-slate-200 h-80 flex items-center justify-center shadow-sm">
        <p className="text-slate-400">No data available</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl p-4 border border-slate-200">

      {/* Header */}
      {title && (
        <h3 className="text-[1rem] font-medium text-ternary mb-6">
          {title}
        </h3>
      )}

      {/* Chart */}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="name" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />

          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '0.5rem',
              color: "#7F8CAA",
            }}
            formatter={(value) => formatAsCurrency ? formatCurrency(value) : value}
          />

          <Bar
            dataKey="value"
            fill="#3B82F6"
            barSize={50}
            label={{ position: 'top' }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.name === 'Credit' ? '#333446' : '#7F8CAA'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}