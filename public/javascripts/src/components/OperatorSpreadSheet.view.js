/**
 * OperatorSpreadSheet.view.js
 * [VIEW]
 */

import React, { Component } from 'react';
import ReactDOM from "react-dom"
import ReactDataGrid from 'react-data-grid';
import ReactDataGridPlugins from 'react-data-grid/addons';
import * as faker from "faker";

//helper to create a fixed number of rows
function createRows(numberOfRows){
  var _rows = [];
  for (var i = 1; i < numberOfRows; i++) {
    _rows.push({
      id: i,
      member: faker.name.findName(),
      handphone: Math.min(100, Math.round(Math.random() * 110)),
      bca: Math.min(100, Math.round(Math.random() * 110)),
      bcaName: faker.name.findName(),
      ym: faker.internet.userName(),
      email: faker.internet.email()
    });
  }
  return _rows;
}

//function to retrieve a row for a given index
var rowGetter = function(i){
  return _rows[i];
};

//Columns definition
var columns = [
  {
    key: 'id',
    name: 'ID',
    width: 80
  },
  {
    key: 'member',
    name: 'Member',
    editable : true
  },
  {
    key: 'handphone',
    name: 'Handphone',
    editable : true
  },
  {
    key: 'bca',
    name: 'BCA',
    editable : true
  },
  {
    key: 'bcaName',
    name: "Nama Rek BCA",
    editable : true
  },
  {
    key: 'ym',
    name: 'YM',
    editable : true
  },
  {
    key: 'email',
    name: 'Email',
    editable : true
  }
]

export default class OperatorSpreadSheet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rows: createRows(1000)
    }
  }

  rowGetter(rowIdx) {
    return this.state.rows[rowIdx]
  }

  handleRowUpdated(e) {
    //merge updated row with current row and rerender by setting state
    var rows = this.state.rows;
    Object.assign(rows[e.rowIdx], e.updated);
    this.setState({rows:rows});
  }

  render() {
    return  <ReactDataGrid
              enableCellSelect={true}
              columns={columns}
              rowGetter={this.rowGetter.bind(this)}
              rowsCount={this.state.rows.length}
              minHeight={500}
              onRowUpdated={this.handleRowUpdated.bind(this)} />
  }
}
