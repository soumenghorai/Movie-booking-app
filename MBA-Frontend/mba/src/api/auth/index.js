import { AxiosInstance } from '../../util/AxiosInstance'

export const signIn = async (user) => {
  const URL = '/MovieBooking/api/v1/signIn'
  try {
    const response = await AxiosInstance.post(URL, user)
    console.log(response.data)
    const { name, userType, userStatus, Token } = response.data
    localStorage.setItem('name', name)
    localStorage.setItem('userType', userType)
    localStorage.setItem('userStatus', userStatus)
    localStorage.setItem('token', Token)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const signUp = async (user) => {
  const URL = '/MovieBooking/api/v1/signUp'
  try {
    const response = await AxiosInstance.post(URL, user)
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const signOut = async () => {
  localStorage.removeItem('name')
  localStorage.removeItem('userType')
  localStorage.removeItem('userStatus')
  localStorage.removeItem('token')
}