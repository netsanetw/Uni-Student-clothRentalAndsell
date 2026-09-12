import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { 
  ShoppingBagIcon, 
  UserIcon, 
  Bars3Icon, 
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline'

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-primary text-white shadow-lg sticky top-0 z-50 transition-all border-b border-primary-light/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 bg-secondary text-white rounded-xl flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform duration-200">
              <AcademicCapIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="font-headline text-xl font-bold tracking-tight block text-white">
                UniAttire
              </span>
              <span className="text-[10px] text-tertiary uppercase tracking-widest block font-medium">
                Ceremony & Attire Rentals
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link to="/" className="hover:text-tertiary transition-colors">
              Home
            </Link>
            <Link to="/student/catalog" className="hover:text-tertiary transition-colors">
              Attire Catalog
            </Link>

            {isAuthenticated && user?.role === 'STUDENT' && (
              <Link to="/student" className="hover:text-tertiary transition-colors">
                My Dashboard
              </Link>
            )}

            {isAuthenticated && user?.role === 'VENDOR' && (
              <Link to="/vendor" className="hover:text-tertiary transition-colors">
                Vendor Portal
              </Link>
            )}

            {isAuthenticated && user?.role === 'ADMIN' && (
              <Link to="/admin" className="hover:text-tertiary transition-colors">
                Admin Panel
              </Link>
            )}
          </nav>

          {/* Action Buttons / Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-primary-dark/60 px-3 py-1.5 rounded-full border border-secondary/30">
                  <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-white">
                    {user?.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-semibold text-gray-200">
                    {user?.name || user?.email || 'User'}
                  </span>
                  <span className="text-[10px] bg-tertiary/20 text-tertiary px-2 py-0.5 rounded-full font-bold uppercase">
                    {user?.role || 'STUDENT'}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-300 hover:text-white hover:bg-secondary/20 rounded-lg transition-colors"
                  title="Logout"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-white hover:text-tertiary transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-secondary hover:bg-secondary-dark rounded-xl shadow-lg hover:shadow-secondary/30 transition-all transform hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-primary-light focus:outline-none"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-primary-dark border-t border-primary-light/20 px-4 pt-4 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-200 hover:text-tertiary"
          >
            Home
          </Link>
          <Link
            to="/student/catalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-200 hover:text-tertiary"
          >
            Attire Catalog
          </Link>

          {isAuthenticated ? (
            <>
              {user?.role === 'STUDENT' && (
                <Link
                  to="/student"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-medium text-gray-200 hover:text-tertiary"
                >
                  My Dashboard
                </Link>
              )}
              {user?.role === 'VENDOR' && (
                <Link
                  to="/vendor"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-medium text-gray-200 hover:text-tertiary"
                >
                  Vendor Portal
                </Link>
              )}
              {user?.role === 'ADMIN' && (
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-medium text-gray-200 hover:text-tertiary"
                >
                  Admin Panel
                </Link>
              )}
              <div className="pt-3 border-t border-gray-700">
                <button
                  onClick={() => {
                    handleLogout()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full text-left py-2 text-base font-medium text-red-400 hover:text-red-300"
                >
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <div className="pt-4 border-t border-gray-700 flex flex-col space-y-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center font-semibold text-white bg-primary-light rounded-xl"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center font-semibold text-white bg-secondary rounded-xl"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}

export default Navbar
