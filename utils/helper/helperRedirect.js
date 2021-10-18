import { useRouter } from 'next/router';
import React from 'react'

const HelperRedirect = (props)=> {
    const route = useRouter();
    route.push(props.to)
    return (
        <div>
            &nbsp;
        </div>
    )
}

export default HelperRedirect;