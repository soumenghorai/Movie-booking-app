import { AxiosInstance } from '../../util/AxiosInstance'

export const getAllTheatres = async () => {
  const URL = '/MovieBooking/api/v1/theatres'

  try {
    const response = await AxiosInstance.get(URL, {
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

export const getTheatre = async (id) => {
  const URL = `/MovieBooking/api/v1/theatres/${id}`

  try {
    const response = await AxiosInstance.get(URL, {
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