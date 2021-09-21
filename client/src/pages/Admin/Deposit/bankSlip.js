import React, { useState, useEffect } from "react";
import { Grid, TableContainer, } from "@material-ui/core";
import useStyles from "./style2";
import { API_URL } from "../../../_constants";

const BankSlip = ({ selectOrderSlip }) => {
  const classes = useStyles();

  return (
    <div>
      <div>
        <container>
          <form>
            <Grid>
              <TableContainer>
                <img height={300} width={800} align="center" src={API_URL + '/' + selectOrderSlip.slip} alt=""></img>
              </TableContainer>
            </Grid>
          </form>
        </container>
      </div>
    </div>
  );
};

export default BankSlip;
