import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-8">
        <h1 className="text-5xl font-bold text-gray-800">
          Team Task Manager
        </h1>
        <div className="flex gap-4 justify-center">
          <Link href="/login">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
