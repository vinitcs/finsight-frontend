import React from 'react'
import { useAccounts } from '../../hooks/useAccounts'

export const AccountSelector = ({ selectorFor = "dashboard", excludeAllAccounts = false }) => {
     const { accounts, selectedAccount, selectAccount } = useAccounts(selectorFor)

     return (
          <div className="flex-1 flex justify-center">
               <select
                    value={selectedAccount?.id || ''}
                    onChange={(e) => {
                         const value = e.target.value
                         if (value === '') {
                              selectAccount(null)
                         } else {
                              const acc = accounts.find((a) => a.id === value)
                              if (acc) {
                                   selectAccount(acc)
                              }
                         }
                    }}
                    className="p-1 rounded-lg text-[0.9rem] text-primary font-medium focus:outline-none focus:border-secondary transition-all border border-slate-300"
               >
                    {!excludeAllAccounts && <option value="">All Accounts</option>}
                    {accounts.map((acc) => (
                         <option key={acc.id} value={acc.id}>
                              {acc.bankName} - {acc.accountNumber}
                         </option>
                    ))}
               </select>
          </div>
     )
}

