import React from "react";
import classNames from 'classnames';
import "components/Button.scss";

export default function Button(props) {

   let buttonClasses = classNames('button', 
      { 'button--confirm' : props.confirm,  
        'button--danger' : props.danger
   });


   return (
      <button 
         onClick={props.onClick} 
         className={buttonClasses} 
         disabled={props.disabled}   
      >
            {props.children}
      </button>
   )
}
