import React from "react";

function GlobalButton(props) {

  

  
  // console.log(props)
  return (
    <div>
      <button onClick={props.handlereset}  className={`bg-${props.bgcolor}  text-${props.textcolor} font-bold md:text-sm text-xs    py-2 px-2 md:px-4 rounded border border-${props.bordercolor}`} type={props.type} >
        {props.name}
      </button>
    </div>
  );
}

export default GlobalButton;
