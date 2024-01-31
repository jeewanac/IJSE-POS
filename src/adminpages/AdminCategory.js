import { useEffect, useState } from "react";
import AdminNavBar from "./components/AdminNavBar";
import axios from "axios";
import React from "react";
import './Admin.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";

export default function AdminCategory() {

    const [categories, setCategories] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [editCategoryId, setEditCategoryId] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8080/categories");
            setCategories(response.data);
        } catch (error) {
            if (error.response.status === 400) {
                navigate("/admin/login")
            }
        }
    }

    const createCategory = async () => {
        const data = {
            "name": newCategory
        }
        try {
            const response = await axios.post("http://localhost:8080/categories", data);
            setCategories(response.data);
        } catch (error) {
            if (error.response.status === 400) {
                navigate("/admin/login");
            }
        }
    }

    const handleEdit = (categoryId) =>{
        setEditCategoryId(categoryId);
    }

    const handleConfirm =async (categoryId, updatedName) =>{
        await updateCategory(categoryId, updatedName)
        setEditCategoryId(null);
    }

    const handleDelete =async (categoryId) =>{
        try {
            const response =await axios.delete(`http://localhost:8080/categories/${categoryId}`)
            const updatedcategories = categories.filter((category) => categoryId !== category.id)
            setCategories(updatedcategories)
        } catch (error) {
            if(error.response.status === 401){
                navigate("/admin/login")
            }
        }
    }

    const updateCategory =async (categoryId, updatedName) =>{
        try {
            const response = await axios.put(`http://localhost:8080/categories/${categoryId}`,{
                name: updatedName
            })
            const updatedCategories = categories.map((category) =>
                categoryId === category.id ? {...category, name: updatedName} : category
            )
            setCategories(updatedCategories)
        } catch (error) {
            if(error.response.status === 401){
                navigate("/admin/login")
            }
        }
    }

    return (
        <div>
            <AdminNavBar />
            <br></br>
            <h3>Create New Category</h3>
            <br></br>
            <h4></h4>

            <div className="form-container">
                <form onSubmit={createCategory}>
                    <label>Category Name</label>
                    <input className="form-control" onChange={(e) => { setNewCategory(e.target.value) }} required />
                    <br></br>
                    <button className="btn btn-primary" type="submit" >Create Category</button>
                </form>
            </div>

            {categories && categories.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>
                                {editCategoryId === category.id ?(
                                    <input 
                                    className="edit-input"
                                    type="text"
                                    value={category.name}
                                    onChange={(e) =>{
                                        const updatedName = e.target.value;
                                        updateCategory(category.id,updatedName);
                                    }}></input>
                                ) : (
                                    category.name
                                )}
                            </td>
                            <td>
                                    {editCategoryId === category.id ? (
                                        <button className="btn btn-confirm" onClick={() =>handleConfirm(category.id, category.name)}>Confirm</button>
                                        //<Button variant="outline-success" onClick={() =>handleConfirm(category.id, category.name)}>Confirm</Button>
                                    ) : (
                                        <Button variant="outline-warning" onClick={() =>handleEdit(category.id)}>Update</Button>
                                    )}
                                      <Button variant="outline-danger" onClick={() => handleDelete(category.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
} 