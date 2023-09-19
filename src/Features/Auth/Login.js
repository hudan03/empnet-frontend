import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link, NavLink } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'


const Login = () => {
//   const userRef = useRef()
//   const errRef = useRef()
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [errMsg, setErrMsg] = useState('')

//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const [login, { isLoading }] = useLoginMutation()

//   useEffect(() => {
//       userRef.current.focus()
//   }, [])

//   useEffect(() => {
//       setErrMsg('');
//   }, [email, password])


//   const handleSubmit = async (e) => {
//       e.preventDefault()
//       try {
//           const { accessToken } = await login({ email, password }).unwrap()
//           dispatch(setCredentials({ accessToken }))
//           setEmail('')
//           setPassword('')
//           navigate('/admin')
//       } catch (err) {
//           if (!err.status) {
//               setErrMsg('No Server Response');
//           } else if (err.status === 400) {
//               setErrMsg('Missing Email or Password');
//           } else if (err.status === 401) {
//               setErrMsg('Unauthorized');
//           } else {
//               setErrMsg(err.data?.message);
//           }
//           errRef.current.focus();
//       }
//   }

//   const handleEmailInput = (e) => setEmail(e.target.value)
//   const handlePwdInput = (e) => setPassword(e.target.value)

//   const errClass = errMsg ? 'errmsg' : 'offscreen'

//   if (isLoading) return <p>Loading...</p>

    // Login Form and Styling

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

                        <NavLink to='/admin'>
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

export default Login