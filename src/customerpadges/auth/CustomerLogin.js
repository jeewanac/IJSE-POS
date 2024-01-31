import axios from "axios";
import { useState } from "react";
import { resolvePath, useNavigate } from "react-router-dom";

export default function CustomerLogin() {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const Login = async (event) =>{
        event.preventDefault();

        const data ={
            "username": username,
            "password": password
        }

        const response = await axios.post("http://localhost:8080/auth/login",data);
        if(response.status===200){
            localStorage.setItem("token" ,response.data);
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data}`;
            navigate("/");
        }else{
            console.log("error");
        }
    }

    const Register = () =>{
        navigate("/customerRegister");
    }
    
    return (
        <div>
            <div className="register-form">
                <form className="row g-3" onSubmit={Login}>
                    <div className="col-md-12">
                        <label for="text" className="form-label">Username</label>
                        <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} required />
                    </div>

                    <div className="col-md-12">
                        <label for="inputZip" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <p1 onClick={Register}> Don't have an account click here</p1>
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}