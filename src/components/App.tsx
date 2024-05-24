import React, {useState, useEffect, useCallback} from 'react';
import styles from './App.module.css';
import AppHeader from './app-header/app-header'
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import { getIngredients, Ingredient } from '../share/api';
import BurgerConstructor from './burger-constructor/burger-constructor';
import Modal from './share/modal/modal';
import OrderDetails from './order-details/order-details';


const getRandomNumber = (max:number, min: number=0) => {
  return min + Math.round( Math.random() * (max-min))
}

function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [burger, setBurger] = useState<Ingredient[]>([])
  const [showOrder, setShowOrder] = useState<boolean>(false)

  useEffect(() => {
    if(ingredients.length === 0){
      getIngredients().then(ingredients => { 
        setIngredients(ingredients)
      }).catch( (err) => {
        console.log({
          "error": "can't get ingridients data",
          "data": err
        })
      })
    }
  }, [])
  
  useEffect(() => {
    if(ingredients.length > 0 && burger.length === 0){
      setBurger(gen_random_burger())
    }
  },[ingredients])
  
  const gen_random_burger =  useCallback( (
    max_sauses:number=2, 
    min_sauses: number=1,
    max_mains:number=5,
    min_mains:number=3
  ) => {
    if(ingredients.length !== 0){
      const buns = ingredients.filter( (ingredient) => ingredient.type === "bun")
      const sauses = ingredients.filter( (ingredient) => ingredient.type === "sauce" )
      const mains = ingredients.filter( (ingredient) => ingredient.type === "main")
      const current_bun = buns[getRandomNumber(buns.length-1)]
      let mains_count = getRandomNumber(max_mains, min_mains)
      let sauses_count = getRandomNumber(max_sauses, min_sauses)
      const res = [current_bun]
      while( mains_count > 0 || sauses_count > 0){
        if(
          (sauses_count === 0 || getRandomNumber(1)) && mains_count > 0
        ){
          res.push( mains[getRandomNumber(mains.length - 1)])
          mains_count -= 1
        } else {
          res.push( sauses[getRandomNumber(sauses.length - 1)])
          sauses_count -= 1
        }
      }
      res.push(current_bun)
      return res
    } else {
      return []
    }
  }, [ingredients] )

  return (
    <div className={styles.App}>
        <AppHeader/>
        <main className="pl-30 pr-30">
          <h1 className={styles.app_body_header}>Соберите бургер</h1>
          <div className={styles.app_content}>
            <BurgerIngredients ingredients={ingredients}/>
            <BurgerConstructor onOrder={() => {setShowOrder(true)}} burger={burger}/>
          </div>
          <Modal 
              header_title='Статус заказа'
              isOpen={showOrder}
              onClose={()=>{setShowOrder(false)}}
            >
            <OrderDetails
              state='in_process'
              _id='034546'
            />
          </Modal>
        </main>
        <div id="modal-root" className={styles.app_modals}></div>
    </div>
  );
}

export default App;
