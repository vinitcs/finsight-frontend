import React, { useState } from 'react'
import { ArrowPathIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, StarIcon, UserIcon } from '@heroicons/react/24/solid'
import { useAccounts } from '../../hooks/useAccounts'
import { useSummary } from '../../hooks/useSummary'
import { useYearlyBalance } from '../../hooks/useYearlyBalance'
import { PageWrapper } from '../../components/layout/PageWrapper'
import { PieChartWidget } from '../../components/charts/PieChartWidget'
import { BarChartWidget } from "../../components/charts/BarChartWidget"
import { Skeleton } from '../../components/common/Skeleton'
import { EmptyState } from '../../components/common/EmptyState'
import { formatCurrency } from '../../utils/formatCurrency'
import { PieChartWithPaddingAngle } from '../../components/charts/PieChartWithPaddingAngleWidget'
import DatePicker from "../../components/DatePicker/DatePicker";
import { AccountSelector } from '../../components/account/AccountSelector'
import { useSelector } from 'react-redux'

export const Dashboard = () => {
  // states
  const [date, setDate] = useState({ startDate: null, endDate: null });
  const [year, setYear] = useState({ startYear: null, endYear: null });

  const { selectedAccount } = useAccounts('dashboard')
  const { user } = useSelector((state) => state.auth)

  // Summary data (filtered by date selection)
  const { summary, loading: summaryLoading } = useSummary(
    selectedAccount?.id,
    date.startDate,
    date.endDate
  )

  // Yearly balance data (filtered by year selection)
  const { yearlyBalance, loading: yearlyLoading } = useYearlyBalance(
    selectedAccount?.id,
    year.startYear,
    year.endYear
  )

  // Stat Cards
  const statCards = [
    {
      label: 'Total Transactions',
      value: summary?.totalTransactions || 0,
      icon: ArrowPathIcon,
      color: 'text-primary',
    },
    {
      label: 'Total Credits',
      value: formatCurrency(summary?.totalCredits || 0),
      icon: ArrowTrendingUpIcon,
      color: 'text-primary',
    },
    {
      label: 'Total Debits',
      value: formatCurrency(summary?.totalDebits || 0),
      icon: ArrowTrendingDownIcon,
      color: 'text-primary',
    },
    {
      label: 'Net Balance',
      value: formatCurrency(summary?.netBalance || 0),
      icon: StarIcon,
      color: 'text-primary',
    },
  ]

  const pieChartData = [
    { name: "Credit", value: summary?.creditCount },
    { name: "Debit", value: summary?.debitCount },
  ]

  const pieChartWithPaddingAngleData = [
    { name: "Credit", value: summary?.creditPercentage },
    { name: "Debit", value: summary?.debitPercentage },
  ]

  const barChartData = [
    {
      name: "Credit",
      value: summary?.creditAverage,
    },
    {
      name: "Debit",
      value: summary?.debitAverage,
    },
  ]


  const handleClearDate = () => {
    setDate({ startDate: null, endDate: null })
  }

  // const handleClearYear = () => {
  //   setYear({ startYear: null, endYear: null })
  // }


  return (
    <PageWrapper>
      <div className="space-y-8">
        {/* Header */}
        <div className='flex justify-between'>
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>

          {/* Right - User info */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="text-right hidden sm:block">
                <p className="text-xs text-primary font-bold">{user.name}</p>
                <p className="text-s text-secondary">{user.email}</p>
              </div>
            )}
          </div>
        </div>



        <div className="flex w-fit gap-1.5 mt-3">
          <AccountSelector selectorFor='dashboard' />

          <DatePicker
            placeholder={"Select start date"}
            value={date.startDate ? new Date(date.startDate) : null}
            showYearPicker={false}
            onDateChange={(selectedDate) => setDate({ ...date, startDate: selectedDate })}
          />
          <DatePicker
            placeholder={"Select end date"}
            value={date.endDate ? new Date(date.endDate) : null}
            showYearPicker={false}
            onDateChange={(selectedDate) => setDate({ ...date, endDate: selectedDate })}
          />

          <button className='border-1 border-slate-300 px-2 py-1 rounded-md text-[0.8rem] font-medium text-primary hover:bg-primary hover:text-light cursor-pointer' onClick={handleClearDate}>Clear dates</button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {
            statCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-slate-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <p className="text-slate-400 text-[1rem] mb-1">{card.label}</p>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
                {summaryLoading ? <Skeleton count={1} height="h-4" /> : <p className={`text-[1.4rem] font-bold`}>{card.value}</p>}
              </div>
            ))
          }
          {/* )} */}
        </div>

        {/* Credit vs Debit */}
        <div className="mb-6">
          <h2 className="text-[1rem] text-primary font-medium mb-4">
            Credit vs Debit
          </h2>

          <div className="flex justify-between gap-4">

            {/* Count Pie Chart */}
            <div className='w-1/3'>
              {summaryLoading ? (
                <Skeleton count={1} height="h-90" />
              ) : (
                <PieChartWidget
                  data={pieChartData}
                  title="Transaction Count"
                  height={300}
                  formatAsCurrency={false}
                />
              )}
            </div>

            {/* Average Area Chart */}
            <div className='w-1/3'>

              {summaryLoading ? (
                <Skeleton count={1} height="h-90" />
              ) : (
                <BarChartWidget
                  data={barChartData}
                  title="Average Credit Debit"
                  height={275}
                />
              )}
            </div>

            {/* Percentage PieWithPaddingAngle Chart */}
            <div className='w-1/3'>

              {summaryLoading ? (
                <Skeleton count={1} height="h-90" />
              ) : (
                <PieChartWithPaddingAngle
                  data={pieChartWithPaddingAngleData}
                  title="Credit Debit Percentage"
                  height={300}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Yearly balance summary */}
      <div className="mb-4">
        <h2 className="text-[1rem] text-primary font-medium mb-4">
          Yearly balance summary
        </h2>

        <div className="flex gap-2">
          <DatePicker
            placeholder={"Select start year"}
            value={year.startYear ? new Date(year.startYear, 0, 1) : null}
            showYearPicker={true}
            onDateChange={(selectedYear) => setYear({ ...year, startYear: selectedYear })}
          />
          <DatePicker
            placeholder={"Select end year"}
            value={year.endYear ? new Date(year.endYear, 0, 1) : null}
            showYearPicker={true}
            onDateChange={(selectedYear) => setYear({ ...year, endYear: selectedYear })}
          />

          {/* <button className='border-1 border-slate-300 px-2 py-1 rounded-xl text-[0.8rem] font-medium hover:bg-slate-400 cursor-pointer' onClick={handleClearYear}>Clear years</button> */}
        </div>

        <h6 className='text-[0.7rem] font-medium mt-1 text-secondary'>Selected year range cannot exceed 3 years</h6>

        {yearlyBalance?.length > 0 && (
          <div className='overflow-x-auto mt-[2rem] rounded-xl border border-slate-200'>
            <table className='w-full'>
              <thead>
                <tr className='bg-ternary text-center'>
                  <th className='text-light font-medium text-[0.9rem] border-b border-r border-slate-200 p-3'>Year</th>
                  <th className='text-light font-medium text-[0.9rem] border-b border-r border-slate-200 p-3'>Transaction Count</th>
                  <th className='text-light font-medium text-[0.9rem] border-b border-r border-slate-200 p-3'>Credit</th>
                  <th className='text-light font-medium text-[0.9rem] border-b border-r border-slate-200 p-3'>Debit</th>
                  <th className='text-light font-medium text-[0.9rem] border-b  border-slate-200 p-3'>Net Balance</th>
                </tr>
              </thead>
              <tbody>
                {yearlyBalance.map((tx, idx) => (
                  <tr key={idx} className='text-center hover:bg-light'>
                    <td className='border-t border-r border-slate-200 p-3'>{tx.year}</td>
                    <td className='border-t border-r border-slate-200 p-3'>{tx.transactionCount}</td>
                    <td className='border-t border-r border-slate-200 p-3'>{tx.credit}</td>
                    <td className='border-t border-slate-200 p-3'>{tx.debit}</td>
                    <td className='border-t border-l border-slate-200 p-3'>{tx.netBalance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </PageWrapper>
  )
}
