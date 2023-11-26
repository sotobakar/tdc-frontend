import React from 'react'
import { ToastContainer } from 'react-toastify'

export const getNoneLayout = (page: React.ReactElement) => page

export const getDefaultLayout = (page: React.ReactElement) => {
  return (
    <div className="h-min-screen p-10">
      {page}
      <ToastContainer></ToastContainer>
    </div>
  )
}
