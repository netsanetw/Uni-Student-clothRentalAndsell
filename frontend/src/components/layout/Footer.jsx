import React from 'react'
import { Link } from 'react-router-dom'
import { AcademicCapIcon } from '@heroicons/react/24/outline'

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-slate-300 border-t border-primary-light/20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary text-white rounded-xl flex items-center justify-center shadow-md">
                <AcademicCapIcon className="w-6 h-6" />
              </div>
              <span className="font-headline text-xl font-bold text-white">UniAttire</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              University ceremony attire rental & sales marketplace connecting students with boutique designers and clothing providers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-headline text-white text-base font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-tertiary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/student/catalog" className="hover:text-tertiary transition-colors">Attire Catalog</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-tertiary transition-colors">Student Sign In</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-tertiary transition-colors">Register as Vendor</Link>
              </li>
            </ul>
          </div>

          {/* Categories matching SRS */}
          <div>
            <h4 className="font-headline text-white text-base font-semibold mb-4">Product Categories</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/student/catalog" className="hover:text-tertiary transition-colors">Traditional & Cultural Wear</Link></li>
              <li><Link to="/student/catalog" className="hover:text-tertiary transition-colors">Formal Wear & Suits</Link></li>
              <li><Link to="/student/catalog" className="hover:text-tertiary transition-colors">University Event Wear</Link></li>
              <li><Link to="/student/catalog" className="hover:text-tertiary transition-colors">Accessories & Jewelry</Link></li>
              <li><Link to="/student/catalog" className="hover:text-tertiary transition-colors">Package Bundles</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-headline text-white text-base font-semibold mb-4">Student & Rental Terms</h4>
            <ul className="space-y-2.5 text-sm">
              <li><span className="hover:text-tertiary cursor-pointer transition-colors">Student ID Verification</span></li>
              <li><span className="hover:text-tertiary cursor-pointer transition-colors">Rental vs Purchase Policy</span></li>
              <li><span className="hover:text-tertiary cursor-pointer transition-colors">Security Deposit & Return Policy</span></li>
              <li><span className="hover:text-tertiary cursor-pointer transition-colors">Vendor Registration Terms</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} University Ceremony Attire Rental & Marketplace System.</p>
          <p className="mt-2 sm:mt-0">Verified Student Discount Platform</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
