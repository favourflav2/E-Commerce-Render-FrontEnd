import { Box } from "@mui/material";
import React from "react";
import Slider from "../../components/Slider/Slider";
import Shoppinglist from "./Shoppinglist";

export default function Home() {
  return (
    <div className="bg-gray-50">
      <Slider />
      <Box className="flex justify-center my-[40px]">
        <Shoppinglist />
      </Box>
    </div>
  );
}
