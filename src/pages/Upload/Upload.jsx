import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAccounts } from '../../hooks/useAccounts'
import { PageWrapper } from '../../components/layout/PageWrapper'
import { uploadPDF, fetchUploads, deleteUploadThunk } from '../../store/slices/uploadSlice'
import { Button } from '../../components/common/Button'
import { EmptyState } from '../../components/common/EmptyState'
import { AccountSelector } from '../../components/account/AccountSelector'
import { ChevronLeftIcon, ChevronRightIcon, DocumentIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useUpload } from '../../hooks/useUpload'
import { Skeleton } from '../../components/common/Skeleton'
import { useToast } from '../../hooks/useToast'

export const Upload = () => {
  const dispatch = useDispatch()
  const { showToast } = useToast()
  const { selectedAccount } = useAccounts('upload');
  const { uploads, pagination,
    loading, error, setPagination, } = useUpload();
  console.log(uploads);


  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        showToast('Only PDF files are allowed', 'error')
        return
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        showToast('File size must be less than 10MB', 'error')
        return
      }
      setFile(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (!file || !selectedAccount) {
      showToast('Please select a file and account', 'error')
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('accountId', selectedAccount.id)

    const result = await dispatch(uploadPDF(formData))
    if (result.payload?.id) {
      showToast('PDF uploaded successfully! Processing...', 'success')
      setFile(null)

      // Fetch uploads to show latest status
      setTimeout(() => {
        dispatch(fetchUploads())
      }, 2000)
    } else {
      showToast(error || 'Upload failed', 'error')
    }
  }

  const handleDeleteUpload = async (uploadId) => {
    const result = await dispatch(deleteUploadThunk(uploadId))
    if (result.payload) {
      showToast('Upload deleted successfully', 'success')
    } else {
      showToast('Failed to delete upload', 'error')
    }
  }

  if (!selectedAccount) {
    return (
      <PageWrapper>
        <EmptyState title="No Account Selected" icon="💳" />
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div className='flex flex-col gap-3 items-start'>
          <h1 className="text-3xl font-bold text-primary">Upload</h1>
          <p className="text-secondary">
            Upload a PDF bank statement to import transactions
          </p>
        </div>

        {/* File Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-ternary mb-3">
            Select Account and PDF file of preferred bank
          </label>

          <div className='w-fit mt-2 mb-6'>
            <AccountSelector selectorFor='upload' excludeAllAccounts={true} />
          </div>

          <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-slate-500 transition-colors cursor-pointer">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-input"
              disabled={loading}
            />
            <label
              htmlFor="file-input"
              className="cursor-pointer flex flex-col items-center gap-3"
            >
              <DocumentIcon className="w-8 h-8" />
              {file ? (
                <div>
                  <p className="text-primary font-medium">{file.name}</p>
                  <p className="text-slate-400 text-sm">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-secondary font-medium">Drop your PDF here</p>
                  <p className="text-slate-400 text-sm">
                    or click to browse
                  </p>
                </div>
              )}
            </label>
          </div>
          <p className="text-xs text-secondary mt-2">
            Max file size: 10MB • Only PDF files supported
          </p>
          <p className="text-xs text-primary font-bold mt-2">
            Supported Banks:  CBI, BOB
          </p>
        </div>

        {/* Upload Button */}
        <Button
          onClick={handleUpload}
          disabled={!file || loading}
          isLoading={loading}
          className="w-full"
        >
          {loading ? 'Uploading...' : 'Upload Statement'}
        </Button>


        {/* Table */}
        <div className="overflow-x-auto mt-[2rem] rounded-xl border border-slate-200">
          {loading ? (
            <div className="p-6">
              <Skeleton count={12} height="h-4" className="space-y-4" />
            </div>
          ) : uploads.length > 0 ? (

            <table className="w-full">
              <thead>
                <tr className="bg-ternary text-center">
                  <th className="text-light font-medium text-[0.9rem] border-b border-r border-slate-200 p-3">
                    Upload Id
                  </th>
                  <th className="text-light font-medium text-[0.9rem] border-b border-r border-slate-200 p-3">
                    Bank Name
                  </th>
                  <th className="text-light font-medium text-[0.9rem] border-b border-r border-slate-200 p-3">
                    Account Number
                  </th>
                  <th className="text-light font-medium text-[0.9rem] border-b border-r border-slate-200 p-3">
                    File Name
                  </th>
                  <th className="text-light font-medium text-[0.9rem] border-b border-r  border-slate-200 p-3">
                    Transaction Extracted
                  </th>
                  <th className="text-light font-medium text-[0.9rem] border-b  border-slate-200 p-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {uploads.map((tx, idx) => (
                  <tr
                    key={idx}
                    className={`text-center hover:bg-light`}
                  >
                    <td className="border-t border-r border-slate-200 p-3">
                      {tx.id}
                    </td>
                    <td
                      className={`border-t border-r border-slate-200 p-3`}
                    >
                      {tx.bankName}
                    </td>
                    <td className="border-t border-r border-slate-200 p-3">
                      {tx.accountNumber}
                    </td>
                    <td className={`border-t border-r border-slate-200 p-3 text-[0.8rem] font-medium`}>
                      {tx.originalName}
                    </td>
                    <td className="border-t border-r border-slate-200 p-3">
                      {tx.rowCount}
                    </td>
                    <td className="border-t border-l border-slate-200 p-3">
                      <button
                        onClick={() => handleDeleteUpload(tx.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Delete upload"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
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
