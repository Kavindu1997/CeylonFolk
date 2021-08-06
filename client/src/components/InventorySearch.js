// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import axios from "axios";

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Box, Container } from '@material-ui/core';
import Popup from "./Reusable/Popup";
import {
  makeStyles,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import { Grid, TextField } from '@material-ui/core';
import Controls from "./Reusable/Controls";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "50%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
  submit: {
    align: 'center',
    padding: '5px',
    marginTop: '20px',
  },
}));

function SearchInventory() {

  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [record, setRecord] = useState([]);


  // On Page load display all records 
  const loadInventoryDetail = async () => {
    var response = fetch('http://localhost:3001/inventSearch')
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setRecord(myJson);
      });
  }
  useEffect(() => {
    loadInventoryDetail();
  }, []);

  // Search Records here 
  const searchRecords = () => {
    axios.get(`http://localhost:3001/inventSearch/searchRecord/${search}`)
      .then(response => {
        setRecord(response.data);
      });

  }

  const loadRecordAgain = () => {
    var response = fetch('http://localhost:3001/inventSearch')
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setRecord(myJson);
      });

  }
  useEffect(() => {
    loadRecordAgain();
  }, []);


  return (
    <section>
      <div class="container">
        {/* <h4 className="mb-3 text-center mt-4">Search Records in MERN</h4> */}
        <div class="row mt-3">
          <div class="col-sm-11">
            <div class="input-group mb-4 mt-3">
              <div class="form-outline">
                <input type="text" id="form1" onKeyDown={loadRecordAgain} onKeyUp={searchRecords} onChange={(e) => setSearch(e.target.value)} class="form-control" placeholder="Search Employee Here" style={{ backgroundColor: "#ececec" }} />
              </div>
              {/* <button type="button" onClick={searchRecords}  class="btn btn-success">
            <i class="fa fa-search" aria-hidden="true"></i>
        </button> */}
            </div>

            <Container>
              <center>
                <Typography variant="h5" style={{ marginTop: '80px', textAlign: 'center', backgroundColor: '#C6C6C6', padding: '30px', fontFamily: 'Montserrat' }}>INVENTORY</Typography>
                <Table className={classes.table} aria-label="simple table">
                  <thead>
                    <tr>
                      <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Code</TableCell>
                      <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Colour</TableCell>
                      <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Size</TableCell>
                      <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Type</TableCell>
                      <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Quantity</TableCell>
                      <TableCell align="center" style={{ fontFamily: 'Montserrat', fontWeight: 600 }}>Margin</TableCell>
                    </tr>
                  </thead>
                  <tbody>

                    {record.map((value) =>
                      <tr>
                        <td align="center" style={{ fontFamily: 'Montserrat' }}>{value.code}</td>
                        <td align="center" style={{ fontFamily: 'Montserrat' }}>{value.colour}</td>
                        <td align="center" style={{ fontFamily: 'Montserrat' }}>{value.size}</td>
                        <td align="center" style={{ fontFamily: 'Montserrat' }}>{value.type}</td>
                        <td align="center" style={{ fontFamily: 'Montserrat' }}>{value.quantity}</td>
                        <td align="center" style={{ fontFamily: 'Montserrat' }}>{value.margin}</td>


                        {/* <td><img class="img-fluid" src={"/images/" + name.emp_image} style={{maxWidth:"40px"}}  alt=""/></td> */}

                      </tr>
                    )}
                  </tbody>
                </Table>
              </center>
            </Container>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchInventory;