import React from 'react'
import { BuildingStorefrontIcon, CurrencyDollarIcon, TagIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline'

const VendorDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="bg-primary text-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-headline font-bold">Vendor Management Portal</h1>
        <p className="text-sm text-slate-300 mt-1">Track your attire inventory, active rental orders, and revenue statistics.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center">
            <TagIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-neutralCustom font-medium">Active Inventory Items</p>
            <p className="text-2xl font-bold text-primary">24 Sets</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-tertiary/10 text-tertiary-dark rounded-xl flex items-center justify-center">
            <ClipboardDocumentListIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-neutralCustom font-medium">Pending Rental Requests</p>
            <p className="text-2xl font-bold text-primary">8 Orders</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
            <CurrencyDollarIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-neutralCustom font-medium">Total Season Revenue</p>
            <p className="text-2xl font-bold text-primary">$3,420.00</p>
          </div>
        </div>
      </div>

      {/* Inventory & Orders placeholder */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-headline font-bold text-primary">Managed Attire Listings</h2>
          <button className="px-4 py-2 bg-secondary text-white text-xs font-semibold rounded-xl hover:bg-secondary-dark transition-all">
            + Add New Gown Set
          </button>
        </div>
        <p className="text-xs text-slate-500">Your boutique inventory items are in active synchronization with the student rental marketplace.</p>
      </div>
    </div>
  )
}

export default VendorDashboard
