import React, { useState } from 'react'
import { useAccounts } from '../../hooks/useAccounts'
import { PageWrapper } from '../../components/layout/PageWrapper'
import DatePicker from '../../components/DatePicker/DatePicker'
import { AccountSelector } from '../../components/account/AccountSelector'
import { analyticsAPI } from '../../api/analytics.api'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Skeleton } from '../../components/common/Skeleton'
import {
     PieChart,
     Pie,
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

export const AIReport = () => {
     const [dateRange, setDateRange] = useState({ startDate: null, endDate: null })
     const [aiReport, setAiReport] = useState(null)
     const [amountRanges, setAmountRanges] = useState([])
     const [topCredits, setTopCredits] = useState([])
     const [topDebits, setTopDebits] = useState([])
     const [loading, setLoading] = useState(false)
     const [error, setError] = useState(null)
     const { selectedAccount } = useAccounts('ai-report')

     const handleFetchReport = async () => {
          if (!selectedAccount?.id || !dateRange.startDate || !dateRange.endDate) {
               setError('Please select an account and date range')
               return
          }

          setLoading(true)
          setError(null)

          try {
               // Ensure dates are Date objects before calling toISOString()
               const startDate = dateRange.startDate instanceof Date ? dateRange.startDate : new Date(dateRange.startDate)
               const endDate = dateRange.endDate instanceof Date ? dateRange.endDate : new Date(dateRange.endDate)

               const params = {
                    accountId: selectedAccount.id,
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString(),
               }

               // Fetch AI report
               const reportResponse = await analyticsAPI.getAIReport(params)
               setAiReport(reportResponse.data?.data?.aiReportdata || '')

               // Fetch chart data
               const amountRangesResponse = await analyticsAPI.getAmountRanges(params)
               const topCreditsResponse = await analyticsAPI.getTopCredits({ ...params, limit: 8 })
               const topDebitsResponse = await analyticsAPI.getTopDebits({ ...params, limit: 8 })

               setAmountRanges(amountRangesResponse.data?.data || [])
               setTopCredits(topCreditsResponse.data?.data || [])
               setTopDebits(topDebitsResponse.data?.data || [])
          } catch (err) {
               setError(err.response?.data?.message || 'Failed to fetch AI report')
               console.error('Error fetching AI report:', err)
          } finally {
               setLoading(false)
          }
     }

     const markdownComponents = {
          h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-primary mt-6 mb-4" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-primary mt-5 mb-3" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-semibold text-secondary mt-4 mb-2" {...props} />,
          h4: ({ node, ...props }) => <h4 className="text-lg font-semibold text-slate-300 mt-3 mb-2" {...props} />,
          p: ({ node, ...props }) => <p className="text-slate-300 mb-3 leading-relaxed" {...props} />,
          strong: ({ node, ...props }) => <strong className="font-bold text-light" {...props} />,
          em: ({ node, ...props }) => <em className="italic text-slate-400" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-2 text-slate-300" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-2 text-slate-300" {...props} />,
          li: ({ node, ...props }) => <li className="text-slate-300 ml-2" {...props} />,
          table: ({ node, ...props }) => (
               <div className="overflow-x-auto mb-4">
                    <table className="w-full border-collapse border border-slate-600" {...props} />
               </div>
          ),
          thead: ({ node, ...props }) => <thead className="bg-slate-800 border border-slate-600" {...props} />,
          tbody: ({ node, ...props }) => <tbody {...props} />,
          tr: ({ node, ...props }) => <tr className="border border-slate-600" {...props} />,
          th: ({ node, ...props }) => (
               <th className="border border-slate-600 px-4 py-2 text-left font-semibold text-secondary bg-slate-700" {...props} />
          ),
          td: ({ node, ...props }) => (
               <td className="border border-slate-600 px-4 py-2 text-slate-300" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
               <blockquote className="border-l-4 border-secondary pl-4 py-2 mb-4 text-slate-400 italic" {...props} />
          ),
          code: ({ node, inline, ...props }) =>
               inline ? (
                    <code className="bg-slate-800 text-slate-200 px-2 py-1 rounded text-sm font-mono" {...props} />
               ) : (
                    <code className="bg-slate-800 text-slate-200 p-3 rounded-lg block mb-4 overflow-x-auto font-mono text-sm" {...props} />
               ),
          hr: ({ node, ...props }) => <hr className="border-t border-slate-600 my-6" {...props} />,
     }

     const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#f43f5e', '#14b8a6']

     const CustomPieTooltip = ({ active, payload }) => {
          if (active && payload && payload.length) {
               return (
                    <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 shadow-lg">
                         <p className="text-slate-300 text-sm font-medium">{payload[0].name}</p>
                         <p className="text-sm text-blue-400">{payload[0].value}</p>
                    </div>
               )
          }
          return null
     }

     const CustomBarTooltip = ({ active, payload, label }) => {
          if (active && payload && payload.length) {
               return (
                    <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 shadow-lg">
                         <p className="text-slate-300 text-sm font-medium">{label}</p>
                         {payload.map((entry, index) => (
                              <p key={index} style={{ color: entry.color }} className="text-sm">
                                   {entry.name}: {formatCurrency(entry.value)}
                              </p>
                         ))}
                    </div>
               )
          }
          return null
     }

     return (
          <PageWrapper>
               <div className="space-y-6">
                    <div>
                         <h1 className="text-3xl font-bold text-primary mb-2">AI Financial Report</h1>
                         <p className="text-slate-400">Get AI-powered insights about your financial transactions</p>
                    </div>

                    {/* Account Selector */}
                    <div className="flex w-fit gap-1.5 mt-3">
                         <AccountSelector selectorFor="ai-report" />
                    </div>

                    {/* Date Range Pickers */}
                    <div className="rounded-lg border border-light p-6">
                         <h2 className="text-lg font-semibold text-secondary mb-4">Select Date Range</h2>
                         <div className="flex w-full gap-3 flex-wrap">
                              <DatePicker
                                   placeholder="Select start date"
                                   value={dateRange.startDate ? new Date(dateRange.startDate) : null}
                                   showYearPicker={false}
                                   onDateChange={(selectedDate) => setDateRange({ ...dateRange, startDate: selectedDate })}
                              />
                              <DatePicker
                                   placeholder="Select end date"
                                   value={dateRange.endDate ? new Date(dateRange.endDate) : null}
                                   showYearPicker={false}
                                   onDateChange={(selectedDate) => setDateRange({ ...dateRange, endDate: selectedDate })}
                              />

                              {(dateRange.startDate || dateRange.endDate) && (
                                   <button
                                        onClick={() => setDateRange({ startDate: null, endDate: null })}
                                        className="px-2 text-sm rounded-lg border border-light hover:bg-primary hover:text-light hover:cursor-pointer transition"
                                   >
                                        Clear
                                   </button>
                              )}

                              <button
                                   onClick={handleFetchReport}
                                   disabled={loading || !selectedAccount?.id || !dateRange.startDate || !dateRange.endDate}
                                   className="px-6 py-2 text-sm bg-secondary text-primary rounded font-semibold hover:bg-opacity-90 hover:cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                   {loading ? 'Loading...' : 'Generate Report'}
                              </button>
                         </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                         <div className="bg-red-900 bg-opacity-20 border border-red-600 rounded-lg p-4 text-red-300">
                              {error}
                         </div>
                    )}

                    {/* Loading State */}
                    {loading && (
                         <div className="space-y-4">
                              <Skeleton count={15} height="h-8" />
                         </div>
                    )}

                    {/* AI Report Content */}
                    {aiReport && !loading && (
                         <>
                              {/* Markdown Report */}
                              <div className="bg-slate-800 rounded-lg border border-slate-700 p-8 prose-invert max-w-none">
                                   <div className="markdown-content">
                                        <ReactMarkdown
                                             remarkPlugins={[remarkGfm]}
                                             components={markdownComponents}
                                        >
                                             {aiReport}
                                        </ReactMarkdown>
                                   </div>
                              </div>

                              {/* Charts Section */}
                              <div className="space-y-6">
                                   {/* Amount Ranges Pie Chart */}
                                   {amountRanges.length > 0 && (
                                        <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
                                             <h3 className="text-2xl font-bold text-secondary mb-6">Transaction Amount Distribution</h3>
                                             <ResponsiveContainer width="100%" height={400}>
                                                  <PieChart>
                                                       <Pie
                                                            data={amountRanges}
                                                            dataKey="count"
                                                            nameKey="range"
                                                            cx="50%"
                                                            cy="50%"
                                                            outerRadius={120}
                                                            label={(entry) => `${entry.range}: ${entry.count}`}
                                                       >
                                                            {amountRanges.map((entry, index) => (
                                                                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                            ))}
                                                       </Pie>
                                                       <Tooltip content={<CustomPieTooltip />} />
                                                       <Legend />
                                                  </PieChart>
                                             </ResponsiveContainer>
                                        </div>
                                   )}

                                   {/* Top Credits and Debits Bar Chart */}
                                   {(topCredits.length > 0 || topDebits.length > 0) && (
                                        <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
                                             <h3 className="text-2xl font-bold text-secondary mb-6">Top Transactions</h3>
                                             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                                  {/* Top Credits */}
                                                  {topCredits.length > 0 && (
                                                       <div>
                                                            <h4 className="text-lg font-semibold text-green-400 mb-4">Top Credits</h4>
                                                            <ResponsiveContainer width="100%" height={300}>
                                                                 <BarChart data={topCredits}>
                                                                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                                                      <XAxis dataKey="description" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
                                                                      <YAxis />
                                                                      <Tooltip content={<CustomBarTooltip />} />
                                                                      <Bar dataKey="amount" fill="#10b981" />
                                                                 </BarChart>
                                                            </ResponsiveContainer>
                                                       </div>
                                                  )}

                                                  {/* Top Debits */}
                                                  {topDebits.length > 0 && (
                                                       <div>
                                                            <h4 className="text-lg font-semibold text-red-400 mb-4">Top Debits</h4>
                                                            <ResponsiveContainer width="100%" height={300}>
                                                                 <BarChart data={topDebits}>
                                                                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                                                      <XAxis dataKey="description" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
                                                                      <YAxis />
                                                                      <Tooltip content={<CustomBarTooltip />} />
                                                                      <Bar dataKey="amount" fill="#ef4444" />
                                                                 </BarChart>
                                                            </ResponsiveContainer>
                                                       </div>
                                                  )}
                                             </div>
                                        </div>
                                   )}
                              </div>
                         </>
                    )}

                    {/* Empty State */}
                    {!aiReport && !loading && !error && (
                         <div className="rounded-lg border border-light p-12 text-center">
                              <p className="text-slate-400 text-lg">Select a date range and click "Generate Report" to see AI insights</p>
                         </div>
                    )}
               </div>
          </PageWrapper>
     )
}
