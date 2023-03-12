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
        const res = await axios.get(`${process.env.REACT_APP_URL}/products?populate=*`,{
          headers:{
            Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
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
