import React, { Component } from 'react'
import MaterialTable from 'material-table'

class DataTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: [
        { title: 'Name', field: 'name' },
        { title: 'Surname', field: 'surname', initialEditValue: 'initial edit value' },
        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
          title: 'Birth Place',
          field: 'birthCity',
          lookup: { 34: 'My city 1', 63: 'My city 2' }
        }
      ],
      data: [
        { name: 'my name', surname: 'XX', birthYear: 1987, birthCity: 63 },
        { name: 'any name', surname: 'YY', birthYear: 2017, birthCity: 34 }
      ]
    }
  }

  render () {
    return (
      <MaterialTable
        title='Data Table'
        options={{
          exportButton: true
        }}
        columns={this.state.columns}
        data={this.state.data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data
                  data.push(newData)
                  this.setState({ data }, () => resolve())
                }
                resolve()
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data
                  const index = data.indexOf(oldData)
                  data[index] = newData
                  this.setState({ data }, () => resolve())
                }
                resolve()
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data
                  const index = data.indexOf(oldData)
                  data.splice(index, 1)
                  this.setState({ data }, () => resolve())
                }
                resolve()
              }, 1000)
            })
        }}
      />
    )
  }
}

export default DataTable
