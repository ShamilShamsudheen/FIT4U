// import React from 'react'
import './Button.css'

function Button(props) {
  return (
    <button className="btn" type={props.type}> 
{props.buttonText}
</button>
  )
}

export default Button
