import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactDataGrid from 'react-data-grid'
import { SketchPicker } from 'react-color'

import PageGuide from './PageGuide'

class ColorEditor extends Component {
  constructor (props) {
    super(props)
    this.state = { color: props.value }
  }

  getValue () {
    return { labelColour: this.state.color }
  }

  getInputNode () {
    return ReactDOM.findDOMNode(this).getElementsByTagName('input')[0]
  }

  handleChangeComplete = color => {
    this.setState({ color: color.hex }, () => this.props.onCommit())
  };

  render () {
    return (
      <SketchPicker
        color={this.state.color}
        onChange={this.handleChangeComplete}
      />
    )
  }
}

const columns = [
  { key: 'id', name: 'ID', editable: true },
  { key: 'title', name: 'Title', editable: true },
  { key: 'labelColour', name: 'Label Colour', editor: ColorEditor }
]

class GridComponent1 extends Component {
  constructor (props) {
    super(props)
    const rows = [
      { id: 0, title: 'Task 1', issueType: 'Bug', labelColour: '#1D1D1F' },
      { id: 1, title: 'Task 2', issueType: 'Story', labelColour: '#1D1D1F' },
      { id: 2, title: 'Task 3', issueType: 'Epic', labelColour: '#1D1D1F' }
    ]
    this.state = { rows }
  }

  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice()
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated }
      }
      return { rows }
    })
  };

  render () {
    return (
      <div>
        <ReactDataGrid
          columns={columns}
          rowGetter={i => this.state.rows[i]}
          rowsCount={this.state.rows.length}
          onGridRowsUpdated={this.handleGridRowsUpdated}
          minHeight={500}
          minWidth={800}
          enableCellSelect
        />
        <PageGuide />
      </div>
    )
  }
}

export default GridComponent1
