import React from 'react'
import { useState } from 'react';

export default function Basket({item, removeProduct, handlePlus, handleMinus}) {
  const [amount, setAmount] = useState(1);

  if(item.length === 0) {
    return <></>
  }

  return (
    <>
    <li className='basket'>
      <a href="#"><img src={item.img} alt="" /></a>
      <a href="#"><h3>{item.title}</h3></a>
      <div className='basketBtn'>
        <button onClick={() => {handleMinus(item.id); setAmount(item.amount)}} className={`btn ${item.amount === 1 ? `minus`: `btn-outline-secondary`} btn-outline-secondary'`}> - </button>
        <span className='amount'>{item.amount}</span>
        <button onClick={() => {handlePlus(item.id); setAmount(item.amount)}} className='btn btn-outline-secondary'> + </button>
      </div>
      <p><b style={{color: "#ff8b39"}}>{item.price * amount} TL</b></p>
      <button onClick={() => removeProduct(item.id)} className='trashBtn'><i className="fa-regular fa-trash-can"></i></button>
    </li>
    </>
  )
}

