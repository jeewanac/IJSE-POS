import { useNavigate } from "react-router-dom"

export default function CustomerNavBar() {

    const navigate = useNavigate();

    const home = () =>{
        navigate("/");
    }

    const cart = () =>{
        navigate("/");
    }

    const customer = () =>{
        navigate("/customers");
    }

    const Logout= () =>{
        localStorage.removeItem("token");
        navigate("/customerlogin");
    }
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">ABC Store</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link"  onClick={home}>Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link"  onClick={cart}>cart</a>
                        </li>
                        

                    </ul>
                    <form class="d-flex" role="search">
                        <button class="btn btn-secondary" onClick={Logout}>Logout</button>
                    </form>
                </div>
            </div>
        </nav>
    )
}