import React from 'react'
import { useAuth } from '../../context/AuthContext'

const RoleSwitcher = () => {
  const { user, login, logout } = useAuth()

  const handleRoleChange = (role, verified = false) => {
    if (role === 'GUEST') {
      logout()
      return
    }

    let mockUser = {
      id: 1,
      email: `${role.toLowerCase()}@university.edu`,
      first_name: role === 'STUDENT' ? 'Abebe' : role === 'VENDOR' ? 'Habesha Attire Boutique' : 'Admin User',
      last_name: role === 'STUDENT' ? 'Bikila' : '',
      role: role,
    }

    if (role === 'STUDENT') {
      mockUser.student_profile = {
        university_name: 'Addis Ababa University',
        student_id_number: 'RAM/1094/14',
        is_verified: verified,
        verification_status: verified ? 'VERIFIED' : 'PENDING'
      }
    } else if (role === 'VENDOR') {
      mockUser.vendor_profile = {
        business_name: 'Habesha Couture & Ceremony Rentals',
        license_number: 'ET-ADD-2024-9921',
        is_approved: true
      }
    }

    login(mockUser, `mock-jwt-token-${role.toLowerCase()}`)
  }

  const currentRoleLabel = () => {
    if (!user) return 'Guest (Not logged in)'
    if (user.role === 'STUDENT') {
      return user.student_profile?.is_verified ? 'Verified Student (Discount Active)' : 'Unverified Student'
    }
    if (user.role === 'VENDOR') return 'Vendor (Boutique Owner)'
    if (user.role === 'ADMIN') return 'Administrator'
    return user.role
  }

  return (
    <div className="bg-slate-900 text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 shadow-inner z-50">
      <div className="flex items-center gap-2 font-medium">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="text-slate-400">Current Role Mode:</span>
        <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-200 font-semibold border border-purple-800">
          {currentRoleLabel()}
        </span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto">
        <span className="text-slate-400 mr-1 hidden sm:inline">Switch Role:</span>
        <button
          onClick={() => handleRoleChange('GUEST')}
          className={`px-2.5 py-1 rounded transition-colors ${!user ? 'bg-purple-600 text-white font-medium' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
          Guest
        </button>
        <button
          onClick={() => handleRoleChange('STUDENT', true)}
          className={`px-2.5 py-1 rounded transition-colors ${user?.role === 'STUDENT' && user?.student_profile?.is_verified ? 'bg-purple-600 text-white font-medium' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
          Student (Verified)
        </button>
        <button
          onClick={() => handleRoleChange('STUDENT', false)}
          className={`px-2.5 py-1 rounded transition-colors ${user?.role === 'STUDENT' && !user?.student_profile?.is_verified ? 'bg-amber-600 text-white font-medium' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
          Student (Unverified)
        </button>
        <button
          onClick={() => handleRoleChange('VENDOR')}
          className={`px-2.5 py-1 rounded transition-colors ${user?.role === 'VENDOR' ? 'bg-purple-600 text-white font-medium' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
          Vendor
        </button>
        <button
          onClick={() => handleRoleChange('ADMIN')}
          className={`px-2.5 py-1 rounded transition-colors ${user?.role === 'ADMIN' ? 'bg-rose-600 text-white font-medium' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
          Admin
        </button>
      </div>
    </div>
  )
}

export default RoleSwitcher
