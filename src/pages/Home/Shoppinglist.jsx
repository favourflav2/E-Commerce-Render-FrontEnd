import React from "react";
import { Box, Typography, Tab, Tabs, } from "@mui/material";
import ItemCard from "../../components/Item Card/ItemCard";
import axios from 'axios'

export default function Shoppinglist() {
  
  
  const [value,setValue] = React.useState("all")
  const [loading,setLoading] = React.useState(false)

  function handleChange(e,newValue){
    setValue(newValue)
  }
 
  
  const [products, setProducts] = React.useState([])
  React.useEffect(()=>{

    async function getItems(){
      try{
        setLoading(true)
        const res = await axios.get(`https://ecommerce-app-4n5y.onrender.com/api/products?populate=*`,{
          headers:{
            Authorization: "bearer " + "096bb205d2f08bd9db9af8b34ebb190a31d2634927b4c340f52c38cc73049b74b54f3f1c83f3122b5d7f9a99923b22e220972ff2d571514f7add922db30570e2a4db81d82be96e7199a11d2fd38713e8c3a98e49f6e2535a6d69f04ea2170707156432460b1f2467f9a92f41334fed1321bc1b4e98168dbf57d344fd0301f164",
          },
        })
        setProducts(res.data.data)
        setLoading(false)
        //console.log(res.data.data)
      }catch(e){
        console.log(e)
      }
    }
   getItems()
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])



  if(loading){
    return (
      <Box className="flex justify-center mt-[20px]">
          Loading...
      </Box>
    )
  }

  const featuredValue = products?.filter(item =>{
    if(item?.attributes?.category === "featured"){
      return item
    }
    return null
  })

  const topRatedValue = products?.filter(item =>{
    if(item?.attributes?.category === "topRated"){
      return item
    }
    return null
  })
  const newArrivalValue = products?.filter(item =>{
    if(item?.attributes?.category === "newArrivals"){
      return item
    }
    return null
  })

 
  

  return (
    <Box className="w-[80%] flex flex-col ">
      {/* Heading */}
      <Box className="flex justify-center">
        <Typography variant="h1">Products</Typography>
      </Box>

      <Box className="mb-[15px]">
        <Tabs
        value={value}
        onChange={handleChange}
        textColor='primary' 
        indicatorColor='primary'
        centered
        >
            <Tab label="ALL" value="all" />
            <Tab label="FEATURED" value="featured" />
            <Tab label="TOP RATED" value="topRated" />
            <Tab label="NEW ARRIVALS" value="newArrivals" />
        </Tabs>
      </Box>

      <Box className=" flex flex-col md:grid md:grid-cols-2 md:gap-[30px] lg:grid-cols-3">
        {value === "featured" && featuredValue?.map((item,index)=>(
            <ItemCard key={index} item={item}/>
        ))}
        {value === "topRated" && topRatedValue?.map((item,index)=>(
            <ItemCard key={index} item={item}/>
        ))}
        {value === "all" && products?.map((item,index)=>(
           <ItemCard item={item} key={index}/>
        ))}
         {value === "newArrivals" && newArrivalValue?.map((item,index)=>(
           <ItemCard item={item} key={index}/>
        ))}
      </Box>
    </Box>
  );
}
