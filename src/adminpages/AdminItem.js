import { useEffect, useState } from "react";
import AdminNavBar from "./components/AdminNavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminItem() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [stockId, setStockId] = useState("");

    const [items, setItems] = useState("");
    const [categories, setCategories] = useState("");
    const [stocks, setStocks] = useState("");
    const [editItemId, setEditItemId] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getItems();
        getStocks();
        getCategories();
    }, [])

    const handleEdit = (itemId) =>{
        setEditItemId(itemId);
    }

    const handleConfirm =async (itemId, updatedName, updatedPrice) =>{
        await updateItem(itemId,updatedName, updatedPrice);
        setEditItemId(null);
    }

    const updateItem =async (itemId, updatedName, updatedPrice) =>{
        try {
            const response = await axios.put(`http://localhost:8080/items/${itemId}`,{
                name: updatedName,
                price: updatedPrice
            });
            const updatedItems = items.map((item) =>
                itemId === item.id ? {...item, name: updatedName, price: updatedPrice} : item 
            );
            setItems(updatedItems);
        } catch (error) {
            if(error.response.status === 401){
                navigate("/admin/login");
            }
        }
    }
    
    const getItems = async () => {
        try {
            const response = await axios.get("http://localhost:8080/items");
            setItems(response.data);
        } catch (error) {
            if ((error.response.status === 401)) {
                navigate("/admin/login");
            }
        }
    }

    const handleDelete = async(itemId) =>{
        try {
            await axios.delete(`http://localhost:8080/items/${itemId}`);
            const updatedItems = items.filter((item) => item.id !==itemId);
            setItems(updatedItems);
        } catch (error) {
            if(error.response.status === 401){
                navigate("/admin/login");
            }
        }
    }

    const getStocks = async () => {
        try {
            const response = await axios.get("http://localhost:8080/stocks");
            setStocks(response.data);
        } catch (error) {
            if (error.response.status === 401) {
                navigate("/admin/login");
            }
        }
    }

    const getCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8080/categories");
            setCategories(response.data);
        } catch (error) {
            if (error.response.status === 401) {
                navigate("/admin/login");
            }
        }
    }

    const createItem = async () => {
        const data = {
            "name": name,
            "price": price,
            "categoryId": categoryId,
            "stockId": stockId
        }
        try {
            const response = await axios.post("http://localhost:8080/items", data);
            setItems(response.data);
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) {
                navigate("/admin/login");
            }
        }
    }

    return (
        <div>
            <AdminNavBar />
            <br></br>
            <div className="form-container">
                <form onSubmit={createItem}>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Item Name</label>
                        <input type="text" id="itemName" class="form-control" onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Item Price</label>
                        <input type="text" id="price" class="form-control" onChange={(e) =>setPrice(e.target.value)} required />
                    </div>
                    <div>
                        <label for="exampleFormControlInput1" class="form-label">Select Category</label>
                        <select class="form-control" onChange={(e) =>setCategoryId(e.target.value)}>
                            <option>Please Select an Option</option>
                            {categories && categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <br></br>
                    <div>
                        <label for="exampleFormControlInput1" class="form-label">Select Stock</label>
                        <select class="form-control" onChange={(e) => { setStockId(e.target.value) }}>
                            <option>Please Select an Option</option>
                            {stocks && stocks.map((stock) => (
                                <option key={stock.id} value={stock.id}>{stock.name}</option>
                            ))}
                        </select>
                    </div>
                    <br></br>
                    <button className="btn btn-info" type="submit">Create Item</button>
                </form>
            </div>
            <br></br>
            <h2>Ceate a new Item</h2>
            <br></br>


            {items && items.length > 0 && (
                <table className="table table-success table-striped">
                    <colgroup>
                        <col style={{ width: "10%" }}></col>
                        <col style={{ width: "30%" }}></col>
                        <col style={{ width: "30%" }}></col>
                        <col style={{ width: "30%" }}></col>
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                 <td>
                                    {editItemId === item.id ? (
                                        <input
                                        className="edit-input"
                                        type="text"
                                        value={item.name}
                                        onChange={(e) =>{
                                            const updatedName = e.target.value;
                                            updateItem(item.id, updatedName, item.price)
                                        }}></input>
                                    ):(
                                        item.name
                                    )}
                                 </td>
                                 <td>
                                    {editItemId === item.id ? (
                                        <input 
                                        className="edit-input"
                                        type="text"
                                        value={item.price}
                                        onChange={(e) =>{
                                            const updatedPrice = e.target.value;
                                            updateItem(item.id, item.name, updatedPrice)
                                        }}></input>
                                    ):(
                                        item.price
                                    )}
                                 </td>
                                 <td>
                                    {editItemId === item.id ? (
                                        <button className="btn btn-success" 
                                        onClick={() =>handleConfirm(item.id, item.name, item.price)}>Confirm</button>
                                    ) : (
                                        <button className="btn btn-primary"
                                        onClick={() =>handleEdit(item.id)}>Update</button>
                                    )}
                                    <button className="btn btn-danger" onClick={() =>handleDelete(item.id)}>Delete</button>
                                 </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            )}
        </div>
    );
} 