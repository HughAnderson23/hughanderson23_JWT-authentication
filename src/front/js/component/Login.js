import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        actions.login(email, password);
    };

    return (
        <form className="mx-auto" style={{ width: "40%" }}>
            <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email"
                    />
                </div>
            </div>
            <div className="d-flex flex-row align-items-center mb-4">
                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                <div className="form-outline flex-fill mb-0">
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
            </div>
            <button  className="btn btn-primary" type="submit" onClick={handleLogin}>
                Login
            </button>
            <Link to="/signup">
                    <button className="btn btn-primary mx-5">Register</button>
            </Link>
        </form>
    );
};
export default Login;

//     return(
//         <div className="container col-lg-6 needs-validation">
//             <h1>Log In</h1>
//             <form className="mt-3" method="POST" onSubmit={handleLogin}>
//                     <div className="mb-3">
//                         <label className="form-label" htmlFor="EmailForm">E-mail Adress</label>
//                         <input type="email" className="form-control" id="EmailForm" placeholder="yahaira@example.com" onInput={handleEmail} required></input>
//                     </div>
//                     <div className="mb-3">
//                         <label className="form-label" htmlFor="PasswordForm">Password</label>
//                         <input type="password" className="form-control" id="PasswordForm" onInput={handlePassword} required></input>
//                     </div>
//                     <button type="submit" className="btn btn-primary">Log In</button> 
//             </form>
//         </div>
//     )
// }