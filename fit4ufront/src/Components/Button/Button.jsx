import React from 'react'
import './Button.css'

function Button(props) {
  return (
    <button class="btn">
{props.buttonText}
</button>
  )
}

export default Button
