import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import MainLayout from '../components/layout/MainLayout'

// Page Imports
import LandingPage from '../pages/public/LandingPage'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import StudentDashboard from '../pages/student/StudentDashboard'
import CatalogPage from '../pages/student/CatalogPage'
import VendorDashboard from '../pages/vendor/VendorDashboard'
import AdminDashboard from '../pages/admin/AdminDashboard'

const NotFound = () => (
  <div className="py-20 text-center space-y-4">
    <h1 className="text-4xl font-headline font-bold text-primary">404 - Page Not Found</h1>
    <p className="text-neutralCustom">The ceremony page or gown item you are looking for does not exist.</p>
  </div>
)

const AppRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student/catalog" element={<CatalogPage />} />

        {/* Student Protected Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Vendor Protected Routes */}
        <Route
          path="/vendor"
          element={
            <ProtectedRoute allowedRoles={['VENDOR']}>
              <VendorDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  )
}

export default AppRoutes
