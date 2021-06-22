import React, { useState } from 'react';
import { Table,TableHead,TableRow,TableCell,TablePagination,makeStyles } from '@material-ui/core';

const useStyles=makeStyles((theme)=>({
    table:{
        marginTop:theme.spacing(3),
        '& thead th':{
            fontWeight:'600',
            color:'#fff',
            backgroundColor:'#0f43ab',
            fontFamily:'Nunito',
            fontSize:'medium'
        },
        '$ tbody td':{
            fontWeight:'300'
        },
        '& tbody tr:hover':{
            backgroundColor:'#d0e4f7',
            cursor:'pointer'
        },
        '& .MuiTableCell-body':{
            fontFamily:'Nunito',
            fontWeight:'500',
            fontSize:'medium'
        }
}
}));

const useTable = (records,headCells) => {
    const classes=useStyles();

    const pages=[2,10,25];
    const [page,setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(pages[page]);
    const TblContainer=props=>(
        <Table className={classes.table}>
                 {props.children}
        </Table>
    )
    const TblHead=props=>{
        return(
            <TableHead>
                <TableRow>
                    {
                        headCells.map(headCell=>(
                            <TableCell key={headCell.id}>{headCell.label}</TableCell>
                        )
                            )
                    }
                </TableRow>
            </TableHead>
        )
    }

    const handleChangePage=(event,newPage)=>{
        setPage(newPage);
    }

    const handleChangeRowsPerPage=event=>{
        setRowsPerPage(parseInt(event.target.value,10));
        setPage(0);
    }

    const TblPagination=()=>(
        <TablePagination
           component="div"
           page={page}
           rowsPerPageOptions={pages}
           rowsPerPage={rowsPerPage}
           count={records.length}
           onChangePage={handleChangePage}
           onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    )
 
    const recordsAfterPagingAndSorting=()=>{
        return records.slice(page*rowsPerPage,(page+1)*rowsPerPage)
    }
    return{
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } 
       
    
};

export default useTable;