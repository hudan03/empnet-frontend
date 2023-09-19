import React from 'react'
import { NavLink } from 'react-router-dom'

function Menu() {
  return (
    <div className='login-page'>
            <div className='login-container'>
                <div className='login-form-container'>
                    <h1> EMPnet System Login </h1>
                    <form action='' className='login-form'>
                        <NavLink to='/admin'>
                            <button className='login-button' type='submit'>
                                Admin
                            </button>
                        </NavLink>
                        <NavLink to='/manager'>
                            <button className='login-button' type='submit'>
                                Manager
                            </button>
                        </NavLink>
                        <NavLink to='/employee'>
                            <button className='login-button' type='submit'>
                                Employee
                            </button>
                        </NavLink>
                        <NavLink to='/client'>
                            <button className='login-button' type='submit'>
                                Client
                            </button>
                        </NavLink>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default Menu