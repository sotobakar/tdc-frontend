import React from 'react'
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'
import ErrorPage from './components/error-page'
import { getDefaultLayout } from './components/layout'
import UsersPage from './features/users/pages/users'
import CreateUserPage from './features/users/pages/create-user'
import EditUserPage from './features/users/pages/edit-user'
import LoginPage from './features/auth/pages/login'

export const routerObjects: RouteObject[] = [
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/users',
    Component: UsersPage,
  },
  {
    path: '/users/create',
    Component: CreateUserPage,
  },
  {
    path: '/users/:userId/edit',
    Component: EditUserPage,
  },
  {
    path: '/*',
    element: <Navigate to="/login" />,
  },
]

export function createRouter(): ReturnType<typeof createBrowserRouter> {
  const routeWrappers = routerObjects.map((router) => {
    // @ts-ignore TODO: better type support
    const getLayout = router.Component?.getLayout || getDefaultLayout
    const Component = router.Component!
    const page = getLayout(<Component />)
    return {
      ...router,
      element: router.element ?? page,
      Component: null,
      ErrorBoundary: ErrorPage,
    }
  })
  return createBrowserRouter(routeWrappers)
}
