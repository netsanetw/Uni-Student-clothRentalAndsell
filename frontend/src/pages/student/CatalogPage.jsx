import React, { useState } from 'react'
import { MagnifyingGlassIcon, FunnelIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'

const CatalogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [listingType, setListingType] = useState('ALL') // 'ALL', 'RENTAL', 'SALE'
  const [searchQuery, setSearchQuery] = useState('')

  const catalogItems = [
    {
      id: 1,
      title: 'Habesha Traditional Graduation Ceremony Dress',
      category: 'TRADITIONAL',
      type: 'BOTH',
      rentalPrice: '$35.00 / 3 days',
      salePrice: '$180.00',
      vendor: 'Habesha Elegance Boutique',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
      available: true
    },
    {
      id: 2,
      title: "Men's Royal Navy Formal Suit & Silk Tie Set",
      category: 'FORMAL',
      type: 'BOTH',
      rentalPrice: '$40.00 / 3 days',
      salePrice: '$210.00',
      vendor: 'Prestige Formalwear',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop',
      available: true
    },
    {
      id: 3,
      title: 'Complete Ceremony Package (Suit + Leather Shoes + Watch)',
      category: 'PACKAGE',
      type: 'RENTAL',
      rentalPrice: '$65.00 / 3 days',
      salePrice: 'Rental Only',
      vendor: 'Campus Designer Hub',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
      available: true
    },
    {
      id: 4,
      title: 'Official Department Presentation Blazer',
      category: 'EVENT_WEAR',
      type: 'BOTH',
      rentalPrice: '$25.00 / 3 days',
      salePrice: '$120.00',
      vendor: 'Boutique Apparel',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
      available: true
    },
    {
      id: 5,
      title: 'Gold Plated Ceremony Jewelry & Necklace Set',
      category: 'ACCESSORIES',
      type: 'SALE',
      rentalPrice: 'N/A',
      salePrice: '$45.00',
      vendor: 'Jewels & Co.',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop',
      available: true
    },
    {
      id: 6,
      title: 'Graduation Cap, Gown & Hood Package',
      category: 'EVENT_WEAR',
      type: 'RENTAL',
      rentalPrice: '$45.00 / 3 days',
      salePrice: 'Rental Only',
      vendor: 'Academic Attire Provider',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop',
      available: true
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

  const filteredItems = catalogItems.filter(item => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory
    const matchesType = listingType === 'ALL' || item.type === listingType || item.type === 'BOTH'
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.vendor.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesType && matchesSearch
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-headline font-bold text-primary">University Attire & Accessories Catalog</h1>
        <p className="text-sm text-neutralCustom mt-1">Browse, rent, or buy traditional wear, formal suits, ceremony outfits, and accessories with verified student discounts.</p>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

          {/* Rent vs Buy Filter */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setListingType('ALL')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${listingType === 'ALL' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              All Options
            </button>
            <button
              onClick={() => setListingType('RENTAL')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${listingType === 'RENTAL' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              🏷️ Rent Only
            </button>
            <button
              onClick={() => setListingType('SALE')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${listingType === 'SALE' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              🛍️ Buy Now
            </button>
          </div>

          {/* Search Bar */}
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

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${selectedCategory === cat.value
                  ? 'bg-secondary text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="relative h-60 bg-slate-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-primary text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-full shadow">
                  {item.category}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <p className="text-xs text-neutralCustom font-medium">{item.vendor}</p>
                <h3 className="font-headline text-base font-bold text-primary">{item.title}</h3>
              </div>
            </div>

            <div className="p-5 pt-3 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                {item.rentalPrice !== 'N/A' && (
                  <span className="text-xs font-bold text-secondary block">Rent: {item.rentalPrice}</span>
                )}
                {item.salePrice !== 'Rental Only' && (
                  <span className="text-xs font-bold text-tertiary-dark block">Buy: {item.salePrice}</span>
                )}
              </div>

              <button className="px-4 py-2 bg-secondary hover:bg-secondary-dark text-white font-semibold text-xs rounded-xl transition-all shadow-sm">
                Reserve / Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CatalogPage
