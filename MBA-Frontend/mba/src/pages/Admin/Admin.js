import React, { useEffect, useState } from 'react'
import { getAllTheatres } from '../../api/theatre'
import { getAllMovies } from '../../api/movie'
import MaterialTable from '@material-table/core'

// Pragya, I will write comments wherever possible.
const Admin = () => {
  const [theatreList, setTheatreList] = useState([])
  const [movieList, setMovieList] = useState([])

  const fetch = async () => {
    const response = await getAllTheatres()
    setTheatreList(response.data)
    const response2 = await getAllMovies()
    setMovieList(response2.data)
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <div>
      <MaterialTable
        data={theatreList}
        columns={[
          {
            title: 'Name',
            field: 'name',
          },
          {
            title: 'Description',
            field: 'description',
          },
          {
            title: 'City',
            field: 'city',
          },
        ]}
        title="Theatres"
      />
      <MaterialTable
        data={movieList}
        columns={[
          {
            title: 'Name',
            field: 'name',
          },
          {
            title: 'Description',
            field: 'description',
          },
          {
            title: 'Casts',
            field: 'casts',
          },
          {
            title: 'Director',
            field: 'director',
          },
        ]}
        title="Movies"
      />
    </div>
  )
}

export default Admin