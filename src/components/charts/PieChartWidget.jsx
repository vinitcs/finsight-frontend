import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { formatCurrency, formatCurrencyCompact } from '../../utils/formatCurrency'

const COLORS = [
  '#333446',
  '#7F8CAA',
  // '#16A34A',
  // '#F59E0B',
  // '#8B5CF6',
  // '#EC4899',
  // '#06B6D4',
  // '#6366F1',
]

export const PieChartWidget = ({ data, title, height = 300, formatAsCurrency = true }) => {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-xl p-5 border border-slate-200 h-80 flex items-center justify-center">
        <p className="text-secondary">No data available</p>
      </div>
    )
  }

  const chartData = data.map((item) => ({
    name: item.category || item.name,
    value: item.amount || item.value,
  }))

  const formatValue = (value) => {
    return formatAsCurrency ? formatCurrencyCompact(value) : value
  }

  return (
    <div className="rounded-xl p-4 border border-slate-200">
      {title && <h3 className="text-[1rem] font-medium text-ternary">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${formatValue(value)}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => formatAsCurrency ? formatCurrency(value) : value}
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '0.5rem',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
