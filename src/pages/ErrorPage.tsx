import type { FC } from "react"
import { Link } from "react-router-dom"
import img from '../assets/ErrorIcons.png'

const ErrorPage: FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex justify-center items-center flex-col gap-10">
      <img src={img} alt="Error" className="w-64 h-auto" />
      <Link to="/" className="bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600">
        Back
      </Link>
    </div>
  )
}

export default ErrorPage
