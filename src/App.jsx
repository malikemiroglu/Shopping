import { useState } from "react"
import {products as productsObject} from "./data/product"
import './App.css'
import Cards from "./components/Cards"
import Basket from "./components/Basket"
import OrderSummary from "./components/OrderSummary"

function App() {
  const [card, setCard] = useState([])

  function handlePlus(itemId) {
    const updatedCard = card.map(item => {
      if((item.id === itemId && item.amount > 0) && item.stock !== 0){
        item.amount++;
        item.stock--;
      }
      return item;
    })
    setCard([...updatedCard])
  }
  
  function handleMinus(itemId) {
    const updatedCard = card.map(item => {
      if(item.id === itemId && item.amount > 1){
        item.amount--;
        item.stock++;
      }
      return item;
    })
    setCard([...updatedCard])
  }

  function removeProduct(id) {
    setCard(prev => {
      const updatedCard = prev.map(item => {
        if (item.id === id) {
          item.stock += item.amount;
          item.amount = 0;
        }
        return item;
      });
      return updatedCard.filter(item => item.amount > 0); 
    });
  }

  function addToBasket(item) {
    if(item.stock < 1){
      return;
    }

    const updatedCard = [...card];
    const index = updatedCard.findIndex(x => x.id === item.id);

    if (index === -1) {
      item.amount = 1;
      item.stock -= 1
      updatedCard.push(item);
    } else {
      updatedCard[index].amount += 1;
      updatedCard[index].stock -= 1;
    }

    setCard(updatedCard);
  }


  return (
    <>
    <div className='container'>
      <h2>Ürünler</h2>
      <div className="cardWrapper">
        {
          productsObject.map((item) => <Cards key={item.id} products={item} addToBasket={addToBasket} />)
        }
      </div>
      <h3>Sepetim ({card.length} Ürün)</h3>
      <div className="row">
        <div className="col-8">
           <ul className="basketWrapper">
            {card.map(item => <Basket key={item.id} item={item} removeProduct={removeProduct} handlePlus={handlePlus} handleMinus={handleMinus} />)}
          </ul>
        </div>
        <div className={`${card.length > 0 ? "col-4" : "hidden"}`}>
          <OrderSummary item={card}/>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
