import { AxiosError } from 'axios'
import { clsx } from 'clsx'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { login } from '../api'
import useLocalStorageState from '../../../hooks/use-localstorage-state'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function LoginPage() {
  const [accessToken, setAccessToken] = useLocalStorageState('access_token', '')
  const navigate = useNavigate()

  useEffect(() => {
    if (accessToken) {
      navigate('/users')
    }
  }, [accessToken, navigate])

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{ password: '', email: '' }}
            validationSchema={Yup.object({
              password: Yup.string().required('The field is required.'),
              email: Yup.string().email('Invalid email address').required('The field is required.'),
            })}
            onSubmit={async (values) => {
              try {
                const { access_token } = await login(values)

                setAccessToken(access_token)
              } catch (error) {
                if (error instanceof AxiosError) {
                  alert(error.response?.data?.message ?? 'Error occured when logging in')
                } else {
                  alert('Error occured when logging in')
                }
              }
            }}
          >
            {(formik) => (
              <form onSubmit={formik.handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        type="email"
                        {...formik.getFieldProps('email')}
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

                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        type="password"
                        {...formik.getFieldProps('password')}
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

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}
