import React, { Component } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-blue.css'

const gridOptions = {
  defaultColDef: {
    editable: true,
    sortable: true,
    resizable: true,
    filter: true
  },
  suppressRowClickSelection: true,
  groupSelectsChildren: true,
  debug: true,
  rowSelection: 'multiple',
  rowGroupPanelShow: 'always',
  pivotPanelShow: 'always',
  enableRangeSelection: true,
  paginationAutoPageSize: true,
  pagination: true
}

class GridComponent2 extends Component {
    handleButtonClick = e => {
      const selectedNodes = this.gridApi.getSelectedNodes()
      const selectedData = selectedNodes.map(node => node.data)
      const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ')
      alert(`Selected nodes: ${selectedDataStringPresentation}`)
    }

    constructor (props) {
      super(props)
      this.state = {
        columnDefs: [{
          headerName: 'Make', field: 'make', sortable: true, filter: true, checkboxSelection: true
        }, {
          headerName: 'Model', field: 'model', sortable: true, filter: true
        }, {
          headerName: 'Price', field: 'price', sortable: true, filter: true
        }]
      // rowData: [{
      //   make: 'Toyota', model: 'Celica', price: 35000
      // }, {
      //   make: 'Ford', model: 'Mondeo', price: 32000
      // }, {
      //   make: 'Porsche', model: 'Boxter', price: 72000
      // }]
      }
    }

    componentDidMount () {
      fetch('https://api.myjson.com/bins/15psn9')
        .then(result => result.json())
        .then(rowData => this.setState({ rowData }))
    }

    render () {
      return (
        <div
          className='ag-theme-blue'
          style={{
            height: '800px',
            width: '800px'
          }}
        >
          <button onClick={this.handleButtonClick}>Get selected rows</button>
          <AgGridReact
            onGridReady={params => { this.gridApi = params.api }}
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            {...gridOptions}
          />
        </div>
      )
    }
}

export default GridComponent2
