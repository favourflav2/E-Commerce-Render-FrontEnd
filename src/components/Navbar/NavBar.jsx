import React from "react";
import {
  Box,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { Link } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CategoryIcon from '@mui/icons-material/Category';
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../redux/cartReducer";

export default function NavBar() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  return (
    <Box className=" w-screen bg-gray-100 h-[60px] flex justify-between items-center">
      {/* Content */}

      {/* left side */}
      <Box className="flex ml-2 items-center">
        <Typography className=" font-extrabold mr-2 text-[15px] md:text-[20px]">
          E-Commerce App
        </Typography>
      </Box>

      {/* right side */}
      <Box className="hidden md:flex mr-2 items-center">
        <Box className="mx-2 hover:text-blue-400 cursor-pointer">
          <Link to="/">Homepage</Link>
        </Box>

        <Box className="mx-2 hover:text-blue-400 cursor-pointer">
          <Link to="/products/:id">Categories</Link>
        </Box>

        <Box className="mx-2 hover:text-blue-400 cursor-pointer">
          <Link to="/">Contact</Link>
        </Box>

        <IconButton className="mx-2 cursor-pointer">
          <SearchIcon className=" text-xl " />
        </IconButton>

        <IconButton className="mx-2 cursor-pointer">
          <PersonOutlineIcon className=" text-xl " />
        </IconButton>

        <IconButton className="mx-2 cursor-pointer">
          <FavoriteBorderIcon className=" text-xl " />
        </IconButton>

        <Badge
          badgeContent={cart?.length}
          color="secondary"
          className="mr-4"
          sx={{
            "& .MuiBadge-badge": {
              right: 4,
              top: 5,
              padding: "0 4px",
              height: "13px",
              minWidth: "13px",
            },
          }}
        >
          <IconButton onClick={() => dispatch(setIsCartOpen())}>
            <ShoppingBagIcon className=" text-xl " />
          </IconButton>
        </Badge>
      </Box>

      {/* Moble Menu */}
      <Box className="md:hidden">
        <React.Fragment>
          <IconButton
            className=" cursor-pointer  mr-3"
            onClick={() => setOpenDrawer((item) => !item)}
          >
            <MenuIcon className=" text-2xl" />
          </IconButton>
          <Drawer
            anchor="top"
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            //onOpen={() => setOpenDrawer(true)}
          >
            <List>
              {/* List Item */}
              <ListItem
                onClick={() => setOpenDrawer((item) => !item)}
                component={Link}
                to="/"
              >
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon className="text-2xl" />
                  </ListItemIcon>
                  <ListItemText primary="Homepage" />
                </ListItemButton>
              </ListItem>

              {/* List Item */}
              <ListItem
                onClick={() => setOpenDrawer((item) => !item)}
                component={Link}
                to="/products/:id"
              >
                <ListItemButton>
                  <ListItemIcon>
                    <CategoryIcon className="text-2xl" />
                  </ListItemIcon>
                  <ListItemText primary="Categories" />
                </ListItemButton>
              </ListItem>

              {/* List Item */}
              <ListItem
                onClick={() => {
                  setOpenDrawer((item) => !item);
                  dispatch(setIsCartOpen());
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <Badge badgeContent={cart?.length} color="primary">
                      <ShoppingBagIcon />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText primary="Cart" />
                </ListItemButton>
              </ListItem>

              {/* List Item */}
              <ListItem onClick={() => setOpenDrawer((item) => !item)} to="/">
                <ListItemButton>
                  <ListItemIcon>
                    <FavoriteBorderIcon />
                  </ListItemIcon>
                  <ListItemText primary="Saved" />
                </ListItemButton>
              </ListItem>

              {/* List Item */}
              <ListItem onClick={() => setOpenDrawer((item) => !item)} to="/">
                <ListItemButton>
                  <ListItemIcon>
                    <SearchIcon />
                  </ListItemIcon>
                  <ListItemText primary="Search" />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
        </React.Fragment>
      </Box>
    </Box>
  );
}
