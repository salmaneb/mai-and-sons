import Dashboard from "./components/pages/Dashboard/Dashboard";
import SignIn from "./components/pages/auth/Login";
import SignUp from "./components/pages/auth/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Companies from "./components/pages/Dashboard/Companies/Companies";
import Areas from "./components/pages/Dashboard/Areas/Areas";
import Customer from "./components/pages/Dashboard/customer/Customer";
import Items from "./components/pages/Dashboard/Items/Items";
import Suppliers from "./components/pages/Dashboard/Suppliers/Suppliers";
import OrderBooker from "./components/pages/Dashboard/OrderBooker/OrderBooker";
import OrderBookerAreas from "./components/pages/Dashboard/OrderBookerAreas/OrderBookerAreas";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<SignIn />} />
        <Route index path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="companies" element={<Companies />} />
          <Route path="items" element={<Items />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="areas" element={<Areas />} />
          <Route path="customer" element={<Customer />} />
          <Route path="order-booker" element={<OrderBooker />} />
          <Route path="order-booker-areas" element={<OrderBookerAreas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
