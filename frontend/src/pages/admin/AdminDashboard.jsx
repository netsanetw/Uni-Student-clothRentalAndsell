import React, { useState } from 'react'
import { 
  ShieldCheckIcon, 
  UserGroupIcon, 
  BuildingStorefrontIcon, 
  DocumentCheckIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('STUDENT_VERIFICATION')

  // Demo Student Verification Queue
  const [studentVerifications, setStudentVerifications] = useState([
    {
      id: 1,
      studentName: 'Abebe Bikila',
      email: 'abebe@aau.edu.et',
      university: 'Addis Ababa University',
      studentIdNum: 'RAM/1094/14',
      dateSubmitted: '2026-09-12',
      status: 'PENDING'
    },
    {
      id: 2,
      studentName: 'Makeda Haile',
      email: 'makeda@ju.edu.et',
      university: 'Jimma University',
      studentIdNum: 'JU/8821/15',
      dateSubmitted: '2026-09-11',
      status: 'VERIFIED'
    },
    {
      id: 3,
      studentName: 'Dawit Solomon',
      email: 'dawit@hu.edu.et',
      university: 'Hawassa University',
      studentIdNum: 'HU/4402/14',
      dateSubmitted: '2026-09-10',
      status: 'PENDING'
    }
  ])

  // Demo Vendor Approval Queue
  const [vendorApplications, setVendorApplications] = useState([
    {
      id: 101,
      businessName: 'Luxe Habesha Attire & Tailoring',
      ownerName: 'Sara Tewolde',
      email: 'contact@luxehabesha.et',
      licenseNum: 'ET-ADD-2026-881',
      status: 'PENDING'
    },
    {
      id: 102,
      businessName: 'Royal Graduation Suits & Accessories',
      ownerName: 'Yonas Gebre',
      email: 'info@royalsuits.et',
      licenseNum: 'ET-ADD-2026-302',
      status: 'APPROVED'
    }
  ])

  const handleApproveStudent = (id) => {
    setStudentVerifications(studentVerifications.map(s => s.id === id ? { ...s, status: 'VERIFIED' } : s))
  }

  const handleRejectStudent = (id) => {
    setStudentVerifications(studentVerifications.map(s => s.id === id ? { ...s, status: 'REJECTED' } : s))
  }

  const handleApproveVendor = (id) => {
    setVendorApplications(vendorApplications.map(v => v.id === id ? { ...v, status: 'APPROVED' } : v))
  }

  const handleRejectVendor = (id) => {
    setVendorApplications(vendorApplications.map(v => v.id === id ? { ...v, status: 'REJECTED' } : v))
  }

  const pendingStudentCount = studentVerifications.filter(s => s.status === 'PENDING').length
  const pendingVendorCount = vendorApplications.filter(v => v.status === 'PENDING').length

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-rose-950 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-300 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheckIcon className="w-4 h-4" />
            <span>Administrator Control Panel</span>
          </div>
          <h1 className="text-3xl font-headline font-bold">Platform Governance & Audit Hub</h1>
          <p className="text-sm text-rose-100">Verify student university credentials, approve vendor shop registrations, and audit system transactions.</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-semibold">Total Platform Users</span>
            <UserGroupIcon className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">1,450</p>
          <p className="text-[10px] text-slate-500 font-medium">Students & Vendors</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-semibold">Pending ID Audits</span>
            <DocumentCheckIcon className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{pendingStudentCount} Requests</p>
          <p className="text-[10px] text-amber-600 font-bold">Requires Admin review</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-semibold">Registered Boutiques</span>
            <BuildingStorefrontIcon className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">18 Stores</p>
          <p className="text-[10px] text-emerald-600 font-bold">{pendingVendorCount} Pending approval</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-semibold">Platform Commission</span>
            <span className="text-xs font-bold text-emerald-600">8.5%</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">$2,940.00</p>
          <p className="text-[10px] text-slate-500 font-medium">Earned this semester</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('STUDENT_VERIFICATION')}
          className={`px-5 py-3 text-xs font-bold rounded-t-xl transition-all border-b-2 ${activeTab === 'STUDENT_VERIFICATION' ? 'border-rose-600 text-rose-800 bg-rose-50/50' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          🪪 Student ID Approvals ({pendingStudentCount} Pending)
        </button>
        <button
          onClick={() => setActiveTab('VENDOR_APPROVALS')}
          className={`px-5 py-3 text-xs font-bold rounded-t-xl transition-all border-b-2 ${activeTab === 'VENDOR_APPROVALS' ? 'border-rose-600 text-rose-800 bg-rose-50/50' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          🏪 Vendor Boutique Approvals ({pendingVendorCount} Pending)
        </button>
        <button
          onClick={() => setActiveTab('AUDIT_LOGS')}
          className={`px-5 py-3 text-xs font-bold rounded-t-xl transition-all border-b-2 ${activeTab === 'AUDIT_LOGS' ? 'border-rose-600 text-rose-800 bg-rose-50/50' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          📜 System Activity Logs
        </button>
      </div>

      {/* Tab 1: Student Verification Queue */}
      {activeTab === 'STUDENT_VERIFICATION' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-headline font-bold text-primary">Student University ID Submissions</h2>
          <div className="divide-y divide-slate-100">
            {studentVerifications.map((st) => (
              <div key={st.id} className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{st.studentName}</span>
                    <span className="text-[10px] text-slate-500 font-mono">({st.email})</span>
                  </div>
                  <p className="text-xs text-secondary font-semibold">
                    {st.university} • ID: <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">{st.studentIdNum}</span>
                  </p>
                  <p className="text-[10px] text-slate-400">Submitted on: {st.dateSubmitted}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => alert(`Simulated document preview for ${st.studentName}'s Student ID card.`)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1"
                  >
                    <EyeIcon className="w-4 h-4" />
                    <span>View ID Card</span>
                  </button>

                  {st.status === 'PENDING' ? (
                    <>
                      <button
                        onClick={() => handleApproveStudent(st.id)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1"
                      >
                        <CheckCircleIcon className="w-4 h-4" />
                        <span>Approve ID (Grant 15% OFF)</span>
                      </button>
                      <button
                        onClick={() => handleRejectStudent(st.id)}
                        className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-all"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${st.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {st.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Vendor Boutique Approvals */}
      {activeTab === 'VENDOR_APPROVALS' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-headline font-bold text-primary">Vendor Registration Applications</h2>
          <div className="divide-y divide-slate-100">
            {vendorApplications.map((v) => (
              <div key={v.id} className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{v.businessName}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Owner: {v.ownerName} ({v.email})</p>
                  <p className="text-xs text-slate-500">Business License: <span className="font-mono">{v.licenseNum}</span></p>
                </div>

                <div className="flex items-center gap-2">
                  {v.status === 'PENDING' ? (
                    <>
                      <button
                        onClick={() => handleApproveVendor(v.id)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                      >
                        Approve Store
                      </button>
                      <button
                        onClick={() => handleRejectVendor(v.id)}
                        className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-all"
                      >
                        Decline
                      </button>
                    </>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${v.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {v.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: System Audit Logs */}
      {activeTab === 'AUDIT_LOGS' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-headline font-bold text-primary">System Audit & Transaction Logs</h2>
          <div className="space-y-3 font-mono text-xs text-slate-700">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
              <span>[2026-09-12 17:10] User Abebe Bikila submitted Student ID document RAM/1094/14.</span>
              <span className="text-purple-700 font-bold">INFO</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
              <span>[2026-09-12 16:45] Reservation RES-9012 created for Habesha Dress ($59.75).</span>
              <span className="text-emerald-700 font-bold">SUCCESS</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between">
              <span>[2026-09-12 14:20] Vendor Habesha Elegance added product #142 to catalog.</span>
              <span className="text-purple-700 font-bold">INFO</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
