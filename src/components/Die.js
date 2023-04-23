import React from 'react'

const Die = (props) => {
  return (
    <div className={props.isHeld ? "box-clicked" : "box"} onClick={props.holdDice} >
        <h2 className='num'>{props.value}</h2>
    </div>
  )
}

export default Die