import React, { useState } from 'react'
import { MagnifyingGlassIcon, CheckCircleIcon, XMarkIcon, SparklesIcon, CalendarIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../../context/AuthContext'

const CatalogPage = () => {
  const { user } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [listingType, setListingType] = useState('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  // Modal State
  const [selectedItem, setSelectedItem] = useState(null)
  const [mode, setMode] = useState('RENTAL') // RENTAL or BUY
  const [rentalDays, setRentalDays] = useState(3)
  const [startDate, setStartDate] = useState('2026-09-20')
  const [selectedSize, setSelectedSize] = useState('M')
  const [paymentMethod, setPaymentMethod] = useState('TELEBIRR')
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const isVerifiedStudent = user?.role === 'STUDENT' && user?.student_profile?.is_verified

  const catalogItems = [
    {
      id: 1,
      title: 'Habesha Traditional Graduation Ceremony Dress',
      category: 'TRADITIONAL',
      type: 'BOTH',
      rentalPricePerDay: 12,
      baseRentalPrice: 35, // 3 days
      salePrice: 180,
      vendor: 'Habesha Elegance Boutique',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
      available: true,
      sizes: ['S', 'M', 'L', 'XL'],
      deposit: 30
    },
    {
      id: 2,
      title: "Men's Royal Navy Formal Suit & Silk Tie Set",
      category: 'FORMAL',
      type: 'BOTH',
      rentalPricePerDay: 14,
      baseRentalPrice: 40,
      salePrice: 210,
      vendor: 'Prestige Formalwear',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop',
      available: true,
      sizes: ['38R', '40R', '42R', '44R'],
      deposit: 40
    },
    {
      id: 3,
      title: 'Complete Ceremony Package (Suit + Leather Shoes + Watch)',
      category: 'PACKAGE',
      type: 'RENTAL',
      rentalPricePerDay: 22,
      baseRentalPrice: 65,
      salePrice: null,
      vendor: 'Campus Designer Hub',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
      available: true,
      sizes: ['M', 'L', 'XL'],
      deposit: 50
    },
    {
      id: 4,
      title: 'Official Department Presentation Blazer',
      category: 'EVENT_WEAR',
      type: 'BOTH',
      rentalPricePerDay: 9,
      baseRentalPrice: 25,
      salePrice: 120,
      vendor: 'Boutique Apparel',
      image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800&auto=format&fit=crop',
      available: true,
      sizes: ['S', 'M', 'L'],
      deposit: 20
    },
    {
      id: 5,
      title: 'Gold Plated Ceremony Jewelry & Necklace Set',
      category: 'ACCESSORIES',
      type: 'SALE',
      rentalPricePerDay: null,
      baseRentalPrice: null,
      salePrice: 45,
      vendor: 'Jewels & Co.',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
      available: true,
      sizes: ['One Size'],
      deposit: 0
    },
    {
      id: 6,
      title: 'Graduation Cap, Gown & Hood Package',
      category: 'EVENT_WEAR',
      type: 'RENTAL',
      rentalPricePerDay: 15,
      baseRentalPrice: 45,
      salePrice: null,
      vendor: 'Academic Attire Provider',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop',
      available: true,
      sizes: ['S', 'M', 'L', 'XL'],
      deposit: 25
    }
  ]

  const categories = [
    { label: 'All Items', value: 'ALL' },
    { label: 'Traditional & Cultural', value: 'TRADITIONAL' },
    { label: 'Formal Wear & Suits', value: 'FORMAL' },
    { label: 'University Event Wear', value: 'EVENT_WEAR' },
    { label: 'Accessories & Jewelry', value: 'ACCESSORIES' },
    { label: 'Package Bundles', value: 'PACKAGE' }
  ]

  const openBookingModal = (item) => {
    setSelectedItem(item)
    setMode(item.type === 'SALE' ? 'BUY' : 'RENTAL')
    setBookingSuccess(false)
  }

  const calculateTotalPrice = () => {
    if (!selectedItem) return { subtotal: 0, discount: 0, deposit: 0, total: 0 }
    
    let subtotal = 0
    let deposit = 0

    if (mode === 'BUY') {
      subtotal = selectedItem.salePrice || 0
    } else {
      subtotal = selectedItem.baseRentalPrice + (rentalDays - 3) * (selectedItem.rentalPricePerDay || 10)
      if (rentalDays < 3) subtotal = selectedItem.baseRentalPrice
      deposit = selectedItem.deposit || 0
    }

    const discountRate = isVerifiedStudent ? 0.15 : 0
    const discount = subtotal * discountRate
    const total = (subtotal - discount) + deposit

    return { subtotal, discount, deposit, total }
  }

  const handleConfirmBooking = () => {
    const pricing = calculateTotalPrice()
    const newRecord = {
      id: Date.now(),
      productTitle: selectedItem.title,
      vendor: selectedItem.vendor,
      image: selectedItem.image,
      type: mode,
      startDate: mode === 'RENTAL' ? startDate : 'N/A',
      endDate: mode === 'RENTAL' ? `2026-09-${parseInt(startDate.split('-')[2]) + parseInt(rentalDays)}` : 'N/A',
      size: selectedSize,
      price: pricing.total.toFixed(2),
      status: mode === 'RENTAL' ? 'RESERVED' : 'PAID',
      paymentMethod,
      dateCreated: new Date().toLocaleDateString()
    }

    // Save to localStorage for demo persistence
    const currentList = JSON.parse(localStorage.getItem('student_reservations') || '[]')
    localStorage.setItem('student_reservations', JSON.stringify([newRecord, ...currentList]))

    setBookingSuccess(true)
  }

  const filteredItems = catalogItems.filter(item => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory
    const matchesType = listingType === 'ALL' || item.type === listingType || item.type === 'BOTH'
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.vendor.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesType && matchesSearch
  })

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-headline font-bold text-primary">University Attire & Accessories Catalog</h1>
          <p className="text-sm text-neutralCustom mt-1">Browse, rent, or purchase ceremony dresses, formal suits, and official campus attire.</p>
        </div>

        {isVerifiedStudent ? (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3.5 py-2 rounded-xl border border-emerald-200 text-xs font-bold shadow-sm">
            <ShieldCheckIcon className="w-5 h-5 text-emerald-600" />
            <span>Verified Student Discount Active (15% OFF)</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-amber-50 text-amber-800 px-3.5 py-2 rounded-xl border border-amber-200 text-xs font-semibold">
            <SparklesIcon className="w-4 h-4 text-amber-600" />
            <span>Verify Student ID in your profile to unlock 15% discount</span>
          </div>
        )}
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setListingType('ALL')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${listingType === 'ALL' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              All Options
            </button>
            <button
              onClick={() => setListingType('RENTAL')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${listingType === 'RENTAL' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              🏷️ Rent Only
            </button>
            <button
              onClick={() => setListingType('SALE')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${listingType === 'SALE' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              🛍️ Buy Now
            </button>
          </div>

          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <MagnifyingGlassIcon className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dress, suit, shoes, vendor..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:border-secondary focus:ring-1 focus:ring-secondary text-slate-900 bg-slate-50"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${selectedCategory === cat.value
                ? 'bg-secondary text-white shadow-sm'
                : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
            <div>
              <div className="relative h-64 bg-slate-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-primary text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-full shadow">
                  {item.category.replace('_', ' ')}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <p className="text-xs text-secondary font-semibold">{item.vendor}</p>
                <h3 className="font-headline text-base font-bold text-primary leading-snug">{item.title}</h3>
              </div>
            </div>

            <div className="p-5 pt-3 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                {item.baseRentalPrice && (
                  <span className="text-xs font-bold text-slate-800 block">Rent: ${item.baseRentalPrice} / 3 days</span>
                )}
                {item.salePrice && (
                  <span className="text-xs font-bold text-tertiary-dark block">Buy: ${item.salePrice}</span>
                )}
              </div>

              <button
                onClick={() => openBookingModal(item)}
                className="px-4 py-2 bg-secondary hover:bg-secondary-dark text-white font-semibold text-xs rounded-xl transition-all shadow-sm transform hover:-translate-y-0.5"
              >
                Reserve / Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reservation & Order Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 bg-primary text-white flex justify-between items-center">
              <div>
                <h3 className="font-headline text-lg font-bold">Attire Checkout & Reservation</h3>
                <p className="text-xs text-purple-200">{selectedItem.vendor}</p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1 rounded-full hover:bg-white/10 text-white transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-5 text-slate-800">
              {bookingSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <CheckCircleIcon className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
                  <h4 className="text-2xl font-headline font-bold text-slate-900">Reservation Confirmed!</h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Your request for <strong className="text-primary">{selectedItem.title}</strong> has been saved successfully.
                  </p>
                  <p className="text-xs text-purple-700 bg-purple-50 p-3 rounded-xl font-medium border border-purple-200">
                    You can track your active rentals, returns, and payment invoice in your Student Dashboard.
                  </p>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="w-full py-3 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary-dark transition-colors"
                  >
                    Return to Catalog
                  </button>
                </div>
              ) : (
                <>
                  {/* Item Summary */}
                  <div className="flex gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <img src={selectedItem.image} alt={selectedItem.title} className="w-20 h-20 object-cover rounded-xl" />
                    <div className="flex-1 space-y-1">
                      <h4 className="font-bold text-sm text-slate-900">{selectedItem.title}</h4>
                      <p className="text-xs text-slate-500">Category: {selectedItem.category}</p>
                    </div>
                  </div>

                  {/* Mode Toggle (Rental vs Buy) */}
                  {selectedItem.type === 'BOTH' && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">Transaction Type:</label>
                      <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
                        <button
                          type="button"
                          onClick={() => setMode('RENTAL')}
                          className={`py-2 text-xs font-bold rounded-lg transition-all ${mode === 'RENTAL' ? 'bg-white text-primary shadow-sm' : 'text-slate-600'}`}
                        >
                          🏷️ Rent Attire
                        </button>
                        <button
                          type="button"
                          onClick={() => setMode('BUY')}
                          className={`py-2 text-xs font-bold rounded-lg transition-all ${mode === 'BUY' ? 'bg-white text-primary shadow-sm' : 'text-slate-600'}`}
                        >
                          🛍️ Buy Outright
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Rental Options */}
                  {mode === 'RENTAL' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Rental Start Date:</label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Duration:</label>
                        <select
                          value={rentalDays}
                          onChange={(e) => setRentalDays(Number(e.target.value))}
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                        >
                          <option value={3}>3 Days (Standard)</option>
                          <option value={7}>7 Days (Full Week)</option>
                          <option value={14}>14 Days (Extended)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Size Selector */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Select Size:</label>
                    <div className="flex gap-2">
                      {selectedItem.sizes.map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${selectedSize === sz ? 'bg-secondary text-white border-secondary' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payment Gateway Choice */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Payment Method:</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['TELEBIRR', 'CHAPA', 'CBE_BIRR'].map((pm) => (
                        <button
                          key={pm}
                          type="button"
                          onClick={() => setPaymentMethod(pm)}
                          className={`py-2 text-[10px] font-bold rounded-xl border text-center transition-all ${paymentMethod === pm ? 'bg-purple-50 text-purple-900 border-purple-600 font-extrabold' : 'bg-slate-50 text-slate-600 border-slate-200'}`}
                        >
                          {pm === 'TELEBIRR' ? '📱 Telebirr' : pm === 'CHAPA' ? '💳 Chapa' : '🏦 CBE Birr'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Calculation Summary */}
                  {(() => {
                    const { subtotal, discount, deposit, total } = calculateTotalPrice()
                    return (
                      <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2 text-xs">
                        <div className="flex justify-between text-slate-300">
                          <span>Subtotal:</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>

                        {isVerifiedStudent && (
                          <div className="flex justify-between text-emerald-400 font-bold">
                            <span>Student Discount (15% OFF):</span>
                            <span>-${discount.toFixed(2)}</span>
                          </div>
                        )}

                        {mode === 'RENTAL' && deposit > 0 && (
                          <div className="flex justify-between text-amber-300">
                            <span>Refundable Deposit:</span>
                            <span>+${deposit.toFixed(2)}</span>
                          </div>
                        )}

                        <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-bold text-white">
                          <span>Total Amount Due:</span>
                          <span className="text-tertiary-light">${total.toFixed(2)}</span>
                        </div>
                      </div>
                    )
                  })()}

                  <button
                    onClick={handleConfirmBooking}
                    className="w-full py-3.5 bg-secondary hover:bg-secondary-dark text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-secondary/20 transform hover:-translate-y-0.5"
                  >
                    Confirm & Complete Checkout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CatalogPage
