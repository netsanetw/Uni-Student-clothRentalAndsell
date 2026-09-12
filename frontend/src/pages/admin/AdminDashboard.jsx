import React from 'react'
import { ShieldCheckIcon, UserGroupIcon, BuildingStorefrontIcon, DocumentCheckIcon } from '@heroicons/react/24/outline'

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="bg-primary text-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-headline font-bold">System Administration Panel</h1>
        <p className="text-sm text-slate-300 mt-1">Platform management, vendor approvals, and ceremony system monitoring.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
            <UserGroupIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-neutralCustom font-medium">Registered Students</p>
            <p className="text-2xl font-bold text-primary">1,450</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center">
            <BuildingStorefrontIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-neutralCustom font-medium">Verified Vendors</p>
            <p className="text-2xl font-bold text-primary">18 Boutiques</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-tertiary/10 text-tertiary-dark rounded-xl flex items-center justify-center">
            <DocumentCheckIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-neutralCustom font-medium">Pending Vendor Approvals</p>
            <p className="text-2xl font-bold text-primary">3 Applications</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <h2 className="text-xl font-headline font-bold text-primary mb-2">Platform Control</h2>
        <p className="text-xs text-slate-500">Configure university ceremony schedules, gown rules, and vendor commission parameters.</p>
      </div>
    </div>
  )
}

export default AdminDashboard
