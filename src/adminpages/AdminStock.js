import { useEffect, useState } from "react";
import AdminNavBar from "./components/AdminNavBar";
import axios from "axios";
import './Admin.css'
import { useNavigate } from "react-router-dom";

export default function AdminStock() {

    const [stocks, setStocks] = useState("");
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [editStockId, setEditStockId] = useState("");


    const navigate = useNavigate();

    const handleEdit = (stockId) => {
        setEditStockId(stockId);
    }

    const handleConfirm = async (stockId, updatedName, updatedQty) => {
        await updateStock(stockId, updatedName, updatedQty);
        setEditStockId(null);
    }

    const updateStock = async (stockId, updatedName, updatedQty) => {
        try {
            const response = await axios.put(`http://localhost:8080/stocks/${stockId}`, {
                name: updatedName,
                qty: updatedQty
            })
            const updatedStock = stocks.map((stock) => (
                stockId === stock.id ? { ...stock, name: updatedName, qty: updatedQty } : stock
            ))
            setStocks(updatedStock);
        } catch (error) {
            if (error.response.status === 401) {
                navigate("/admin/login");
            }
        }
    }

    useEffect(() => {
        getStocks();
    }, [])

    const getStocks = async () => {
        try {
            const response = await axios.get("http://localhost:8080/stocks");
            setStocks(response.data);
        } catch (error) {
            if (error.response.status === 400) {
                navigate("/admin/login");
            }
        }
    }

    const createStock = async () => {
        const data = {
            "name": name,
            "qty": quantity
        }

        try {
            const response = await axios.post("http://localhost:8080/stocks", data);
            setStocks(response.data);
        } catch (error) {
            if (error.response.status === 400) {
                navigate("/admin/login");
            }
        }
    }

    const handleDelete = async (stockId) => {
        try {
            const response = await axios.delete(`http://localhost:8080/stocks/${stockId}`);
            const updatedStock = stocks.filter((stock) => stock.id !== stockId)
            setStocks(updatedStock)
        } catch (error) {
            if (error.response.status === 401) {
                navigate("/admin/login");
            }
        }
    }
    return (
        <div>
            <AdminNavBar />
            <br></br>
            <h2>Stock</h2>
            <br></br>
            <div className="form-container">
                <form onSubmit={createStock}>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Stock Name</label>
                        <input type="text" class="form-control" onChange={(e) => { setName(e.target.value) }} required />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Stock Quantity</label>
                        <input type="text" class="form-control" onChange={(e) => { setQuantity(e.target.value) }} required />
                    </div>
                    <button className="btn btn-info" type="submit">Create Stock</button>
                </form>

            </div>
            <br></br>
            <div>
                {stocks && stocks.length > 0 && (
                    <table className="table table-success table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stocks.map((stock) => (
                                <tr key={stock.id}>
                                    <td>{stock.id}</td>
                                    <td>
                                        {editStockId === stock.id ? (
                                            <input
                                                className="edit-stock"
                                                type="text"
                                                value={stock.name}
                                                onChange={(e) => {
                                                    const updatedName = e.target.value;
                                                    updateStock(stock.id, updatedName, stock.qty)
                                                }}></input>
                                        ) : (
                                            stock.name
                                        )}
                                    </td>
                                    <td>
                                        {editStockId === stock.id ? (
                                            <input
                                                className="edit-stock"
                                                type="text"
                                                value={stock.qty}
                                                onChange={(e) => {
                                                    const updatedQty = e.target.value;
                                                    updateStock(stock.id, stock.name, updatedQty)
                                                }}></input>
                                        ) : (
                                            stock.qty
                                        )}
                                    </td>
                                    <td>
                                        {editStockId === stock.id ? (
                                            <button className="confirm-btn" onClick={() => handleConfirm(stock.id, stock.name, stock.qty)}>
                                                Confirm</button>
                                        ) : (
                                            <button className="update-btn" onClick={() => handleEdit(stock.id)}>Update</button>
                                        )}

                                        <button className="btn btn-danger" onClick={() => handleDelete(stock.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
} 