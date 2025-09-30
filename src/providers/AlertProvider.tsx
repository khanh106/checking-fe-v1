"use client"

import { ReactNode } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function AlertProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <ToastContainer autoClose={5000} hideProgressBar style={{ top: 65 }} toastClassName="!pr-4" />
      {children}
    </>
  )
}
