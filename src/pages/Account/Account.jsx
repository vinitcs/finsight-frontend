import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PageWrapper } from '../../components/layout/PageWrapper'
import { Button } from '../../components/common/Button'
import { Input } from '../../components/common/Input'
import { Modal } from '../../components/common/Modal'
import { Toast } from '../../components/common/Toast'
import { Badge } from '../../components/common/Badge'
import { Loader } from '../../components/common/Loader'
import { createAccount, updateAccountThunk, deleteAccountThunk, fetchAccounts } from '../../store/slices/accountSlice'
import { BANK_NAMES } from '../../utils/constants'

export const Account = () => {
     const dispatch = useDispatch()
     const { accounts, loading, error } = useSelector((state) => state.account)

     const [showAddModal, setShowAddModal] = useState(false)
     const [editingAccount, setEditingAccount] = useState(null)
     const [showDeleteModal, setShowDeleteModal] = useState(false)
     const [deleteTarget, setDeleteTarget] = useState(null)
     const [showToast, setShowToast] = useState(false)
     const [toastMessage, setToastMessage] = useState('')
     const [toastType, setToastType] = useState('success')

     useEffect(() => {
          dispatch(fetchAccounts())
     }, [dispatch])

     const [formData, setFormData] = useState({
          bankName: '',
          accountNumber: '',
     })

     const handleInputChange = (e) => {
          const { name, value } = e.target
          setFormData((prev) => ({
               ...prev,
               [name]: value,
          }))
     }

     const resetForm = () => {
          setFormData({
               bankName: '',
               accountNumber: '',
          })
          setEditingAccount(null)
     }

     const handleAddClick = () => {
          resetForm()
          setShowAddModal(true)
     }

     const handleEditClick = (account) => {
          setEditingAccount(account)
          setFormData({
               bankName: account.bankName,
               accountNumber: account.accountNumber,
          })
          setShowAddModal(true)
     }

     const handleDeleteClick = (account) => {
          setDeleteTarget(account)
          setShowDeleteModal(true)
     }

     const handleSubmit = async (e) => {
          e.preventDefault()

          // Validation
          if (!formData.bankName || !formData.accountNumber) {
               setToastMessage('Please fill in all required fields')
               setToastType('error')
               setShowToast(true)
               return
          }

          try {
               let result
               if (editingAccount) {
                    result = await dispatch(
                         updateAccountThunk({
                              accountId: editingAccount.id,
                              data: formData,
                         })
                    ).unwrap()
                    setToastMessage('Account updated successfully')
               } else {
                    result = await dispatch(
                         createAccount(formData)
                    ).unwrap()
                    setToastMessage('Account created successfully')
               }

               setToastType('success')
               setShowToast(true)
               setShowAddModal(false)
               resetForm()
          } catch (err) {
               setToastMessage(err || 'Failed to save account')
               setToastType('error')
               setShowToast(true)
          }
     }

     const handleConfirmDelete = async () => {
          if (!deleteTarget) return

          try {
               await dispatch(deleteAccountThunk(deleteTarget.id)).unwrap()
               setToastMessage('Account deleted successfully')
               setToastType('success')
               setShowToast(true)
               setShowDeleteModal(false)
               setDeleteTarget(null)
          } catch (err) {
               setToastMessage(err || 'Failed to delete account')
               setToastType('error')
               setShowToast(true)
          }
     }

     return (
          <PageWrapper accountSelector={false}>
               <div className="space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                         <div>
                              <h1 className="text-3xl font-bold text-primary mb-2">Accounts</h1>
                              <p className="text-slate-400">Manage your bank accounts</p>
                         </div>
                         {accounts.length != 0 && (
                              <Button onClick={handleAddClick} disabled={loading}>
                              + Add Account
                         </Button>
                         )}
                    </div>

                    {/* Error Message */}
                    {error && (
                         <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400">
                              {error}
                         </div>
                    )}

                    {/* Accounts List */}
                    {loading && accounts.length === 0 ? (
                         <div className="space-y-4">
                              <Loader />
                         </div>
                    ) : accounts.length === 0 ? (
                         <div className="rounded-xl p-8 text-center">
                              <p className="text-slate-400 mb-4">No accounts found. Add your first account to get started.</p>
                              <Button onClick={handleAddClick}>+ Add Account</Button>
                         </div>
                    ) : (
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                              {accounts.map((account) => (
                                   <div
                                        key={account.id}
                                        className="w-2xs rounded-xl border border-light hover:border-secondary transition-colors"
                                   >
                                        {/* Card Header */}
                                        <div className="flex justify-between items-start p-4 mb-2">
                                             <div className="flex-1">
                                                  <h3 className="text-xl font-medium text-primary">{account.bankName}</h3>
                                                  <p className="text-md font-bold text-secondary">{account.accountNumber}</p>
                                             </div>
                                        </div>

                                        {/* Card Footer */}
                                        <div className="flex gap-2 p-4">
                                             <button
                                                  onClick={() => handleEditClick(account)}
                                                  disabled={loading}
                                                  className="flex-1 px-3 py-2 text-primary  bg-background hover:bg-primary hover:text-white rounded text-sm font-medium transition-colors disabled:opacity-50"
                                             >
                                                  Edit
                                             </button>
                                             <button
                                                  onClick={() => handleDeleteClick(account)}
                                                  disabled={loading}
                                                  className="flex-1 px-3 py-2 text-white bg-red-600/50 hover:bg-red-600 rounded text-sm font-medium transition-colors disabled:opacity-50"
                                             >
                                                  Delete
                                             </button>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    )}
               </div>

               {/* Add/Edit Account Modal */}
               <Modal
                    isOpen={showAddModal}
                    onClose={() => {
                         setShowAddModal(false)
                         resetForm()
                    }}
                    title={editingAccount ? 'Edit Account' : 'Add New Account'}
               >
                    <form onSubmit={handleSubmit} className="space-y-1">
                         {/* Bank Name */}
                         <div>
                              <label className="block text-sm font-medium text-slate-300 mb-2">
                                   Bank Name <span className="text-red-500">*</span>
                              </label>
                              <select
                                   name="bankName"
                                   value={formData.bankName}
                                   onChange={handleInputChange}
                                   className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                                   required
                              >
                                   <option value="">Select a bank</option>
                                   {BANK_NAMES.map((bank) => (
                                        <option key={bank} value={bank}>
                                             {bank}
                                        </option>
                                   ))}
                              </select>
                         </div>

                         {/* Account Number */}
                         <Input
                              label="Account Number"
                              type="text"
                              name="accountNumber"
                              value={formData.accountNumber}
                              onChange={handleInputChange}
                              placeholder="Enter account number"
                              required
                         />

                         {/* Form Actions */}
                         <div className="flex gap-3 pt-4">
                              <button
                                   type="button"
                                   onClick={() => {
                                        setShowAddModal(false)
                                        resetForm()
                                   }}
                                   className="flex-1 px-4 py-2 bg-secondary hover:bg-primary text-white rounded font-medium transition-colors"
                              >
                                   Cancel
                              </button>
                              <button
                                   type="submit"
                                   disabled={loading}
                                   className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                   {loading ? 'Saving...' : editingAccount ? 'Update' : 'Add'}
                              </button>
                         </div>
                    </form>
               </Modal>

               {/* Delete Confirmation Modal */}
               <Modal
                    isOpen={showDeleteModal}
                    onClose={() => {
                         setShowDeleteModal(false)
                         setDeleteTarget(null)
                    }}
                    title="Delete Account"
               >
                    <div className="space-y-4">
                         <p className="text-secondary">
                              Are you sure you want to delete{' '}
                              <strong className="text-primary">
                                   {deleteTarget?.bankName}-{deleteTarget?.accountNumber}
                              </strong>
                              {' '}?
                         </p>
                         <p className="text-sm text-slate-400">This action cannot be undone.</p>

                         <div className="flex gap-3 pt-4">
                              <button
                                   onClick={() => {
                                        setShowDeleteModal(false)
                                        setDeleteTarget(null)
                                   }}
                                   className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-medium transition-colors"
                              >
                                   Cancel
                              </button>
                              <button
                                   onClick={handleConfirmDelete}
                                   disabled={loading}
                                   className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium transition-colors disabled:opacity-50"
                              >
                                   {loading ? 'Deleting...' : 'Delete'}
                              </button>
                         </div>
                    </div>
               </Modal>

               {/* Toast Notification */}
               {showToast && (
                    <Toast
                         message={toastMessage}
                         type={toastType}
                         onClose={() => setShowToast(false)}
                    />
               )}
          </PageWrapper>
     )
}
