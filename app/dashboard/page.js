'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const { data, error } = await supabase.auth.getUser()

    const user = data?.user

    if (!user) {
      router.push('/login')
      return
    }

    setUser(user)
    await fetchTasks(user.id)
    setLoading(false)
  }

  const fetchTasks = async (userId) => {
    if (!userId) return

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error.message)
    } else {
      setTasks(data || [])
    }
  }

  const createTask = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    const { error } = await supabase
      .from('tasks')
      .insert([{ title, description, user_id: user.id }])

    if (error) {
      console.error('Supabase error:', error?.message || error)
    } else {
      setTitle('')
      setDescription('')
      fetchTasks(user.id)
    }
  }

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', id)

    if (error) {
      console.error('Supabase error:', error?.message || error)
    } else {
      fetchTasks(user.id)
    }
  }

  const deleteTask = async (id) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase error:', error?.message || error)
    } else {
      fetchTasks(user.id)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Create Task Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Create New Task</h2>
          <form onSubmit={createTask} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Add Task
            </button>
          </form>
        </div>

        {/* Tasks List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Your Tasks</h2>
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks yet. Create one above!</p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="border rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-gray-600 mt-1">{task.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-gray-700 font-medium">Status:</label>
                    <select
                      value={task.status}
                      onChange={(e) => updateStatus(task.id, e.target.value)}
                      className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Todo">Todo</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
