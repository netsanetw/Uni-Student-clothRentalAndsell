import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  QrCodeIcon,
  ShieldCheckIcon,
  CalendarIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

const MiniAppCheckout = () => {
  const [searchParams] = useSearchParams()
  const productId = searchParams.get('id') || '1'
  const [submitted, setSubmitted] = useState(false)
  const [rentalDays, setRentalDays] = useState(3)

  const handleConfirmOrder = () => {
    setSubmitted(true)
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.HapticFeedback?.notificationOccurred('success')
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center justify-center text-center font-sans space-y-4">
        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-500/40">
          <CheckCircleIcon className="w-10 h-10" />
        </div>
        <h2 className="text-xl font-bold text-slate-100">Telegram Order Confirmed!</h2>
        <p className="text-xs text-slate-400 max-w-xs">
          Your attire reservation has been sent to the vendor. Show this Telegram QR Code at pickup.
        </p>

        {/* Pickup QR Code Simulator */}
        <div className="p-4 bg-white rounded-2xl shadow-xl flex flex-col items-center my-2">
          <QrCodeIcon className="w-36 h-36 text-slate-900" />
          <span className="text-[10px] font-mono text-slate-600 mt-1">
            ORDER #TG-849204
          </span>
        </div>

        <Link
          to="/miniapp"
          className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
        >
          Back to Mini-App Catalog
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 pb-20">
      <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
        <Link to="/miniapp" className="p-2 bg-slate-900 rounded-xl text-slate-300">
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <h1 className="text-base font-bold">Quick Telegram Checkout</h1>
      </div>

      <div className="mt-4 p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">
              Selected Item #{productId}
            </span>
            <h3 className="text-sm font-bold mt-1">Official University Graduation Gown</h3>
            <p className="text-xs text-slate-400">Includes Cap, Tassel & Stole</p>
          </div>
          <span className="text-sm font-bold text-amber-400">350 ETB</span>
        </div>

        {/* Rental Duration Picker */}
        <div className="space-y-1.5">
          <label className="text-xs text-slate-300 font-medium flex items-center gap-1">
            <CalendarIcon className="w-4 h-4 text-amber-400" /> Select Rental Duration:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[3, 5, 7].map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => setRentalDays(days)}
                className={`py-2 rounded-xl text-xs font-semibold border ${
                  rentalDays === days
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                {days} Days
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="p-3 bg-slate-950 rounded-xl space-y-2 border border-slate-800 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Base Rental Fee ({rentalDays} Days)</span>
            <span>{rentalDays * 116} ETB</span>
          </div>
          <div className="flex justify-between text-emerald-400">
            <span>Student Verified Discount (20%)</span>
            <span>-70 ETB</span>
          </div>
          <div className="border-t border-slate-800 pt-2 flex justify-between font-bold text-slate-100 text-sm">
            <span>Total Payable</span>
            <span className="text-amber-400">{rentalDays * 116 - 70} ETB</span>
          </div>
        </div>

        <button
          onClick={handleConfirmOrder}
          className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2"
        >
          <ShieldCheckIcon className="w-5 h-5" />
          Confirm Order via Telegram
        </button>
      </div>
    </div>
  )
}

export default MiniAppCheckout
