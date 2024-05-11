import React from "react";
import { Navigate } from "react-router-dom";

 const layout = () => {
    if (localStorage.getItem('auth_role') == 'user') return <Navigate to={'layout3'} />;
    if (localStorage.getItem('auth_role') == 'admin') return <Navigate to={'layout1'} />;
    else return <Navigate to={'layout3'}/>
}

export default layout