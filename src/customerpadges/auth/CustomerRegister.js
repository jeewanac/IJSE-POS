import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerRegister() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();

    const Register =async (event) =>{
        event.preventDefault();
        
        const data ={
            "username": username,
            "email": email,
            "password": password
        }

        const response = await axios.post("http://localhost:8080/auth/register",data);
        if(response.status===200){
            navigate("/customerlogin");
        }else{
            console.log("error");
        }
    }

    const Login = () =>{
        navigate("/customerlogin");
    }

    return(
        <div>
            <div className="register-form">
                <form className="row g-3" onSubmit={Register}>
                    <div className="col-md-12">
                        <label for="text" className="form-label">Username</label>
                        <input type="text" className="form-control" onChange={(e) =>setUsername(e.target.value) } required />
                    </div> <br></br>

                    <div className="col-12">
                        <label for="inputEmail4" className="form-label">Email</label>
                        <input type="text" className="form-control" onChange={(e) =>setEmail(e.target.value)} required />
                    </div>
                
                    <div className="col-md-12">
                        <label for="inputZip" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={(e) =>setPassword(e.target.value)} />
                    </div>
                    <div>
                        <p1 onClick={Login}>Already have an account click here</p1>
                    </div>
                    
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        </div>
        
    );
}