'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Subscriber {
  id: string
  fullName: string
  email: string
  hasConsented: boolean
  createdAt: string
}

export default function MovementSubscribersAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'name'>('date-desc')

  // Simple admin password (in production, use environment variable + proper auth)
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'black2025'

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setError('')
      fetchSubscribers()
    } else {
      setError('Invalid password')
      setPassword('')
    }
  }

  const fetchSubscribers = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/subscribers')
      if (response.ok) {
        const data = await response.json()
        setSubscribers(data.subscribers || [])
      } else {
        setError('Failed to load subscribers')
      }
    } catch (err) {
      setError('Error loading data')
    } finally {
      setLoading(false)
    }
  }

  const sortedSubscribers = [...subscribers].sort((a, b) => {
    if (sortBy === 'date-desc') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else if (sortBy === 'date-asc') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    } else {
      return a.fullName.localeCompare(b.fullName)
    }
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-wide mb-2">
              BLACK Admin
            </h1>
            <p className="text-off-white text-sm">Movement Subscribers Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="bg-white/5 border-2 border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Admin Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black border-2 border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-soft-pink transition-colors"
                placeholder="Enter admin password"
                required
              />
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-soft-pink text-black px-6 py-3.5 rounded-full font-bold uppercase tracking-wide hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              Access Dashboard
            </button>

            <div className="text-center">
              <Link
                href="/"
                className="text-off-white hover:text-white text-sm underline"
              >
                ← Back to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold uppercase tracking-wide mb-2">
              Movement Subscribers
            </h1>
            <p className="text-off-white text-sm sm:text-base">
              Total subscribers: <span className="text-soft-pink font-bold">{subscribers.length}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Controls */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 bg-white/5 border-2 border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-soft-pink transition-colors"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="name">Name A-Z</option>
            </select>

            {/* Refresh Button */}
            <button
              onClick={fetchSubscribers}
              disabled={loading}
              className="px-4 py-2 bg-white/5 border-2 border-white/10 rounded-lg text-white text-sm hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>

            {/* Logout */}
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 bg-red-500/20 border-2 border-red-500/30 rounded-lg text-red-300 text-sm hover:bg-red-500/30 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {loading && subscribers.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-soft-pink mb-4"></div>
            <p className="text-off-white">Loading subscribers...</p>
          </div>
        ) : subscribers.length === 0 ? (
          <div className="text-center py-16">
            <svg
              className="w-20 h-20 mx-auto mb-6 text-white/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h2 className="text-2xl font-display font-bold uppercase tracking-wide mb-4">
              No Subscribers Yet
            </h2>
            <p className="text-off-white text-base">
              Subscribers will appear here when they join the movement.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-white/20">
                    <th className="text-left py-4 px-4 text-sm uppercase tracking-wide text-off-white font-semibold">
                      Full Name
                    </th>
                    <th className="text-left py-4 px-4 text-sm uppercase tracking-wide text-off-white font-semibold">
                      Email
                    </th>
                    <th className="text-left py-4 px-4 text-sm uppercase tracking-wide text-off-white font-semibold">
                      Consented
                    </th>
                    <th className="text-left py-4 px-4 text-sm uppercase tracking-wide text-off-white font-semibold">
                      Joined Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedSubscribers.map((subscriber, index) => (
                    <tr
                      key={subscriber.id}
                      className={`border-b border-white/10 hover:bg-white/5 transition-colors ${
                        index % 2 === 0 ? 'bg-white/[0.02]' : ''
                      }`}
                    >
                      <td className="py-4 px-4 text-white font-medium">
                        {subscriber.fullName}
                      </td>
                      <td className="py-4 px-4 text-off-white">
                        {subscriber.email}
                      </td>
                      <td className="py-4 px-4">
                        {subscriber.hasConsented ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-300 border border-green-500/30">
                            Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30">
                            No
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-off-white text-sm">
                        {formatDate(subscriber.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {sortedSubscribers.map((subscriber) => (
                <div
                  key={subscriber.id}
                  className="bg-white/5 border-2 border-white/10 rounded-2xl p-5 space-y-3"
                >
                  <div>
                    <p className="text-xs uppercase tracking-wide text-off-white/60 mb-1">
                      Full Name
                    </p>
                    <p className="text-white font-semibold">{subscriber.fullName}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-off-white/60 mb-1">
                      Email
                    </p>
                    <p className="text-off-white break-all">{subscriber.email}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-off-white/60 mb-1">
                        Consented
                      </p>
                      {subscriber.hasConsented ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-300 border border-green-500/30">
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-300 border border-red-500/30">
                          No
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-wide text-off-white/60 mb-1">
                        Joined
                      </p>
                      <p className="text-off-white text-sm">{formatDate(subscriber.createdAt)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Back Link */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="text-off-white hover:text-white text-sm underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

