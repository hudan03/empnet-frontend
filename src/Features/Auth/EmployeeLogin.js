import React from 'react'
import { NavLink } from 'react-router-dom'

function EmployeeLogin() {
    const content = (
        <div className='login-page'>
            <div className='login-container'>
                <div className='login-form-container'>
                    <h1> EMPnet System Login </h1>
                    {/* <p ref={errRef} className={errClass} aria-live='assertive'>{errMsg}</p> */}
                    <form action='' className='login-form'>
                        <div className='form-item'>
                            <label for='email'>Email</label>
                            <input className='form-elements'
                                type='email' placeholder='youremail@email.com' id='email' name='email' />
                        </div>

                        <div className='form-item'>
                            <label for='password'>Password</label>
                            <input className='form-elements'
                                type='password' placeholder='Your Password' id='password' name='password' />
                        </div>

                        <NavLink to='/employee'>
                            <button className='login-button' type='submit'>
                                Login
                            </button>
                        </NavLink>
                    </form>
                </div>
            </div>
        </div>
    )

    return content
}

export default EmployeeLogin