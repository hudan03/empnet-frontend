import { useEffect } from 'react'
import { useNavigate, NavLink, useLocation, Outlet } from 'react-router-dom'

import { useSendLogoutMutation } from '../Features/Auth/authApiSlice'
import './navstyles.css'


function AdminNavbar() {

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const backHome = () => {
    navigate('/')
  }

  // const [sendLogout, {
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error
  // }] = useSendLogoutMutation()

  // useEffect(() => {
  //     if (isSuccess) navigate('/')
  // }, [isSuccess, navigate])

  // if (isLoading) return <p>Logging Out...</p>

  // if (isError) return <p>Error: {error.data?.message}</p>

  return (
    <>
        <body>
            <div className='main-container d-flex'>
                <div className='sidebar' id='side_nav'>
                    <div className='header-box px-2 pt-3 pb-4'>
                        <img className='mx-3' style={{width: 200}} src='logo random.png' />

                        <ul className='list-unstyled px-2'>
                            <NavLink to='/admin' className={({isActive}) => isActive && pathname === '/admin' ? 'active' : null} id='links'>
                                <li><a className='text-decoration-none px-3 py-2 d-block fs-5'><i class='bi bi-speedometer2 me-3 fs-5' />Dashboard</a></li>
                            </NavLink>
                            <NavLink to='accounts' className={({isActive}) => isActive? 'active' : null} id='links'>
                                <li><a className='text-decoration-none px-3 py-2 d-block fs-5'><i class='bi bi-people me-3 fs-5' />Accounts</a></li>
                            </NavLink>
                            <NavLink to='work-order' className={({isActive}) => isActive? 'active' : null} id='links'>
                                <li><a className='text-decoration-none px-3 py-2 d-block fs-5'><i class='bi bi-clipboard-check-fill me-3 fs-5' />Work Orders</a></li>
                            </NavLink>
                        </ul>
                    </div>
                </div>

                <div className='content'>
                    <nav className='navbar bg-body-tertiary'>
                      <div className='container-fluid'>
                        <span className='navbar-brand my-2 ps-3 h1 fs-4'>Admin System</span>

                        <div className='btn-group'>
                          <button type='button' className='btn btn-primary'>Admin</button>
                          <button type='button' className='btn btn-primary dropdown-toggle dropdown-toggle-split' data-bs-toggle='dropdown' aria-expanded='false'>
                            <span className='visually-hidden'>Toggle Dropdown</span>
                          </button>
                          <ul className='dropdown-menu dropdown-menu-end'>
                            <li><a className='dropdown-item' onClick={backHome}>Logout</a></li>
                          </ul>
                        </div>
                      </div>
                    </nav>

                    <Outlet />
                </div>
            </div>
        </body>
    </>
  )
}

export default AdminNavbar