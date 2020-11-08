import React from "react";
import greeting from './greeting.jpg';

export default function Greeting(){
    const imgStyle = {
        height: "40vh",
        width: "100vw",
    }

    return (<img src={greeting} alt="Logo" style={imgStyle}/>);
}