import { AxiosInstance } from '../../util/AxiosInstance'

export const createBooking = async (booking) => {
  const URL = '/MovieBooking/api/v1/bookings'

  try {
    const response = await AxiosInstance.post(URL, booking, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })
    return response
  } catch (error) {
    console.log(error)
    throw error
  }
}