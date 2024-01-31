import React, {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Login = () => {
    const { store, actions } = useContext(Context);
    const [formValue, setFormValue] = useState({email: "", password: ""})
    const navigate = useNavigate();

    function onChange(e)  {				
        const id = e.target.id;
        const value = e.target.value;
        setFormValue({...formValue, [id]:value});
                            
    }
    return(
        <div className="container mt-5">
                <form className="row g-3 border border-lightgray">
                    <div className="py-2 bg-light border-bottom border-lightgray mt-0 text-center">
                        <h2 >Login</h2>
                    </div>                    
                    <div className="col-md-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input onChange={onChange} value={formValue.email} type="email" className="form-control" placeholder="Enter email" id="email" />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input onChange={onChange} value={formValue.password} type="password" className="form-control" placeholder="Enter password" id="password" />
                    </div>
                    <button type="button" onClick={() => actions.login(formValue,navigate)} className="btn btn-primary">Login</button>                      
                </form>
            </div>
    );
}

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