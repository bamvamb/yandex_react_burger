import React, {useEffect, useState} from 'react';
import styles from './App.module.css';
import AppHeader from './app-header/app-header'
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import BurgerConstructor from './burger-constructor/burger-constructor';
import Modal from './share/modal/modal';
import OrderDetails from './order-details/order-details';
import { useGetIngredientsQuery } from '../services/api';
import {createRandom} from '../services/slices/burger'
import { useDispatch } from 'react-redux';


function App() {
  const dispatch = useDispatch()
  const { data:ingredients, error, isLoading } = useGetIngredientsQuery()
  const [showOrder, setShowOrder] = useState<boolean>(false)
  
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
            { ingredients && <BurgerIngredients ingredients={ingredients}/> }
            <BurgerConstructor onOrder={() => {setShowOrder(true)}}/>
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
