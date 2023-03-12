
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import CartMenu from "./components/Cart Menu/CartMenu";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/Navbar/NavBar";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Products from "./pages/Products/Products";
import React from "react";
import { useLocation } from "react-router-dom";
import Success from "./pages/Success/Success";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Layout = ()=>{
 
  return (
    <div className="app">
      <ScrollToTop />
      <NavBar />
      <Outlet />
      <Footer />
      <CartMenu  />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout />,
    children: [
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/products/:id",
        element:<Products />
      },
      {
        path:"/product/:id",
        element:<Product />
      },
      {
        path:"/success",
        element:<Success />
      }
    ]
  },
 
  
])

function App() {
  return (
    <div className="App">
      {/* <h1 className=" text-3xl text-red-400">Hey</h1>
      <Button variant="contained" className=" bg-red-200 text-black">Hello</Button> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
