import React from 'react'

function GlobalInputfield(props) {
    
  return (
    <div><input
    onChange={props.handlechange}
    disabled={props.disabled}
    type={props.type}
    name={props.name}
    value={props.value}
    className={`${props.border? "border border-red-500":null} "border border-black border text-black text-xs md:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full h-10 md:h-12 p-2.5 "`} 
    placeholder={props.placeholder}
    required=""
    label={props.label}
    
  /></div>
  )
}

export default GlobalInputfield