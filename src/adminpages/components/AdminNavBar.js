import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";

export default function AdminNavBar() {


    const navigate = useNavigate();

    const home = () => {
        navigate("/admin");
    }

    const category = () => {
        navigate("/admin/categories");
    }

    const item = () => {
        navigate("/admin/items");
    }

    const order = () => {
        navigate("/admin/orders");
    }

    const stock = () => {
        navigate("/admin/stocks");
    }

    const customer = () => {
        navigate("/admin/customers");
    }

    const Logout = () => {
        localStorage.removeItem("token");
        navigate("/admin/login");
    }

    return (

        <div>

            <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">

                <div class="container-fluid">
                    <a class="navbar-brand" href="">ABC Store</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="" onClick={home}>Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="" onClick={item}>Items</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="" onClick={category}>Categories</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="" onClick={stock}>Stocks</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="" onClick={order}>Orders</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="" onClick={customer}>Customers</a>
                            </li>

                        </ul>
                        <form class="d-flex" role="search">
                            <button class="btn btn-secondary" onClick={Logout}>Logout</button>
                        </form>
                    </div>
                </div>

            </nav>

        </div>
        // <div>
        //     <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        //         <div className="container-fluid">
        //             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        //                 <span className="navbar-toggler-icon"></span>
        //             </button>
        //             <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        //                 <a className="navbar-brand" href="">POS Software</a>
        //                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        //                     <li className="nav-item">
        //                         <a className="nav-link" aria-current="page" href="" onClick={home}>Home</a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link" href='' onClick={category}>Categories</a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link" href='' onClick={item}>Items</a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link" href='' onClick={stock}>Stocks</a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link" href='' onClick={order}>Orders</a>
        //                     </li>
        //                     <li className="nav-item">
        //                         <a className="nav-link" href='' onClick={customer}>Customers</a>
        //                     </li>
        //                 </ul>
        //                 <form className="d-flex" role="search">
        //                     <button className="btn btn-primary" onClick={logout}>Logout</button>
        //                 </form>
        //             </div>
        //         </div>
        //     </nav>
        // </div>
    )
}