import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart,removeFromCart } from "../../redux/cartReducer";

export default function ItemCard({ item }) {
  const [hover, setHover] = React.useState(false);
  const {cart} = useSelector(state => state.cart)
  const [count,setCount] = React.useState(1)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const image = item?.attributes?.img?.data?.attributes?.url
  const findCartItem = cart?.find(cartItem => cartItem.id === item.id)
  
  

  return (
    <Box className="my-[15px] md:my-[1px]">
      <Box className="flex flex-col relative"
      onMouseOver={()=>setHover(true)}
      onMouseOut={()=>setHover(false)}
      >
        <img src={process.env.REACT_APP_UPLOAD_URL + image} alt="" className={hover?"opacity-70 h-[550px] object-cover ":"object-cover h-[550px]"} onClick={()=>navigate(`/product/${item.id}`)}/>
        <Typography className="mt-3 font-extrabold">{item?.attributes?.category.replace(/([A-Z])/g," $1")
              .replace(/^./,(str) => str.toUpperCase())}</Typography>
        <Typography className="text-[14px]">{item?.attributes?.title}</Typography>
        <Typography>${item?.attributes?.price}</Typography>



        <Box className={hover? "flex justify-between absolute w-full bottom-[15%] items-center":"hidden"}>
          {/* Add Minus */}
          {findCartItem?.id !== item.id && <Box className="flex items-center justify-between bg-white mx-2 mb-2 md:h-[30px]">
            <IconButton onClick={()=>{
              if(count > 0){
                setCount(prev => prev - 1)
              }
            }}>
              <RemoveIcon />
            </IconButton>

            <Typography className="mx-2">{count}</Typography>

            <IconButton onClick={()=>setCount(prev => prev + 1)}>
              <AddIcon className="text-2xl"/>
            </IconButton>
          </Box>}
          
          
            
          {findCartItem?.id === item.id ? (<Box onClick={()=>dispatch(removeFromCart(item))}>
            <Button variant="contained" className="bg-gray-400 hover:bg-red-600 mx-2 mb-2 md:h-[35px]">
              Remove From Cart
            </Button>
          </Box>) : (<Box onClick={()=>dispatch(addToCart({...item,count}))}>
            <Button variant="contained" className="bg-gray-400 mx-2 mb-2 md:h-[35px]">
              Add To Cart
            </Button>
          </Box>)}


          
        </Box>
      </Box>
    </Box>
  );
}


