import { useEffect, useState } from 'react'
import { User, deleteUser, getUsers } from '../api'
import { Link, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data)
    })
  }, [])

  const handleDelete = (id: string) => {
    try {
      deleteUser(id).then(({ message }) => {
        toast(message, {
          autoClose: 1500,
          type: 'success',
        })

        // Refetch data
        getUsers().then((data) => {
          setUsers(data)
        })
      })
    } catch (error) {
      let message = 'Error occured when deleting user'
      if (error instanceof AxiosError && error.response?.data?.message) {
        message = error.response.data.message
      }

      toast(message, {
        type: 'error',
      })
    }
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    navigate('/login')
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name and email.
          </p>
        </div>
        <div className="mt-4 flex gap-x-4 sm:ml-16 sm:mt-0">
          <Link
            to="/users/create"
            className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Add user
          </Link>
          <button
            onClick={logout}
            className="block rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      No
                    </th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((user, index) => (
                    <tr key={user.email}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:pl-6">{user.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.email}</td>
                      <td className="relative flex justify-end gap-x-4 whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                        <Link to={`/users/${user.id}/edit`} className="text-blue-600 hover:text-blue-900">
                          Edit<span className="sr-only">, {user.name}</span>
                        </Link>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure to delete user ${user.name}?`)) {
                              handleDelete(String(user.id))
                            }
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete<span className="sr-only">, {user.name}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
