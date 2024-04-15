import React, { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PageNotFound } from '../pages/PageNotFound/PageNotFound'
import { SignIn } from '../pages/SignUpInPage/SignIn'
import { MainPage } from '../pages/User/Mainpage/MainPage'
import { HomePage } from '../pages/User/HomePage/HomePage'
import { useDispatch, useSelector } from 'react-redux'
import { ListAllProducts } from '../pages/User/ListAllProducts/ListAllProducts'
import { AdminPage } from '../pages/Admin/AdminPage/AdminPage'
import { Dashboard } from '../pages/Admin/Dashboard/Dashboard'
import { Products } from '../pages/Admin/Products/Products'
import { Customer } from '../pages/Admin/Customer/Customer'
import { Payments } from '../pages/Admin/Payments/Payments'
import { Orders } from '../pages/Admin/Orders/Orders'
import { SingleProduct } from '../assets/components/SingleProduct/SingleProduct'
import { logout } from '../Redux/Action'

export const Router = () => {
    const dispatch = useDispatch();
    const { userData, authenticated } = useSelector(state => state.user);
    const [admin, setAdmin] = useState(false);
    useEffect(() => {
        if (userData?.email === "anusumathi2003@gmail.com") {
            setAdmin(true);
        }
    }, [userData, authenticated])
    useEffect(() => {
        // console.log("logout")
        setTimeout(() => {
            dispatch(logout());
        }, 6 * 60 * 60 * 100);
    })
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/signin" element={!authenticated ? <SignIn /> : admin ? <Navigate to="/products" /> : <Navigate to="/home" />} />
                    <Route path="/" element={(authenticated && !admin) ? <MainPage /> : <Navigate to="/signin" />} >
                        <Route index element={(authenticated && !admin) ? <HomePage /> : <Navigate to="/signin" />} />
                        <Route path="/home" element={(authenticated && !admin) ? <HomePage /> : <Navigate to="/signin" />} />
                        <Route path="/men" element={(authenticated && !admin) ? <ListAllProducts /> : <Navigate to="/signin" />} />
                        <Route path="/women" element={(authenticated && !admin) ? <ListAllProducts /> : <Navigate to="/signin" />} />
                        <Route path="/electronics" element={(authenticated && !admin) ? <ListAllProducts /> : <Navigate to="/signin" />} />
                        <Route path="/mobile" element={(authenticated && !admin) ? <ListAllProducts /> : <Navigate to="/signin" />} />
                        <Route path="/product" element={(authenticated && !admin) ? <SingleProduct /> : <Navigate to="/signin" />} />

                    </Route>

                    <Route path="/" element={(authenticated && admin) ? <AdminPage /> : <Navigate to="/signin" />} >
                        <Route index element={(authenticated && admin) ? <Dashboard /> : <Navigate to="/signin" />} />
                        <Route path="/dashboard" element={(authenticated && admin) ? <Dashboard /> : <Navigate to="/signin" />} />
                        <Route path="/products" element={(authenticated && admin) ? <Products /> : <Navigate to="/signin" />} />
                        <Route path="/orders" element={(authenticated && admin) ? <Orders /> : <Navigate to="/signin" />} />
                        <Route path="/customer" element={(authenticated && admin) ? <Customer /> : <Navigate to="/signin" />} />
                        <Route path="/payments" element={(authenticated && admin) ? <Payments /> : <Navigate to="/signin" />} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
