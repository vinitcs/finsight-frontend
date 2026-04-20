import React from 'react'
import {
     AreaChart,
     Area,
     XAxis,
     YAxis,
     CartesianGrid,
     Tooltip,
     Legend,
     ResponsiveContainer,
} from 'recharts'
import { formatCurrency } from '../../utils/formatCurrency'

export const AreaChartWidget = ({ data, title, height = 300, formatAsCurrency = true }) => {
     if (!data || data.length === 0) {
          return (
               <div className="bg-white rounded-xl p-5 border border-slate-200 h-80 flex items-center justify-center shadow-sm">
                    <p className="text-slate-400">No data available</p>
               </div>
          )
     }

     return (
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
               {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
               <ResponsiveContainer width="100%" height={height}>
                    <AreaChart data={data}>
                         <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                         <XAxis dataKey="name" stroke="#6B7280" />
                         <YAxis stroke="#6B7280" />
                         <Tooltip
                              contentStyle={{
                                   backgroundColor: '#FFFFFF',
                                   border: '1px solid #E5E7EB',
                                   borderRadius: '0.5rem',
                              }}
                              formatter={(value) => formatAsCurrency ? formatCurrency(value) : value}
                         />
                         <Legend />
                         <Area
                              type="monotone"
                              dataKey="credit"
                              fill="#16A34A"
                              stroke="#16A34A"
                              fillOpacity={0.6}
                              name="Credit"
                         />
                         <Area
                              type="monotone"
                              dataKey="debit"
                              fill="#EF4444"
                              stroke="#EF4444"
                              fillOpacity={0.6}
                              name="Debit"
                         />
                    </AreaChart>
               </ResponsiveContainer>
          </div>
     )
}
