import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  AcademicCapIcon,
  SparklesIcon,
  ShoppingBagIcon,
  QrCodeIcon,
  CheckBadgeIcon,
  ChevronRightIcon,
  BoltIcon
} from '@heroicons/react/24/outline'

const MOCK_TELEGRAM_PRODUCTS = [
  {
    id: 1,
    title: 'University Official Graduation Gown',
    category: 'Gowns',
    price: 350,
    unit: 'ETB / 3 Days',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&q=80',
    available: true
  },
  {
    id: 2,
    title: 'Habesha Traditional Ceremony Dress',
    category: 'Traditional',
    price: 450,
    unit: 'ETB / 3 Days',
    image: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?w=500&q=80',
    available: true
  },
  {
    id: 3,
    title: 'Slim-Fit Graduation Suit',
    category: 'Formal',
    price: 500,
    unit: 'ETB / 3 Days',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80',
    available: true
  }
]

const MiniAppHome = () => {
  const [telegramUser, setTelegramUser] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    // Detect Telegram WebApp context
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp
      tg.ready()
      tg.expand()
      if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        setTelegramUser(tg.initDataUnsafe.user)
      }
    }
  }, [])

  const filteredProducts =
    selectedCategory === 'All'
      ? MOCK_TELEGRAM_PRODUCTS
      : MOCK_TELEGRAM_PRODUCTS.filter((p) => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
      {/* Telegram Header Bar */}
      <div className="p-4 bg-gradient-to-b from-indigo-950/80 via-slate-900 to-slate-950 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-600 flex items-center justify-center font-bold text-slate-950 shadow-md">
              {telegramUser?.first_name ? telegramUser.first_name[0] : 'U'}
            </div>
            <div>
              <p className="text-xs text-amber-400 font-medium flex items-center gap-1">
                <BoltIcon className="w-3.5 h-3.5" /> Telegram Mini-App
              </p>
              <h2 className="text-base font-bold text-slate-100">
                Hi, {telegramUser?.first_name || 'Student'} 👋
              </h2>
            </div>
          </div>
          <span className="text-[11px] px-2 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full font-mono">
            ID Verified 20% OFF
          </span>
        </div>

        {/* Search & Banner */}
        <div className="mt-4 p-3 bg-gradient-to-r from-amber-600/30 via-yellow-600/20 to-slate-900 rounded-2xl border border-amber-500/30 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-amber-300 font-bold">
              Ceremony Special
            </span>
            <h3 className="text-sm font-semibold text-white">Reserve Gowns & Suits</h3>
            <p className="text-[11px] text-slate-300">Fast pickup on campus</p>
          </div>
          <AcademicCapIcon className="w-10 h-10 text-amber-400 opacity-90" />
        </div>
      </div>

      {/* Category Pills */}
      <div className="px-4 py-3 flex space-x-2 overflow-x-auto scrollbar-none border-b border-slate-800/60">
        {['All', 'Gowns', 'Traditional', 'Formal'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product List Grid */}
      <div className="p-4 space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Available Ceremony Attire ({filteredProducts.length})
        </h3>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 flex space-x-3 items-center"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-20 h-20 object-cover rounded-xl border border-slate-800 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] bg-slate-800 text-amber-300 px-2 py-0.5 rounded font-mono">
                {product.category}
              </span>
              <h4 className="text-sm font-semibold text-slate-100 truncate mt-1">
                {product.title}
              </h4>
              <p className="text-xs text-amber-400 font-bold mt-0.5">
                {product.price} <span className="text-[10px] text-slate-400 font-normal">{product.unit}</span>
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  ● Ready for Pickup
                </span>
                <Link
                  to={`/miniapp/checkout?id=${product.id}`}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Telegram Mini-App Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-6 py-2.5 flex items-center justify-around z-40">
        <Link to="/miniapp" className="flex flex-col items-center text-amber-400 text-[10px] font-medium">
          <ShoppingBagIcon className="w-5 h-5" />
          Catalog
        </Link>
        <Link to="/miniapp/checkout" className="flex flex-col items-center text-slate-400 hover:text-amber-400 text-[10px] font-medium">
          <QrCodeIcon className="w-5 h-5" />
          Pickup QR
        </Link>
        <Link to="/student" className="flex flex-col items-center text-slate-400 hover:text-amber-400 text-[10px] font-medium">
          <AcademicCapIcon className="w-5 h-5" />
          Full Web App
        </Link>
      </div>
    </div>
  )
}

export default MiniAppHome
