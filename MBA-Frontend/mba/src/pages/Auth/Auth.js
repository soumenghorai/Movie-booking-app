import React, { useEffect, useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { signIn, signUp } from '../../api/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [showSignUp, setShowSignUp] = useState(false)
  const [userSignUpData, setUserSignUpData] = useState({})
  const [userType, setUserType] = useState('CUSTOMER')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const toggleSignup = (e) => {
    e.preventDefault()
    setShowSignUp(!showSignUp)
    if (showSignUp) setUserSignUpData({})
  }

  useEffect(() => {
    setUserSignUpData({
      userId: document.getElementById('userId').value,
      password: document.getElementById('password').value,
    })
  }, [])

  const redirectUrl = () => {
    console.log(localStorage.getItem('userType'))
    if (localStorage.getItem('userType') === 'CUSTOMER') navigate('/')
    else if (localStorage.getItem('userType') === 'CLIENT') navigate('/client')
    else if (localStorage.getItem('userType') === 'ADMIN') navigate('/admin')
  }
  const updateSignUpData = (e) => {
    console.log(e.target.id, e.target.value)
    userSignUpData[e.target.id] = e.target.value
  }
  const handleSelect = (e) => {
    setUserType(e)
  }
  const signupFn = async (e) => {
    e.preventDefault()

    console.log(userSignUpData)
    const data = {
      name: userSignUpData.username,
      userId: userSignUpData.userId,
      email: userSignUpData.email,
      userType: userType,
      password: userSignUpData.password,
    }
    console.log(data)

    signUp(data)
      .then((response) => {
        console.log(response)
        toggleSignup(e)
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setMessage(error.response.data)
        } else {
          console.log(error)
        }
      })
  }
  const loginFn = async (e) => {
    e.preventDefault()
    const data = {
      userId: userSignUpData.userId,
      password: userSignUpData.password,
    }
    try {
      const response = await signIn(data)
      if (response.status === 200) {
        redirectUrl()
      } else throw new Error(response.data)
    } catch (error) {
      if (error.response && error.response.status === 401)
        setMessage(error.response.data)
      else console.log(error)
    }
  }
  return (
    <div id="loginPage">
      {/** Login Form */}
      <div
        id="loginContent"
        className="bg-primary d-flex justify-content-center align-items-center vh-100"
      >
        <div className="card m-5 p-5">
          <h4 className="text-center">{showSignUp ? 'Sign Up' : 'Login'}</h4>
          <form
            className="d-flex flex-column align-items-center"
            onSubmit={showSignUp ? signupFn : loginFn}
          >
            <input
              type="text"
              placeholder="User Id"
              id="userId"
              className="form-control my-2"
              onInput={updateSignUpData}
              autoFocus
              required
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="form-control my-2"
              onInput={updateSignUpData}
              autoFocus
              required
            />
            {showSignUp && (
              <div>
                <input
                  type="text"
                  className="form-control my-2"
                  placeholder="UserName"
                  id="username"
                  onInput={updateSignUpData}
                  required
                />
                <input
                  type="text"
                  className="form-control my-3"
                  placeholder="Email"
                  id="email"
                  onInput={updateSignUpData}
                  required
                />
                <div className="d-flex justify-content-between align-items-center row">
                  <div className="col">
                    <span>User Type</span>
                  </div>
                  <div className="col">
                    <DropdownButton
                      id="userType"
                      title={userType}
                      align="end"
                      variant="light"
                      onSelect={handleSelect}
                    >
                      <Dropdown.Item eventKey="CUSTOMER">
                        CUSTOMER
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="CLIENT">CLIENT</Dropdown.Item>
                    </DropdownButton>
                  </div>
                </div>
              </div>
            )}
            <input
              type="submit"
              value={showSignUp ? 'Sign Up' : 'Login'}
              className="btn btn-primary w-50 form-control"
            />
            <div
              className="text-primary signup-btn text-center"
              onClick={toggleSignup}
            >
              {showSignUp
                ? 'Already have an account? Login'
                : "Don't have an account? Signup"}
            </div>
            <div className="auth-error-msg text-danger text-center">
              {message}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login