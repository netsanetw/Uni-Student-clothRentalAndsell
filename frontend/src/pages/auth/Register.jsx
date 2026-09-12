import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../api/authApi'
import { useAuth } from '../../context/AuthContext'
import { AcademicCapIcon, UserIcon, EnvelopeIcon, LockClosedIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline'

const Register = () => {
  const [role, setRole] = useState('STUDENT') // 'STUDENT' or 'VENDOR'
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    full_name: '',
    business_name: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const payload = { ...formData, role }
      await registerUser(payload)
      login({ username: formData.username, role }, 'demo-token-reg')
      navigate(role === 'VENDOR' ? '/vendor' : '/student')
    } catch (err) {
      console.warn('Backend registration fallback for UI demo', err)
      login({ username: formData.username || 'new_user', role }, 'demo-token-reg')
      navigate(role === 'VENDOR' ? '/vendor' : '/student')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-slate-100">
        
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary text-white rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-4">
            <AcademicCapIcon className="w-8 h-8 text-tertiary" />
          </div>
          <h2 className="text-3xl font-headline font-bold text-primary">Create Your Account</h2>
          <p className="text-sm text-neutralCustom mt-2">Join the ceremony attire rental platform</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex bg-slate-100 p-1.5 rounded-xl mb-8">
          <button
            type="button"
            onClick={() => setRole('STUDENT')}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              role === 'STUDENT'
                ? 'bg-primary text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🎓 I am a Student
          </button>
          <button
            type="button"
            onClick={() => setRole('VENDOR')}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              role === 'VENDOR'
                ? 'bg-primary text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🏪 I am a Vendor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <UserIcon className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="full_name"
                required
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Jane Doe"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors text-slate-900 bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          {role === 'VENDOR' && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Boutique / Business Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <BuildingStorefrontIcon className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  name="business_name"
                  required
                  value={formData.business_name}
                  onChange={handleChange}
                  placeholder="Royal Attire Rentals"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors text-slate-900 bg-slate-50 focus:bg-white"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <EnvelopeIcon className="w-5 h-5" />
              </div>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="student@university.edu"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors text-slate-900 bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Username</label>
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="unique_username"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors text-slate-900 bg-slate-50 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <LockClosedIcon className="w-5 h-5" />
              </div>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-colors text-slate-900 bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-secondary hover:bg-secondary-dark text-white font-semibold rounded-xl shadow-lg hover:shadow-secondary/30 transition-all transform hover:-translate-y-0.5 mt-4"
          >
            {loading ? 'Creating Account...' : `Register as ${role === 'VENDOR' ? 'Vendor' : 'Student'}`}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-neutralCustom">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-secondary hover:text-secondary-dark">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
