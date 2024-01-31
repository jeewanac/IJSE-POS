import { useEffect, useState } from "react";
import AdminNavBar from "./components/AdminNavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminOrder() {
    const [checkouts, setCheckouts] = useState("");
    const navigate = useNavigate();

    useEffect(() =>{
        getCheckouts();
    },[])

    const getCheckouts = async ()=>{
        try {
            const response = await axios.get("http://localhost:8080/checkouts");          
            setCheckouts(response.data);
        } catch (error) {
            if(error.response ===401){
                navigate("/admin/login")
            }
        }     
    }

    const deleteCkeckout =async (id) =>{
        try {
            await axios.delete(`http://localhost:8080/checkouts/${id}`);
            const updatedCheckouts = checkouts.filter((checkout) =>(checkout.id!==id));
            setCheckouts(updatedCheckouts);
        } catch (error) {
             console.error("Error deleting checkout:", error);
        }
    }
    return (
        <div>
            <AdminNavBar />
            <br></br>
            <h2>Orders</h2>

            {checkouts && checkouts.length>0 &&(
                <table className="table table-success table-striped-columns">
                <colgroup>
                    <col style={{ width: "10%" }}></col>
                    <col style={{ width: "30%" }}></col>
                    <col style={{ width: "50%" }}></col>
                    <col style={{ width: "10%" }}></col>
                </colgroup>
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }} scope="col">Order ID</th>
                        <th style={{ textAlign: "center" }} scope="col">Total Value</th>
                        <th style={{ textAlign: "center" }} scope="col">Order Date </th>
                        <th style={{ textAlign: "center" }} scope="col">Action </th>
                    </tr>
                </thead>
                <tbody>
                    {checkouts.map((checkout) =>(
                        <tr key={checkout.id}>
                        <th>{checkout.id}</th>
                        <td>{checkout.total}</td>
                        <td>{checkout.orderTime}</td>
                        <td><button className="btn btn-danger" onClick={(() =>deleteCkeckout(checkout.id))}>Delete</button></td>
                    </tr>
                    ))}
                </tbody>
            </table>
            )}
        </div>
    )
}