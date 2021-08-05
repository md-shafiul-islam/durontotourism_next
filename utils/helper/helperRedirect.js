import { useRouter } from 'next/router';
import React from 'react'

const HelperRedirect = (props)=> {
    const route = useRouter();
    return (
        <div onLoad={route.push(props.to)}>
            
        </div>
    )
}

export default HelperRedirect;