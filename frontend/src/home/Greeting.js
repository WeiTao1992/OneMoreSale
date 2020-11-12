import React from "react";
import greeting from './greeting.jpg';
import Logo from './Logo.png';

export default function Greeting(){
    const imgStyle = {
        height: "40vh",
        width: "100vw",
    }

    return (<img src={Logo} alt="Logo" style={imgStyle}/>);
}