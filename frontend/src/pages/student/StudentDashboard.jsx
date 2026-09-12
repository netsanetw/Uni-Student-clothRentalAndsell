import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { AcademicCapIcon, ClockIcon, SparklesIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline'

const StudentDashboard = () => {
  const { user } = useAuth()

  const activeRentals = [
    {
      id: 'ORD-8921',
      attire: 'Bachelor Gown & Cap Set (Size: M)',
      vendor: 'Royal University Attire',
      pickupDate: '2026-09-15',
      returnDate: '2026-09-18',
      status: 'CONFIRMED',
      price: '$45.00'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-primary text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center space-x-2 bg-secondary/30 text-tertiary px-3 py-1 rounded-full text-xs font-semibold">
            <SparklesIcon className="w-4 h-4" />
            <span>Student Portal</span>
          </div>
          <h1 className="text-3xl font-headline font-bold">Welcome, {user?.name || user?.username || 'Student'}!</h1>
          <p className="text-sm text-slate-300">Manage your active ceremony gown rentals, measurements, and ceremony schedules.</p>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
          <div className="w-10 h-10 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center">
            <ShoppingBagIcon className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-headline font-bold text-primary">Browse Attire Catalog</h3>
          <p className="text-xs text-neutralCustom">Explore available bachelor, master, and doctoral gown sets.</p>
          <Link to="/student/catalog" className="inline-block text-xs font-bold text-secondary hover:underline pt-2">
            Explore Catalog &rarr;
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
          <div className="w-10 h-10 bg-tertiary/10 text-tertiary-dark rounded-xl flex items-center justify-center">
            <UserIcon className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-headline font-bold text-primary">My Fit & Measurements</h3>
          <p className="text-xs text-neutralCustom">Height: 175cm | Cap Size: Medium (57cm)</p>
          <button className="inline-block text-xs font-bold text-secondary hover:underline pt-2">
            Update Measurements &rarr;
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-3">
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
            <ClockIcon className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-headline font-bold text-primary">Ceremony Date</h3>
          <p className="text-xs text-neutralCustom">Grand Graduation Ceremony: Oct 12, 2026</p>
          <span className="inline-block text-xs font-bold text-slate-500 pt-2">33 Days Remaining</span>
        </div>
      </div>

      {/* Active Rental Orders */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
        <h2 className="text-xl font-headline font-bold text-primary">Active Attire Rentals</h2>

        {activeRentals.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {activeRentals.map((order) => (
              <div key={order.id} className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary font-bold text-sm">
                    <AcademicCapIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">{order.attire}</h4>
                    <p className="text-xs text-slate-500">Order ID: {order.id} • Vendor: {order.vendor}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Pickup: {order.pickupDate} | Return: {order.returnDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200">
                    {order.status}
                  </span>
                  <span className="font-bold text-primary text-sm">{order.price}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutralCustom">No active attire rentals found.</p>
        )}
      </div>
    </div>
  )
}

export default StudentDashboard
