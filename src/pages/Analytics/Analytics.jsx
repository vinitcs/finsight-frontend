import React, { useState } from 'react'
import { useAccounts } from '../../hooks/useAccounts'
import { PageWrapper } from '../../components/layout/PageWrapper'
import { MonthlyBalanceChart } from '../../components/analytics/MonthlyBalanceChart'
import { BalanceTrendChart } from '../../components/analytics/BalanceTrendChart'
import { AmountRangesTable } from '../../components/analytics/AmountRangesTable'
import { TopCreditsTable } from '../../components/analytics/TopCreditsTable'
import { TopDebitsTable } from '../../components/analytics/TopDebitsTable'
import DatePicker from '../../components/DatePicker/DatePicker'
import { AccountSelector } from '../../components/account/AccountSelector'

export const Analytics = () => {
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null })
  const { selectedAccount,  } = useAccounts('analytics')

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Analytics</h1>
          <p className="text-slate-400">Detailed breakdown of your spending</p>
        </div>
        <div className="flex w-fit gap-1.5 mt-3">
          <AccountSelector selectorFor="analytics" />
        </div>

        <div className="space-y-6">
          {/* Monthly Balance Section */}
          <div>
            <MonthlyBalanceChart selectedAccount={selectedAccount} />
          </div>

          {/* Balance Trend Section */}
          <div>
            <BalanceTrendChart selectedAccount={selectedAccount} />
          </div>

          {/* Date Filters for Amount Ranges, Top Credits, and Top Debits */}
          <div className="flex w-fit gap-1.5 mt-3">
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
                className="px-3 py-1 text-sm bg-slate-700 text-slate-300 rounded hover:bg-slate-600 transition"
              >
                Clear
              </button>
            )}
          </div>

          {/* Amount Ranges Section */}
          <div>
            <AmountRangesTable selectedAccount={selectedAccount} dateRange={dateRange} />
          </div>

          {/* Top Credits Section */}
          <div>
            <TopCreditsTable selectedAccount={selectedAccount} dateRange={dateRange} />
          </div>

          {/* Top Debits Section */}
          <div>
            <TopDebitsTable selectedAccount={selectedAccount} dateRange={dateRange} />
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
