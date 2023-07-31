import React from 'react'

export default function Cards({products, addToBasket}) {
    const {id,title,price,img,stock} = products;

  return (
    <div className='card' key={id}>
        <img src={img} alt="" />
        <div className="card-body">
            <h5 className='card-title'>{title}</h5>
            <p><b>{price} TL</b></p>
            <p>Stok: {stock === 0 ? "Tükendi" : stock}</p>
            <button 
                className={`btn ${ stock === 0 ? 'stockNotActive' : 'btn-primary'}`}
                onClick={() => addToBasket(products)}
            >{stock === 0 ? "Stok Tükendi" : "Sepete Ekle"}</button>
        </div>
    </div>
  )
}


