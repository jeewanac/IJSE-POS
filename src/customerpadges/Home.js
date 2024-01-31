import axios from "axios";
import CustomerNavBar from "./components/CustomerNavBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Home() {
    const [items, setItems] = useState("");
    const [checkouts, setCheckouts] = useState([]);
    const [total, setTotal] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        getItems();
    }, [])

    const getItems = async () => {
        try {
            const response = await axios.get("http://localhost:8080/items")
            setItems(response.data);
        } catch (error) {
            if (error.response.data === 401) {
                navigate("/customerlogin");
            }
        }
    }

    const saveOrder = async () => {
        const itemIds = checkouts.map(obj => obj.id);
        const data = {
            items: itemIds
        }
        const response = await axios.post("http://localhost:8080/checkouts", data);
        if (response.status === 200) {
            alert("Order Completed");
            setCheckouts([]);
            setTotal(0);
        } else {
            console.log("error!")
        }
    }

    return (
        <div>
            <CustomerNavBar />
            <div className='container'>
                <div className='heading text-center'>
                    <h1></h1>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='col-md-12'>
                        <h1>Items</h1>
                        <div className='row'>
                            {items && items.map(item => (
                                <div className='card col-md-6 mb-3'>
                                    <h5 style={{ textAlign: 'center' }}>{item.name}</h5>
                                    <h5 style={{ textAlign: 'center' }}>Rs. {item.price}</h5>
                                    <button
                                        onClick={() => {
                                            setCheckouts([...checkouts, item]);
                                            let itemTotal = total + item.price;
                                            setTotal(itemTotal);
                                        }}
                                        className='btn btn-info'
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='col-md-6'>
                    <h1>Cart</h1>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Item ID</th>
                                <th>Name</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {checkouts.map(items => (
                                <tr>
                                    <td>{items.id}</td>
                                    <td>{items.name}</td>
                                    <td>{items.price}</td>
                                </tr>
                            ))}
                        </tbody>
                        <thead>
                            <tr>
                                <th colSpan={2}>Total (Rs.)</th>
                                <th>{total}</th>
                            </tr>
                        </thead>
                    </table>
                    <button className='btn btn-success' onClick={saveOrder}>Save Order</button>
                </div>
            </div>
        </div>
    )

}