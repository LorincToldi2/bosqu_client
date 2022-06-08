import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from './pages/Home'
import Auth from './pages/Auth'
import Account from './pages/Account'
import Bag from './pages/Bag';
import Checkout from './pages/Checkout';
import Product from './pages/Product';
import Products from './pages/Products';
import History from './pages/History';
import GetUsers from './pages/admin/GetUsers';
import CreateProduct from './pages/admin/CreateProduct';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/orders" element={<History />} />
        <Route path="/bag" element={<Bag />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products/:productSlug" element={<Product />} />
        <Route path="/products" element={<Products />} />


        <Route path="/admin/users" element={<GetUsers />} />
        <Route path="/admin/product" element={<CreateProduct />} />
      </Routes>
    </HashRouter>
);