import React,{ useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { signIn, signUp } from '../../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [showSignUp,setShowsignUp] = useState(false)
  const [userSignUpData, setuserSignUpData] = useState({})
  const[userType, setUserType] = useState('CUSTOMER')
  const [message, setMessage] = useState('Welcome')
  const navigate = useNavigate()

}

export default Login;