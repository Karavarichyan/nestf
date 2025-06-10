
import type { FC, ReactNode } from "react"
import { useAuth } from "../api/hooks/useAuth"
import img from '../assets/download.png'

interface Props {
  children: ReactNode
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
  const isAuth = useAuth()
  return (
    <>
      {isAuth ? children : (
        <div className="flex flex-col justify-center items-center gap-10">
          <h1 className="text-2xl">To view this page you must be logged in.</h1>
          <img className="w-1/3" src={img} alt="img" />
        </div>
      )}
    </>
  )
}
