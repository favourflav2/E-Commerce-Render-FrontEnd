import { Box, Button, IconButton, Modal, Typography,useMediaQuery } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, decrement, increment, removeFromCart, setIsCartOpen } from "../../redux/cartReducer";
import {loadStripe} from '@stripe/stripe-js';
import {makeRequest} from "../../request"

export default function CartMenu() {
  const {isCartOpen,cart} = useSelector(state => state.cart)
  //const image = item?.attributes?.img?.data?.attributes?.url
  //console.log(cart)
  const dispatch = useDispatch()
  const totalPrice = cart?.reduce((a,c)=>{
    return a + c?.count * c.attributes?.price
  },0)
  function itemTotalPrice(id){
    let result = cart?.filter(cartItem => cartItem.id === id)
    let answer = result?.reduce((a,c)=>{
      return a + c?.count * c?.attributes?.price
    },0)
    return answer
  }
  //console.log(cart)

  const stripePromise = loadStripe("pk_test_51MizPXFXP7tMGah8A5bMDg9vKg3IqScvLB301CHkkdCNlzgKbRS4Ilaj3qKYBCGx6tcvo4N9x6zUKeAQPV9vj2iI00bDAvoZQD");
  async function handleCheckout(){
    try{
      const stripe = await stripePromise

      const res = await makeRequest.post("/orders",{
        cart,
      })

       await stripe.redirectToCheckout({
        sessionId: res.data.id
       })
    }catch(e){
      console.log(e)
    }
  }

  const isNonMobile = useMediaQuery('(min-width:640px)')
 
  
  return (
    <div>
      <Modal open={isCartOpen} onClose={()=>dispatch(setIsCartOpen())} className=" overflow-scroll">
        {/* Container */}
        <Box className="bg-white absolute right-0 md:w-[45%] w-[65%] flex justify-center ">
          {/* Content */}
          <Box className="w-[90%] mt-[15px] flex flex-col">
            {/* Header */}
            <Box className="flex justify-between">
              <Typography className="lg:text-2xl md:text-xl text-base">
                SHOPPING BAG ({cart.length})
              </Typography>
              <IconButton onClick={()=>dispatch(setIsCartOpen())}>
              <CloseIcon className="text-[25px]" />
              </IconButton>
              
            </Box>

            {/* Item Container */}
            <Box className="mt-[25px]">
              {cart?.length === 0 && (
                <Typography className="text-base my-4">Cart Empty (0)</Typography>
              )}
              {cart?.map((item, index) => (
                <Box
                  className="grid grid-cols-[50%_minmax(0,_1fr)] my-7 border-b border-gray-400 h-auto sm:h-[275px] md:h-[300px] lg:min-h-[450px]"
                  key={index}
                >
                  <Box className={isNonMobile ? "w-[95%] h-[80%]" : "w-[160px] h-[105px]"}>
                    <img src={process.env.REACT_APP_UPLOAD_URL + item?.attributes?.img?.data?.attributes?.url} alt="" className=" object-contain h-full"/>
                  </Box>

                  <Box className={isNonMobile ? " flex flex-col justify-center h-[80%] " : " flex flex-col justify-center h-auto "}>
                      <Box className="flex justify-between items-center">
                        <Typography className="text-[14px] font-medium">{item?.attributes?.title}</Typography>
                        <IconButton onClick={()=>dispatch(removeFromCart(item))}>
                          <DeleteIcon className="text-xl text-black"/>
                        </IconButton>
                      </Box>
                      <Box className="flex items-center border w-[80px] lg:w-[120px] mb-2 justify-center">
                        <IconButton onClick={()=>dispatch(decrement(item))}>
                          <RemoveIcon className="text-xl text-black"/>
                        </IconButton>
                        <Typography className="text-[12px] md:text-[15px] mx-1">{item.count}</Typography>
                        <IconButton onClick={()=>dispatch(increment(item))}>
                          <AddIcon className="text-xl text-black"/>
                        </IconButton>
                      </Box>
                      <Box className='flex justify-between'>
                        <span>${item?.attributes?.price}</span>
                        <span> <span className=" font-semibold">Total:</span> ${itemTotalPrice(item?.id)}</span>
                      </Box>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* CHeckOut */}
            <Box className="flex flex-col">
                <Box className="flex justify-between mb-5">
                    <Typography className=" text-base  font-semibold">SUBTOTAL</Typography>
                    <Typography className=" text-base font-semibold">${totalPrice.toFixed(2)}</Typography>
                </Box>
                <Button variant="contained" className="bg-red-600 text-white hover:bg-gray-500 hover:text-white h-[50px] mb-[30px]" onClick={()=>dispatch(clearCart())}>CLEAR CART</Button>
                <Button variant="contained" className="bg-black text-white hover:bg-gray-500 hover:text-white h-[50px] mb-[30px]" onClick={()=>{
                  dispatch(setIsCartOpen())
                  handleCheckout()
                }}>CHECKOUT</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
