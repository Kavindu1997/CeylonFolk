import React, { useState, useEffect } from "react";
// import { Grid } from '@material-ui/core';
import {
  Box,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { useForm, Form } from "../../../components/Reusable/useForm";
import Controls from "../../../components/Reusable/Controls";
import axios from "axios";
import { useHistory } from "react-router-dom";
import useStyles from "./style2";
import { useDispatch, useSelector } from "react-redux";
import {
  viewOrderDetail,
  cancelOrderItem,
} from "../../../_actions/orderHistory.action";
import Notification from "../../../components/Reusable/Notification";
import ConfirmDialog from "../../../components/Reusable/ConfirmDialog";
import { useParams } from "react-router";
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
                <img height={300} width={800} align="center" src={API_URL+ '/' + selectOrderSlip.slip} alt=""></img>
              </TableContainer>
            </Grid>
          </form>
        </container>
      </div>
    </div>
  );
};

export default BankSlip;
