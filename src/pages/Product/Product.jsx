import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, IconButton, Tabs, Tab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrement, increment, removeFromCart } from "../../redux/cartReducer";

export default function Product() {
  const { id } = useParams();
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [count, setCount] = React.useState(1);
  const [value, setValue] = React.useState("desc");
  function handleChange(e, newValue) {
    setValue(newValue);
  }

  const { valueX } = useFetch(
    `${process.env.REACT_APP_URL}/products/${id}?populate=*`
  );
  console.log(valueX)
  const image = valueX?.attributes?.img?.data?.attributes?.url;
  const valueId = Number(id);
  const cartItem = cart?.find((item) => item.id === valueId);

  return (
    <Box className="flex justify-center mt-[40px]">
      <Box className="flex flex-col w-[80%]">
        <Box className="  flex md:flex-row flex-col">
          {/* Image */}
          <Box className="w-full md:mb-0 mb-10">
            <img
              src=""
              alt=""
              className=" w-full h-full"
            />
          </Box>

          {/* Content */}
          <Box className="w-full flex justify-center">
            <Box className=" w-[90%]  flex flex-col">
              {/* Heading */}
              <Typography className="text-2xl font-extrabold">
                {valueX?.attributes?.title}
              </Typography>
              <Typography className="mt-3">
                ${valueX?.attributes?.price}
              </Typography>
              <Typography className="mt-5 md:text-[15px]">
                {valueX?.attributes?.shortDesc}
              </Typography>

              {/* Add Minus */}
              <Box className="flex items-center my-8">
                <IconButton
                  onClick={() => {
                    if (cartItem) {
                      dispatch(decrement(cartItem));
                    } else {
                      if (count > 0) {
                        setCount((prev) => prev - 1);
                      }
                    }
                  }}
                >
                  <RemoveIcon className="text-2xl" />
                </IconButton>

                <Typography className=" mx-3 text-xl">
                  {cartItem ? (
                    <span>{cartItem?.count}</span>
                  ) : (
                    <span>{count}</span>
                  )}
                </Typography>

                <IconButton
                  onClick={() => {
                    if (cartItem) {
                      dispatch(increment(cartItem));
                    } else {
                      setCount((prev) => prev + 1);
                    }
                  }}
                >
                  <AddIcon className="text-2xl" />
                </IconButton>
              </Box>

              {/* Buttons */}
              <Box className="flex flex-col mt-4">
                {cartItem ? (
                  <Button
                    variant="contained"
                    className="bg-red-600 hover:bg-red-400 text-white w-[200px]"
                    onClick={()=>{
                      dispatch(removeFromCart(cartItem))
                      setCount(0)
                    }}
                  >
                    Remove From Cart
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    className="bg-black text-white w-[200px]"
                    onClick={()=>dispatch(addToCart({...valueX,count}))}
                  >
                    ADD TO CART
                  </Button>
                )}

                <Box className="flex items-center mt-4">
                  <IconButton className="mr-1">
                    <FavoriteBorderIcon />
                  </IconButton>

                  <Typography>ADD TO WISHLIST</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Tabs Section Desc */}
        <Box className="mb-[15px] mt-[40px]">
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            centered
          >
            <Tab label="DESCRIPTION" value="desc" />
            <Tab label="REVIEWS" value="reviews" />
          </Tabs>
        </Box>

        {/* Tabs Values */}
        <Box>
          {value === "desc" && (
            <Typography>{valueX?.attributes?.longDesc}</Typography>
          )}
          {value === "reviews" && <Typography>Reviews</Typography>}
        </Box>

        {/* Related Items */}
        <Box></Box>
      </Box>
    </Box>
  );
}
