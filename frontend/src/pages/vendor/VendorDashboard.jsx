import React, { useState } from 'react'
import { 
  BuildingStorefrontIcon, 
  CurrencyDollarIcon, 
  TagIcon, 
  ClipboardDocumentListIcon,
  PlusIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  StarIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('ANALYTICS')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // Demo Inventory State
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Habesha Traditional Graduation Ceremony Dress',
      category: 'Traditional & Cultural',
      rentalPrice: '$35.00 / 3 days',
      salePrice: '$180.00',
      stock: 5,
      status: 'AVAILABLE'
    },
    {
      id: 2,
      name: "Men's Royal Navy Formal Suit & Silk Tie Set",
      category: 'Formal Wear',
      rentalPrice: '$40.00 / 3 days',
      salePrice: '$210.00',
      stock: 8,
      status: 'AVAILABLE'
    },
    {
      id: 3,
      name: 'Master Degree Black Velvet Hood & Cap Set',
      category: 'University Event Wear',
      rentalPrice: '$30.00 / 3 days',
      salePrice: 'N/A',
      stock: 12,
      status: 'AVAILABLE'
    }
  ])

  // Demo Rental Requests Queue
  const [rentalRequests, setRentalRequests] = useState([
    {
      id: 'REQ-101',
      studentName: 'Abebe Bikila',
      university: 'Addis Ababa University',
      attire: 'Habesha Traditional Graduation Ceremony Dress',
      dates: '2026-09-20 to 2026-09-23',
      amount: '$35.00',
      status: 'PENDING'
    },
    {
      id: 'REQ-102',
      studentName: 'Tigist Assefa',
      university: 'Haramaya University',
      attire: "Men's Royal Navy Formal Suit",
      dates: '2026-09-22 to 2026-09-25',
      amount: '$40.00',
      status: 'APPROVED'
    }
  ])

  // New Product Form State
  const [newProductName, setNewProductName] = useState('')
  const [newCategory, setNewCategory] = useState('Traditional & Cultural')
  const [newRentalPrice, setNewRentalPrice] = useState('')
  const [newSalePrice, setNewSalePrice] = useState('')
  const [newStock, setNewStock] = useState(5)

  const handleAddProduct = (e) => {
    e.preventDefault()
    if (!newProductName || !newRentalPrice) return

    const newProd = {
      id: Date.now(),
      name: newProductName,
      category: newCategory,
      rentalPrice: `$${newRentalPrice} / 3 days`,
      salePrice: newSalePrice ? `$${newSalePrice}` : 'N/A',
      stock: Number(newStock),
      status: 'AVAILABLE'
    }

    setProducts([newProd, ...products])
    setIsAddModalOpen(false)
    setNewProductName('')
    setNewRentalPrice('')
    setNewSalePrice('')
  }

  const handleApproveRequest = (id) => {
    setRentalRequests(rentalRequests.map(r => r.id === id ? { ...r, status: 'APPROVED' } : r))
  }

  const handleRejectRequest = (id) => {
    setRentalRequests(rentalRequests.map(r => r.id === id ? { ...r, status: 'REJECTED' } : r))
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-secondary-light text-xs font-bold uppercase tracking-wider mb-1">
            <BuildingStorefrontIcon className="w-4 h-4" />
            <span>Habesha Couture & Ceremony Rentals</span>
          </div>
          <h1 className="text-3xl font-headline font-bold">Vendor Management Portal</h1>
          <p className="text-sm text-slate-300">Manage attire inventory, approve student reservations, and monitor revenue performance.</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-3 bg-secondary hover:bg-secondary-dark text-white text-xs font-bold rounded-xl transition-all shadow-lg flex items-center gap-2 flex-shrink-0"
        >
          <PlusIcon className="w-4 h-4" />
          <span>+ Add New Product</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-semibold">Total Revenue</span>
            <CurrencyDollarIcon className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">$3,420.00</p>
          <p className="text-[10px] text-emerald-600 font-bold">↑ +18% from last graduation season</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-semibold">Active Inventory</span>
            <TagIcon className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{products.length} Products</p>
          <p className="text-[10px] text-slate-500 font-medium">All items listed on marketplace</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-semibold">Pending Requests</span>
            <ClipboardDocumentListIcon className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {rentalRequests.filter(r => r.status === 'PENDING').length} Orders
          </p>
          <p className="text-[10px] text-amber-600 font-bold">Requires vendor approval</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-semibold">Customer Rating</span>
            <StarIcon className="w-5 h-5 text-tertiary-dark fill-tertiary-light" />
          </div>
          <p className="text-2xl font-bold text-slate-900">4.9 / 5.0</p>
          <p className="text-[10px] text-slate-500 font-medium">Based on 142 student reviews</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('ANALYTICS')}
          className={`px-5 py-3 text-xs font-bold rounded-t-xl transition-all border-b-2 ${activeTab === 'ANALYTICS' ? 'border-secondary text-secondary bg-purple-50/50' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          📊 Analytics Overview
        </button>
        <button
          onClick={() => setActiveTab('INVENTORY')}
          className={`px-5 py-3 text-xs font-bold rounded-t-xl transition-all border-b-2 ${activeTab === 'INVENTORY' ? 'border-secondary text-secondary bg-purple-50/50' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          👗 Product Inventory ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('REQUESTS')}
          className={`px-5 py-3 text-xs font-bold rounded-t-xl transition-all border-b-2 ${activeTab === 'REQUESTS' ? 'border-secondary text-secondary bg-purple-50/50' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          📩 Rental Approvals ({rentalRequests.length})
        </button>
      </div>

      {/* Tab 1: Analytics Overview */}
      {activeTab === 'ANALYTICS' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <h2 className="text-lg font-headline font-bold text-primary">Monthly Rental Demand & Revenue</h2>
          <div className="grid grid-cols-6 gap-2 items-end h-48 pt-6 border-b border-slate-100">
            {[
              { month: 'Apr', val: 30 },
              { month: 'May', val: 45 },
              { month: 'Jun', val: 90 },
              { month: 'Jul', val: 100 },
              { month: 'Aug', val: 65 },
              { month: 'Sep', val: 85 }
            ].map((bar) => (
              <div key={bar.month} className="flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-secondary hover:bg-secondary-dark rounded-t-lg transition-all"
                  style={{ height: `${bar.val * 1.5}px` }}
                ></div>
                <span className="text-xs font-bold text-slate-600">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Product Inventory */}
      {activeTab === 'INVENTORY' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 text-xs font-bold border-b border-slate-200">
                <th className="p-4">Product Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Rental Price</th>
                <th className="p-4">Sale Price</th>
                <th className="p-4">In Stock</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">{p.name}</td>
                  <td className="p-4 text-slate-600">{p.category}</td>
                  <td className="p-4 font-bold text-secondary">{p.rentalPrice}</td>
                  <td className="p-4 font-bold text-tertiary-dark">{p.salePrice}</td>
                  <td className="p-4 font-bold text-slate-800">{p.stock} units</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Rental Approvals */}
      {activeTab === 'REQUESTS' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-headline font-bold text-primary">Student Reservation Requests</h2>
          <div className="divide-y divide-slate-100">
            {rentalRequests.map((req) => (
              <div key={req.id} className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{req.studentName}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">{req.university}</span>
                  </div>
                  <p className="text-xs text-secondary font-semibold mt-0.5">{req.attire}</p>
                  <p className="text-[10px] text-slate-500">Requested Dates: {req.dates} • Amount: {req.amount}</p>
                </div>

                <div className="flex items-center gap-2">
                  {req.status === 'PENDING' ? (
                    <>
                      <button
                        onClick={() => handleApproveRequest(req.id)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                      >
                        Approve Request
                      </button>
                      <button
                        onClick={() => handleRejectRequest(req.id)}
                        className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-all"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${req.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {req.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-headline text-lg font-bold text-primary">Add New Attire Listing</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Product Title:</label>
                <input
                  type="text"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  placeholder="e.g. Master Graduation Velvet Gown"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Category:</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                >
                  <option value="Traditional & Cultural">Traditional & Cultural</option>
                  <option value="Formal Wear">Formal Wear & Suits</option>
                  <option value="University Event Wear">University Event Wear</option>
                  <option value="Accessories">Accessories & Jewelry</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">3-Day Rental Price ($):</label>
                  <input
                    type="number"
                    value={newRentalPrice}
                    onChange={(e) => setNewRentalPrice(e.target.value)}
                    placeholder="35"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Sale Price ($ Optional):</label>
                  <input
                    type="number"
                    value={newSalePrice}
                    onChange={(e) => setNewSalePrice(e.target.value)}
                    placeholder="180"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Available Quantity / Stock:</label>
                <input
                  type="number"
                  value={newStock}
                  onChange={(e) => setNewStock(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  min="1"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-secondary hover:bg-secondary-dark text-white font-bold text-xs rounded-xl transition-all shadow-md mt-2"
              >
                Publish Listing to Marketplace
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default VendorDashboard
