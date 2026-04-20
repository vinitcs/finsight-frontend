import React from 'react'
import { PageWrapper } from '../../components/layout/PageWrapper'
import { EmptyState } from '../../components/common/EmptyState'

export const Settings = () => {
  const accountSelector = null

  return (
    <PageWrapper accountSelector={accountSelector}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-slate-400">Manage your account preferences</p>
        </div>

        <EmptyState
          title="Settings"
          description="Feature coming soon. Configure your preferences, notification settings, and more."
          icon="⚙️"
        />
      </div>
    </PageWrapper>
  )
}
