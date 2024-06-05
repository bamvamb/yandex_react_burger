import React, {useEffect} from 'react';
import styles from './App.module.css';
import AppHeader from './app-header/app-header'
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import BurgerConstructor from './burger-constructor/burger-constructor';
import { useGetIngredientsQuery } from '../services/api';
import {createRandom} from '../services/slices/burger'
import { useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function App() {
  const dispatch = useDispatch()
  const { data:ingredients, error, isLoading } = useGetIngredientsQuery()
  useEffect(() => {
    if(ingredients){
      dispatch(createRandom(ingredients))
    }
  }, [ingredients])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    if ('message' in error) {
      return <div>Ошибка получения данных об ингредиентах: {error.message}</div>;
    } else if('error' in error) {
      return <div>Ошибка получения данных об ингредиентах: {error.error}</div>;
    } else {
      return <div>Ошибка получения данных об ингредиентах</div>;
    }
  }

  return (
    <div className={styles.App}>
        <AppHeader/>
        <main className="pl-30 pr-30">
          <h1 className={styles.app_body_header}>Соберите бургер</h1>
          <div className={styles.app_content}>
            <DndProvider backend={HTML5Backend}>
              { ingredients && <BurgerIngredients ingredients={ingredients}/> }
              <BurgerConstructor/>
            </DndProvider>
          </div>
        </main>
        <div id="modal-root" className={styles.app_modals}></div>
    </div>
  );
}

export default App;
