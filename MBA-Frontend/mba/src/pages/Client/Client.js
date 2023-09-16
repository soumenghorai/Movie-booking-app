// Simple react component named client
import React, { useState, useEffect } from 'react'
import MaterialTable from '@material-table/core'
import { getAllTheatres } from '../../api/theatre'
import { getAllMovies } from '../../api/movie'
import ExportCsv from '@material-table/exporters/csv'
import ExportPdf from '@material-table/exporters/pdf'

const Client = () => {
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
        options={{
          filtering: true,
          sorting: true,
          exportMenu: [
            {
              label: 'Export as PDF',
              exportFunc: (cols, datas) => ExportPdf(cols, datas, 'Theatres'),
            },
            {
              label: 'Export as CSV',
              exportFunc: (cols, datas) => ExportCsv(cols, datas, 'Theatres'),
            },
          ],
          headerStyle: {
            backgroundColor: '#01579b',
            color: '#FFF',
          },
          rowStyle: {
            backgroundColor: '#EEE',
          },
        }}
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
        options={{
          filtering: true,
          sorting: true,
          exportMenu: [
            {
              label: 'Export as PDF',
              exportFunc: (cols, datas) => ExportPdf(cols, datas, 'Movies'),
            },
            {
              label: 'Export as CSV',
              exportFunc: (cols, datas) => ExportCsv(cols, datas, 'Movies'),
            },
          ],
          headerStyle: {
            backgroundColor: '#01579b',
            color: '#FFF',
          },
          rowStyle: {
            backgroundColor: '#EEE',
          },
        }}
      />
    </div>
  )
}

export default Client