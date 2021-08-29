import React from 'react'

 const EmptyCont = (props)=> {
   
    return (
        <div style={{minWidth:'100px', height:props.height, background:'#FFF'}}>
            <h3>Content Size: {props.height} </h3>
        </div>
    )
   
}

export default EmptyCont;