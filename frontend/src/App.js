import Header from "./components/Header";
import Cart from "./components/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/screens/Login";
import Signup from "./components/screens/Signup";
import Homescreen from "./components/screens/Homescreen";
import Producscreen from "./components/screens/Producscreen";
import SellerScreen from "./components/screens/SellerScreen";
import UserProduct from "./components/screens/UserProduct";
import OrderScreen from "./components/screens/OrderScreen";
function App() {
  return (
    <BrowserRouter>
      {/* <Header/> */}
      <Routes>
        <Route path="/" Component={Homescreen}></Route>
        <Route path="/seller" Component={SellerScreen}></Route>
        <Route path="/products/:id" Component={Producscreen}></Route>
        <Route path="/cart" Component={Cart}></Route>
        <Route path="/login" Component={Login}></Route>
        <Route path="/signup" Component={Signup}></Route>
        <Route path="/myproducts" Component={UserProduct}></Route>
        <Route path="/myorders" Component={OrderScreen}></Route>
      </Routes>
      {/*     
    <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
