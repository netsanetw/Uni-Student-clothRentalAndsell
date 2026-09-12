import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { 
  AcademicCapIcon, 
  ClockIcon, 
  SparklesIcon, 
  ShoppingBagIcon, 
  ShieldCheckIcon,
  ArrowUpTrayIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

const StudentDashboard = () => {
  const { user, login } = useAuth()
  const [activeTab, setActiveTab] = useState('RENTALS')
  const [userReservations, setUserReservations] = useState([])

  // Student verification simulator state
  const [idFile, setIdFile] = useState(null)
  const [universityName, setUniversityName] = useState(user?.student_profile?.university_name || 'Addis Ababa University')
  const [studentIdNum, setStudentIdNum] = useState(user?.student_profile?.student_id_number || 'RAM/1094/14')
  const [verificationSuccess, setVerificationSuccess] = useState(false)

  useEffect(() => {
    // Load local storage reservations
    const stored = JSON.parse(localStorage.getItem('student_reservations') || '[]')
    if (stored.length === 0) {
      // Default demo item
      const defaultDemo = [
        {
          id: 'RES-9012',
          productTitle: 'Habesha Traditional Graduation Ceremony Dress',
          vendor: 'Habesha Elegance Boutique',
          image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
          type: 'RENTAL',
          startDate: '2026-09-20',
          endDate: '2026-09-23',
          size: 'M',
          price: '59.75',
          status: 'RESERVED',
          paymentMethod: 'TELEBIRR',
          dateCreated: '2026-09-12'
        }
      ]
      setUserReservations(defaultDemo)
    } else {
      setUserReservations(stored)
    }
  }, [])

  const handleUploadID = (e) => {
    e.preventDefault()
    if (!idFile) return
    
    // Simulate updating student verification status to PENDING
    const updatedUser = {
      ...user,
      student_profile: {
        ...user?.student_profile,
        university_name: universityName,
        student_id_number: studentIdNum,
        is_verified: false,
        verification_status: 'PENDING'
      }
    }
    login(updatedUser, localStorage.getItem('token') || 'mock-token')
    setVerificationSuccess(true)
  }

  const isVerified = user?.student_profile?.is_verified

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary via-primary-light to-secondary text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-tertiary px-3 py-1 rounded-full text-xs font-bold border border-white/10 backdrop-blur-md">
              <SparklesIcon className="w-4 h-4" />
              <span>Student Portal</span>
            </span>
            {isVerified ? (
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
                Verified Student (15% OFF Active)
              </span>
            ) : (
              <span className="bg-amber-500/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold">
                Verification Pending / Required
              </span>
            )}
          </div>

          <h1 className="text-3xl font-headline font-bold">Welcome back, {user?.first_name || 'Student'}!</h1>
          <p className="text-sm text-purple-100 max-w-xl">
            Track active gown & suit rentals, review ceremony return schedules, download transaction receipts, and verify student credentials.
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex space-x-2 border-b border-slate-200 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('RENTALS')}
          className={`px-5 py-3 text-xs font-bold rounded-t-xl transition-all border-b-2 ${activeTab === 'RENTALS' ? 'border-secondary text-secondary bg-purple-50/50' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          🏷️ Active Rentals & Returns ({userReservations.length})
        </button>
        <button
          onClick={() => setActiveTab('VERIFICATION')}
          className={`px-5 py-3 text-xs font-bold rounded-t-xl transition-all border-b-2 ${activeTab === 'VERIFICATION' ? 'border-secondary text-secondary bg-purple-50/50' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          🪪 Student ID Verification
        </button>
        <button
          onClick={() => setActiveTab('INVOICES')}
          className={`px-5 py-3 text-xs font-bold rounded-t-xl transition-all border-b-2 ${activeTab === 'INVOICES' ? 'border-secondary text-secondary bg-purple-50/50' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          🧾 Orders & Invoices
        </button>
      </div>

      {/* Tab Content: Active Rentals */}
      {activeTab === 'RENTALS' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-headline font-bold text-primary">Your Ceremony Attire Reservations</h2>
            <Link to="/student/catalog" className="text-xs font-bold text-secondary hover:underline flex items-center gap-1">
              <ShoppingBagIcon className="w-4 h-4" />
              Book Another Item
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userReservations.map((res) => (
              <div key={res.id} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-4">
                <div className="flex gap-4">
                  <img src={res.image} alt={res.productTitle} className="w-24 h-24 object-cover rounded-xl border border-slate-100" />
                  <div className="space-y-1">
                    <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">
                      {res.status}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 leading-snug">{res.productTitle}</h3>
                    <p className="text-xs text-secondary font-medium">{res.vendor}</p>
                    <p className="text-xs text-slate-500">Size: {res.size} • Payment: {res.paymentMethod}</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl space-y-1 text-xs border border-slate-100">
                  <div className="flex justify-between text-slate-600">
                    <span>Pickup Date:</span>
                    <span className="font-bold text-slate-900">{res.startDate}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Return Date:</span>
                    <span className="font-bold text-purple-700">{res.endDate}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Paid</span>
                    <span className="text-sm font-bold text-primary">${res.price}</span>
                  </div>
                  <button className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all">
                    Return Instructions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Student Verification */}
      {activeTab === 'VERIFICATION' && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm max-w-2xl space-y-6">
          <div>
            <h2 className="text-xl font-headline font-bold text-primary">University Student ID Verification</h2>
            <p className="text-xs text-slate-500 mt-1">
              Verified university students get an instant 15% discount on all graduation gown rentals and formalwear purchases.
            </p>
          </div>

          {isVerified ? (
            <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-4">
              <CheckCircleIcon className="w-10 h-10 text-emerald-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-sm text-emerald-900">Student Status Verified!</h3>
                <p className="text-xs text-emerald-700 mt-0.5">
                  University: {user.student_profile.university_name} (ID: {user.student_profile.student_id_number})
                </p>
                <p className="text-xs text-emerald-800 font-bold mt-1">15% Discount is automatically applied at checkout!</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUploadID} className="space-y-4">
              {verificationSuccess && (
                <div className="p-4 bg-purple-50 text-purple-900 border border-purple-200 rounded-xl text-xs font-bold">
                  ✓ Student ID submitted successfully! Status updated to "Pending Review".
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">University Name:</label>
                <input
                  type="text"
                  value={universityName}
                  onChange={(e) => setUniversityName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Student ID Number:</label>
                <input
                  type="text"
                  value={studentIdNum}
                  onChange={(e) => setStudentIdNum(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Upload Student ID Card Photo / Document:</label>
                <div className="border-2 border-dashed border-slate-200 bg-slate-50 p-6 rounded-2xl text-center space-y-2 cursor-pointer hover:border-secondary transition-colors">
                  <ArrowUpTrayIcon className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-xs text-slate-600 font-medium">Click or drag & drop student ID card image (PNG, JPG, PDF)</p>
                  <input
                    type="file"
                    onChange={(e) => setIdFile(e.target.files[0])}
                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-secondary file:text-white hover:file:bg-secondary-dark cursor-pointer"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-secondary hover:bg-secondary-dark text-white font-bold text-xs rounded-xl transition-all shadow-md"
              >
                Submit ID for Admin Verification
              </button>
            </form>
          )}
        </div>
      )}

      {/* Tab Content: Orders & Invoices */}
      {activeTab === 'INVOICES' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-xl font-headline font-bold text-primary">Transaction Receipts & Invoices</h2>
          <div className="divide-y divide-slate-100">
            {userReservations.map((res) => (
              <div key={res.id} className="py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <DocumentTextIcon className="w-8 h-8 text-secondary" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{res.productTitle}</h4>
                    <p className="text-[10px] text-slate-500">Ref: {res.id} • Date: {res.dateCreated}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-900">${res.price}</span>
                  <button
                    onClick={() => alert(`Simulated receipt download for ${res.id}`)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors"
                  >
                    Download Invoice
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentDashboard
