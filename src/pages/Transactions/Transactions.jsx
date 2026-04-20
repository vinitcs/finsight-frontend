import React from 'react'
import { useAccounts } from '../../hooks/useAccounts'
import { useTransactions } from '../../hooks/useTransactions'
import { PageWrapper } from '../../components/layout/PageWrapper'
import { Skeleton } from '../../components/common/Skeleton'
import { EmptyState } from '../../components/common/EmptyState'
import { Badge } from '../../components/common/Badge'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'
import { AccountSelector } from '../../components/account/AccountSelector'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'


export const Transactions = () => {
  const { selectedAccount } = useAccounts('transactions')
  const {
    transactions,
    pagination,
    loading,
    setPagination,
  } = useTransactions(selectedAccount?.id)

  return (
    <PageWrapper>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Transactions</h1>
          <div className="flex w-fit gap-1.5 mt-3">
            <AccountSelector selectorFor='transactions' />
          </div>
          <p className="text-slate-400 mt-2 w-fit">
            Total: <span className='text-primary font-medium'>{pagination.totalCount}</span> transactions
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-[2rem] rounded-xl border border-slate-200">
          {loading ? (
            <div className="p-6">
              <Skeleton count={12} height="h-4" className="space-y-4" />
            </div>
          ) : transactions.length > 0 ? (

            <table className="w-full">
              <thead>
                <tr className="bg-ternary text-center">
                  <th className="text-light font-medium text-[0.9rem] border-b border-r border-slate-200 p-3">
                    Date
                  </th>
                  <th className="text-light font-medium text-[0.9rem] border-b border-r border-slate-200 p-3">
                    Description
                  </th>
                  <th className="text-light font-medium text-[0.9rem] border-b border-r border-slate-200 p-3">
                    Type
                  </th>
                  <th className="text-light font-medium text-[0.9rem] border-b border-r border-slate-200 p-3">
                    Amount
                  </th>
                  <th className="text-light font-medium text-[0.9rem] border-b  border-slate-200 p-3">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx, idx) => (
                  <tr
                    key={idx}
                    className={`text-center hover:bg-light`}
                  >
                    <td className="border-t border-r border-slate-200 p-3">
                      {formatDate(tx.date)}
                    </td>
                    <td className="border-t border-r border-slate-200 p-3">
                      <div>
                        <p className="text-white font-medium">{tx.merchant}</p>
                        <p className="text-slate-400 text-xs">{tx.description}</p>
                      </div>
                    </td>
                    <td className={`border-t border-r border-slate-200 p-3 text-[0.8rem] font-medium ${tx.type === 'DEBIT' ? 'text-primary' : 'text-secondary'}`}>
                      {tx.type === 'DEBIT' ? 'Debit' : 'Credit'}
                    </td>
                    <td
                      className={`border-t border-slate-200 p-3`}
                    >
                      {formatCurrency(tx.amount)}
                    </td>
                    <td className="border-t border-l border-slate-200 p-3">
                      {formatCurrency(tx.balance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <EmptyState
              title="No Transactions"
              description="Upload a bank statement to see your transactions"
            />
          )}
        </div>

        {/* Pagination */}
        {pagination.totalCount > pagination.limit && (
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => setPagination({ page: pagination.page - 1 })}
              disabled={pagination.page === 1}
              className='bg-light rounded-full p-2 hover:cursor-pointer hover:bg-primary hover:text-light'
            >
              <ChevronLeftIcon className='w-6 h-6' />
            </button>
            <span className="text-slate-400">
              Page {pagination.page} of{' '}
              {Math.ceil(pagination.totalCount / pagination.limit)}
            </span>
            <button
              onClick={() => setPagination({ page: pagination.page + 1 })}
              disabled={
                pagination.page >=
                Math.ceil(pagination.totalCount / pagination.limit)
              }
              className='bg-light rounded-full p-2 hover:cursor-pointer hover:bg-primary hover:text-light'
            >
              <ChevronRightIcon className='w-6 h-6' />
            </button>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
