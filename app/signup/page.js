'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import Link from 'next/link'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSignup = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage('Signup successful! Check your email to confirm.')
      setEmail('')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Sign Up
        </h1>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Sign Up
          </button>
        </form>

        {message && (
          <p className="mt-4 text-green-600 text-center">{message}</p>
        )}
        {error && (
          <p className="mt-4 text-red-600 text-center">{error}</p>
        )}

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
