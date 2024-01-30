import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

const Private = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (!store.logged) {
            actions.verifyAuthToken();
        }
    }, [store.logged]);

    return (
        <div className="text-center">
            {store.logged ? (
                <div>
                    <h1>Welcome, {store.user.email}!</h1>
                    <p>This is a protected route.</p>
                </div>
            ) : (
                <div>
                    <h1>Unauthorized</h1>
                    <p>You need to be logged in to access this page.</p>
                </div>
            )}
        </div>
    );
};

export default Private;

// import React from "react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export const Private = () => {
// const [userInformation, setUserInformation] = useState({})
// const navigate = useNavigate()

// useEffect(() => {
//     if(!sessionStorage.getItem("token")){
//         navigate("/login")
//     }

//     fetch(process.env.BACKEND_URL + "/api/user", {
//         headers: {
//             "Authorization" : "Bearer " + sessionStorage.getItem("token")
//         }
//     })
//     .then(res => res.json())
//     .then(data => setUserInformation(data))
//     .catch(err => console.log(err))
// }, [])

//     return(
//         <div className="container">
//             <h1>Private</h1>
//             {userInformation ? (<p>Hello! {userInformation.email}</p>) : <p>Loading...</p>}
//         </div>
//     )
// }