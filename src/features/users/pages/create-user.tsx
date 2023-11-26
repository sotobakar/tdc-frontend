// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

import { Formik } from 'formik'
import * as Yup from 'yup'
import { createUser } from '../api'
import { AxiosError } from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import clsx from 'clsx'

export default function CreateUserPage() {
  return (
    <Formik
      initialValues={{ name: '', password: '', password_confirmation: '', email: '' }}
      validationSchema={Yup.object({
        name: Yup.string().max(50, 'Must be 50 characters or less').required('The field is required.'),
        password: Yup.string()
          .min(8, 'Must be 8 characters or more')
          .max(50, 'Must be 20 characters or less')
          .required('The field is required.'),
        password_confirmation: Yup.string()
          .min(8, 'Must be 8 characters or more')
          .max(50, 'Must be 20 characters or less')
          .required('The field is required.')
          .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
        email: Yup.string().email('Invalid email address').required('The field is required.'),
      })}
      onSubmit={async (values, { resetForm }) => {
        try {
          const { message } = await createUser(values)
          toast(message, {
            autoClose: 1500,
            type: 'success',
          })
          resetForm()
        } catch (error) {
          let message = 'Error occured when creating user'
          if (error instanceof AxiosError && error.response?.data?.message) {
            message = error.response.data.message
          }

          toast(message, {
            type: 'error',
          })
        }
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Create User</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="name"
                      {...formik.getFieldProps('name')}
                      className={clsx(
                        'block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
                        formik.errors.name
                          ? 'text-red-900 ring-red-300 placeholder:text-red-400 focus:ring-red-500'
                          : 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-blue-600',
                      )}
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <p className="mt-2 text-sm text-red-600">{formik.errors.name}</p>
                    ) : null}
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      {...formik.getFieldProps('email')}
                      id="email"
                      className={clsx(
                        'block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
                        formik.errors.email
                          ? 'text-red-900 ring-red-300 placeholder:text-red-400 focus:ring-red-500'
                          : 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-blue-600',
                      )}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
                    ) : null}
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      {...formik.getFieldProps('password')}
                      id="password"
                      className={clsx(
                        'block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
                        formik.errors.password
                          ? 'text-red-900 ring-red-300 placeholder:text-red-400 focus:ring-red-500'
                          : 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-blue-600',
                      )}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <p className="mt-2 text-sm text-red-600">{formik.errors.password}</p>
                    ) : null}
                  </div>
                </div>
                <div className="sm:col-span-6">
                  <label htmlFor="password_confirmation" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      {...formik.getFieldProps('password_confirmation')}
                      id="password_confirmation"
                      className={clsx(
                        'block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6',
                        formik.errors.password_confirmation
                          ? 'text-red-900 ring-red-300 placeholder:text-red-400 focus:ring-red-500'
                          : 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-blue-600',
                      )}
                    />
                    {formik.touched.password_confirmation && formik.errors.password_confirmation ? (
                      <p className="mt-2 text-sm text-red-600">{formik.errors.password_confirmation}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link to="/users" className="text-sm font-semibold leading-6 text-gray-900">
              Back
            </Link>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </Formik>
  )
}
