import React, {useState, useEffect, useCallback} from 'react';
import styles from './App.module.css';
import AppHeader from './app-header/app-header'
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import { get_ingredients, Ingredient } from '../share/api';
import BurgerConstructor from './burger-constructor/burger-constructor';


const getRandomNumber = (max:number, min: number=0) => {
  return min + Math.round( Math.random() * (max-min))
}

function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [burger, setBurger] = useState<Ingredient[]>([])

  useEffect(() => {
    if(ingredients.length === 0){
      get_ingredients().then(ingredients => { 
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
      const buns = ingredients.filter( (ingredient:Ingredient) => ingredient.type === "bun")
      const sauses = ingredients.filter( (ingredient:Ingredient) => ingredient.type === "sauce" )
      const mains = ingredients.filter( (ingredient:Ingredient) => ingredient.type === "main")
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
            <BurgerConstructor burger={burger}/>
          </div>
        </main>
        <div id="modal-root" className={styles.app_modals}></div>
    </div>
  );
}

export default App;
