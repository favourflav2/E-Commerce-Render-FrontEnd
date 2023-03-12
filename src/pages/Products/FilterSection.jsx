import React from "react";
import {
  Box,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Modal,
  IconButton,
  Button,
  useMediaQuery,
  FormControl,
  RadioGroup,
  Radio,
} from "@mui/material";
import ItemCard from "../../components/Item Card/ItemCard";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import useFetch from "../../hooks/useFetch";

export default function FilterSection() {
  const [checked, setChecked] = React.useState({
    women: false,
    men: false,
  });
  const [radio,setRadio] = React.useState('desc')

  const [value, setValue] = React.useState(50);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  

  
  const {
    valueX: menData,
    loading: menLoading,
    //error: menError,
  } = useFetch(`/products?populate=*&filters[categories][id]=1&filters[price][$lte]=${value}&sort=price:${radio}`);
  const {
    valueX: womanData,
    loading: womenLoading,
    //error: womenError,
  } = useFetch(`/products?populate=*&filters[categories][id]=2&filters[price][$lte]=${value}&sort=price:${radio}`);
 
  
// item?.attributes?.price
  

 
  function handleRadio(e){
    setRadio(e.target.value)
  }
  function handleChange(e) {
    setChecked((item) => {
      return {
        ...item,
        [e.target.name]: e.target.checked,
      };
    });
  }
  function handleSlider(e, newValue) {
    setValue(newValue);
    
  }
  

  React.useEffect(() => {
    if (isNonMobile) {
      handleClose();
    }
  }, [isNonMobile]);

  return (
    <Box className="w-screen h-full flex  mt-[40px]">
      {/* Left Side Content */}
      <Box className="ml-4  w-[40%] hidden sm:block">
        <Box className="flex flex-col ">
          <Typography className="text-xl mb-[10px] font-extrabold">
            Product Categories
          </Typography>

          {/* CheckBoxes */}
          <Box>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked.women}
                    onChange={handleChange}
                    name="women"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                  />
                }
                label="Women"
                sx={{ "& .MuiFormControlLabel-label": { fontSize: 12 } }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked.men}
                    onChange={handleChange}
                    name="men"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                  />
                }
                label="Men"
                sx={{ "& .MuiFormControlLabel-label": { fontSize: 12 } }}
              />
            </FormGroup>
          </Box>

          {/* SLider */}
          <Box className="mt-[35px] max-w-[50%]">
            <Typography className="text-xl mb-[10px] font-extrabold">
              Filter by Price
            </Typography>

            <Slider
              aria-label="Temperature"
              defaultValue={50}
              value={value}
              onChange={handleSlider}
              //getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              sx={{
                "& .MuiSlider-thumb": {
                  color: "gray",
                },
                "& .MuiSlider-track": {
                  color: "gray",
                },
                "& .MuiSlider-rail": {
                  color: "gray",
                },
                "& .MuiSlider-active": {
                  color: "gray",
                },
              }}
              step={10}
              marks
              min={0}
              max={110}
            />
          </Box>

          {/* Sort By */}
          <Box className="mt-[35px]">
            <Typography className="text-xl mb-[10px] font-extrabold">
              Sort By
            </Typography>
            <FormControl>
              <RadioGroup
              value={radio}
              onChange={handleRadio}
              >
                <FormControlLabel value="asc" label="Price (Lowest first)" control={<Radio />} />
                <FormControlLabel value="desc" label="Price (Highest first)" control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      </Box>

      {/* Mobile Menu */}

      <Box className="sm:hidden block w-[40%] ml-4">
        <IconButton onClick={handleOpen}>
          <TuneIcon />
        </IconButton>
        <p>Filter</p>

        <Modal open={open} onClose={handleClose}>
          <Box className="w-[60%] h-[100%] bg-gray-300 absolute">
            <Box className="flex flex-col p-4">
              <IconButton
                className=" absolute right-0 text-red-500"
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
              <Typography className="text-xl mb-[10px] mt-[30px] font-extrabold">
                Product Categories
              </Typography>

              {/* CheckBoxes */}
              <Box>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked.women}
                        onChange={handleChange}
                        name="women"
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                      />
                    }
                    label="Women"
                    sx={{ "& .MuiFormControlLabel-label": { fontSize: 12 } }}
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked.men}
                        onChange={handleChange}
                        name="men"
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                      />
                    }
                    label="Men"
                    sx={{ "& .MuiFormControlLabel-label": { fontSize: 12 } }}
                  />
                </FormGroup>
              </Box>

              {/* SLider */}
              <Box className="mt-[35px] max-w-[80%]">
                <Typography className="text-xl mb-[10px] font-extrabold">
                  Filter by Price
                </Typography>

                <Slider
                  aria-label="Temperature"
                  defaultValue={50}
                  value={value}
                  onChange={handleSlider}
                  //getAriaValueText={valuetext}
                  valueLabelDisplay="auto"
                  sx={{
                    "& .MuiSlider-thumb": {
                      color: "gray",
                    },
                    "& .MuiSlider-track": {
                      color: "gray",
                    },
                    "& .MuiSlider-rail": {
                      color: "gray",
                    },
                    "& .MuiSlider-active": {
                      color: "gray",
                    },
                  }}
                  step={10}
                  marks
                  min={0}
                  max={110}
                />
              </Box>

              {/* Sort By */}
              <Box className="mt-[35px]">
                <Typography className="text-xl mb-[10px] font-extrabold">
                  Sort By
                </Typography>

                <FormControl>
              <RadioGroup
              value={radio}
              onChange={handleRadio}
              >
                <FormControlLabel value="asc" label="Price (Lowest first)" control={<Radio />} />
                <FormControlLabel value="desc" label="Price (Highest first)" control={<Radio />} />
              </RadioGroup>
            </FormControl>
              </Box>

              <Button
                variant="contained"
                className="mt-[15px] bg-gray-100 text-black "
                onClick={handleClose}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>

      {/* Right Side Content */}
      <Box className="w-full  flex flex-col  mr-10">
        {/* Top Image */}
        <img
          src="https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"
          alt="Background Img"
          className="h-[300px] w-full object-cover mb-[32px]"
        />

        {/* {menLoading && (
          <Box className="flex justify-center mt-[20px]">Loading...</Box>
        )}
         {womenLoading && (
          <Box className="flex justify-center mt-[20px]">Loading...</Box>
        )} */}
        {menLoading === true || womenLoading === true ? (<Box className="flex justify-center mt-[20px]">Loading...</Box>):""}

        {checked.men && (
          <Box className="flex justify-center ">
            <Typography className="text-2xl mt-[35px] mb-5 border-b-2 border-black">
              Men
            </Typography>
          </Box>
        )}
        {/* Grid Cards */}
        <Box className={checked.men ? "border-b-2" : ""}>
          <Box className=" flex flex-col md:grid md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 mb-[25px]">
            {checked.men &&
              menData.map((item, index) => (
                <ItemCard item={item} key={index} />
              ))}
          </Box>
        </Box>

        {checked.women && (
          <Box className="flex justify-center ">
            <Typography className="text-2xl mt-[35px] mb-5 border-b-2 border-black">
              Women
            </Typography>
          </Box>
        )}
        {/* Grid Cards */}
        <Box className=" flex flex-col md:grid md:grid-cols-2 md:gap-[30px] lg:grid-cols-3">
          {checked.women &&
            womanData.map((item, index) => (
              <ItemCard item={item} key={index} />
            ))}
        </Box>
      </Box>
    </Box>
  );
}
