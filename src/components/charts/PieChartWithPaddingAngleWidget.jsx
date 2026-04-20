import React from 'react'
import {
     PieChart,
     Pie,
     Cell,
     ResponsiveContainer,
     Tooltip,
} from 'recharts'

export const PieChartWithPaddingAngle = ({
     data,
     title,
     height = 300,
     isAnimationActive = true
}) => {
     if (!data || data.length === 0) {
          return (
               <div className="rounded-xl p-5 border border-slate-200 h-80 flex items-center justify-center">
                    <p className="text-slate-400">No data available</p>
               </div>
          )
     }

     const COLORS = ['#333446', '#7F8CAA']

     return (
          <div className="rounded-xl p-4 border border-slate-200">
               {title && (
                    <h3 className="text-[1rem] font-medium text-ternary">
                         {title}
                    </h3>
               )}

               <ResponsiveContainer width="100%" height={height}>
                    <PieChart>
                         <Pie
                              data={data}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              cornerRadius={5}
                              paddingAngle={5}
                              dataKey="value"
                              isAnimationActive={isAnimationActive}
                              label={({ name, value }) => `${name}: ${value}%`}
                         >
                              {data.map((entry, index) => (
                                   <Cell key={`cell-${index}`} fill={entry.fill || COLORS[index % COLORS.length]} />
                              ))}
                         </Pie>
                         <Tooltip
                              contentStyle={{
                                   backgroundColor: '#FFFFFF',
                                   border: '1px solid #E5E7EB',
                                   borderRadius: '0.5rem',
                              }}
                              formatter={(value) => value}
                         />
                    </PieChart>
               </ResponsiveContainer>
          </div>
     )
}