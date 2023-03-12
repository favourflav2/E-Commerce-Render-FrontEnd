import React from 'react'
import { Box, Alert, AlertTitle } from "@mui/material";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/cartReducer';

export default function Success() {
    const dispatch = useDispatch()
    React.useEffect(()=>{
        dispatch(clearCart())
    },[dispatch])
  return (
    <Box m="90px auto" width="80%" height="50vh">
        <Alert severity='success'>
            <AlertTitle>Success</AlertTitle>
            You have successfully made an Order {"-"}
            <strong>Congrats</strong>
                <br />
            <strong className=' mt-3'>Back to <Link to="/">Home?</Link></strong>
        </Alert>
    </Box>
  )
}
