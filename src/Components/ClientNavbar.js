import React from 'react'
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom'
import './navstyles.css'

function ClientNavbar() {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const backHome = () => {
      navigate('/')
    }

    return (
      <>
          <body>
              <div className='main-container d-flex'>
                  <div className='sidebar' id='side_nav'>
                      <div className='header-box px-2 pt-3 pb-4'>
                          <img className='mx-3' style={{width: 200}} src='logo random.png' />
  
                          <ul className='list-unstyled px-2'>
                              <NavLink to='/client' className={({isActive}) => isActive && pathname === '/client' ? 'active' : null} id='links'>
                                  <li><a className='text-decoration-none px-3 py-2 d-block fs-5'><i class='bi bi-speedometer2 me-3 fs-5' />Dashboard</a></li>
                              </NavLink>
                              <NavLink to='work-order' className={({isActive}) => isActive? 'active' : null} id='links'>
                                  <li><a className='text-decoration-none px-3 py-2 d-block fs-5'><i class='bi bi-list-task me-3 fs-5' />Work Orders</a></li>
                              </NavLink>
                              <NavLink to='wo-history' className={({isActive}) => isActive? 'active' : null} id='links'>
                                  <li><a className='text-decoration-none px-3 py-2 d-block fs-5'><i class='bi bi-clock-history me-3 fs-5' />WO History</a></li>
                              </NavLink>
                          </ul>
                      </div>
                  </div>
  
                  <div className='content'>
                      <nav className='navbar bg-body-tertiary'>
                        <div className='container-fluid'>
                          <span className='navbar-brand my-2 ps-3 h1 fs-4'>Client System</span>
  
                          <div className='btn-group'>
                            <button type='button' className='btn btn-primary'>Client</button>
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

export default ClientNavbar