import {signOut } from 'next-auth/react';
import React from 'react'
import { Button } from 'react-bootstrap';

 const LogOutButton =(props)=> {
     useSession

     const logOutHandeller = ()=>{
         signOut();
     }
    return (
        <React.Fragment>
            <Button variant="primery" onClick={logOutHandeller}>
                Log Out
            </Button>
        </React.Fragment>
    )
}

export default LogOutButton;
