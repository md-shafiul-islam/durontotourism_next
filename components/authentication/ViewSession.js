import { useSession } from 'next-auth/react';
import React from 'react'

const ViewSession = (params) =>{
   const session = useSession();
    return (
        <div>
            <pre>{JSON.stringify(session, null, 2)}</pre>
            <br />
            <br />
            <br />
        </div>
    )
}

export default ViewSession;