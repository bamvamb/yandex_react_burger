import styles from './App.module.css';
import AppHeader from './app-header/app-header'
import BurgerIngredients from './burger-ingredients/burger-ingredients';
import BurgerConstructor from './burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function App() {
  return (
    <div className={styles.App}>
        <AppHeader/>
        <main className="pl-30 pr-30">
          <h1 className={styles.app_body_header}>Соберите бургер</h1>
          <div className={styles.app_content}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </DndProvider>
          </div>
        </main>
        <div id="modal-root" className={styles.app_modals}></div>
    </div>
  );
}

export default App;
