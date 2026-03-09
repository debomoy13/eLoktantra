import React from 'react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Citizen Dashboard</h1>
        <p className="text-gray-600">Welcome to eLoktantra. Track election transparency and civic issues in real-time.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Candidate Tracking Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">My Candidates</h2>
          <p className="text-gray-600 mb-4">Follow candidate profiles and criminal record transparency.</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            View Profiles
          </button>
        </div>

        {/* Issue Reporting Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Report Issue</h2>
          <p className="text-gray-600 mb-4">Report civic problems in your constituency for tracking.</p>
          <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition">
            Report Now
          </button>
        </div>

        {/* Promise Tracker Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Promise Tracker</h2>
          <p className="text-gray-600 mb-4">Check status and progress of manifestos and election promises.</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            Check Status
          </button>
        </div>
      </div>
    </div>
  );
}
