import type { FC } from 'react'
import { FaBtc, FaSignOutAlt } from 'react-icons/fa'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../api/hooks/useAuth'
import { useAppDispatch } from '../store/hooks'
import { removeTokenFromLocalStorage } from '../helper/localstorage.helper'
import { toast } from 'react-toastify'
import { Logout } from '../store/user/userSlice'
const Header: FC = () => {
  const isAuth = useAuth()
  const dispatch =useAppDispatch()
  const navigate = useNavigate()
 const LogoutHendler = ()=>
 {
  dispatch(Logout())
  removeTokenFromLocalStorage('token')
  toast.success('You Logged out.')
  navigate('/')
 }
  return (
    <header className="bg-slate-800 text-white shadow-sm">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 lg:px-16 flex items-center h-16">
        <Link to="/">
          <FaBtc size={28} />
        </Link>

        <div className="ml-auto flex items-center gap-8">
          {isAuth ? (
            <>
              <nav>
                <ul className="flex items-center gap-6">
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive ? 'text-white' : 'text-white/50'
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/transactions"
                      className={({ isActive }) =>
                        isActive ? 'text-white' : 'text-white/50'
                      }
                    >
                      Transactions
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/categories"
                      className={({ isActive }) =>
                        isActive ? 'text-white' : 'text-white/50'
                      }
                    >
                      Categories
                    </NavLink>
                  </li>
                </ul>
              </nav>
              <button className="bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors flex items-center gap-2" onClick={LogoutHendler}>
                <span>Log Out</span>
                <FaSignOutAlt />
              </button>
            </>
          ) : (
            <Link className="py-2 text-white/50 hover:text-white ml-auto" to="/auth">
              Log In / Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
function logout(): any {
  throw new Error('Function not implemented.')
}
