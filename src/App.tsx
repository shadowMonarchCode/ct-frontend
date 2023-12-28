import { Routes, Route } from "react-router-dom";

import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";

import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import {
  AddOrder,
  AllCustomers,
  AllOrders,
  EditOrder,
  Home,
  Order,
  Profile,
  Report,
  ViewUser,
} from "./_root/pages";

import "./globals.css";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* Private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          {/* Customer */}
          <Route path="/customers/all" element={<AllCustomers />} />
          <Route path="/customer/:id" element={<AllCustomers />} />
          {/* Order */}
          <Route path="/orders/all" element={<AllOrders />} />
          <Route path="/order/add" element={<AddOrder />} />
          <Route path="/order/edit" element={<EditOrder />} />
          <Route path="/order/:id" element={<Order />} />
          {/* Report */}
          <Route path="/report" element={<Report />} />
          {/* User */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:userId" element={<ViewUser />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
