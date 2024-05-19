import React, {useState, useEffect} from 'react';
import styles from './App.module.css';
import AppHeader from './components/app-header/app-header'
import BurgerIngridients from './components/burger-ingridients/burger-ingridients';
import { get_data, DataFrame } from './share/api';
import BurgerConstructor from './components/burger-constructor/burger-constructor';


const get_random_number = (max:number, min: number=0) => {
  return min + Math.round( Math.random() * (max-min))
}

function App() {
  const [data,setData] = useState<DataFrame[]>([])
  const [burger, setBurger] = useState<DataFrame[]>([])
  useEffect(() => {
    if(data.length === 0){
      get_data().then(data => { 
        setData(data)
      })
    }
  }, [])
  useEffect(() => {
    if(data.length > 0 && burger.length === 0){
      setBurger(gen_random_burger())
    }
  },[data])
  
  const gen_random_burger = (
    max_sauses:number=2, 
    min_sauses: number=1,
    max_mains:number=5,
    min_mains:number=3
  ) => {
    if(data.length !== 0){
      const buns = data.filter( (ingridient:DataFrame) => ingridient.type === "bun")
      const sauses = data.filter( (ingridient:DataFrame) => ingridient.type === "sauce" )
      const mains = data.filter( (ingridient:DataFrame) => ingridient.type === "main")
      const current_bun = buns[get_random_number(buns.length-1)]
      let mains_count = get_random_number(max_mains, min_mains)
      let sauses_count = get_random_number(max_sauses, min_sauses)
      const res = [current_bun]
      while( mains_count > 0 || sauses_count > 0){
        if(
          (sauses_count === 0 || get_random_number(1)) && mains_count > 0
        ){
          res.push( mains[get_random_number(mains.length - 1)])
          mains_count -= 1
        } else {
          res.push( sauses[get_random_number(sauses.length - 1)])
          sauses_count -= 1
        }
      }
      res.push(current_bun)
      return res
    } else {
      return []
    }
  }

  return (
    <div className={styles.App}>
        <AppHeader/>
        <main className="pl-30 pr-30">
          <h1 className={styles.app_body_header}>Соберите бургер</h1>
          <div className={styles.app_content}>
            <BurgerIngridients data={data}/>
            <BurgerConstructor burger={burger}/>
          </div>
        </main>
    </div>
  );
}

export default App;
