import styles from './index.module.css';
import BurgerIngredients from '../../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function HomePage() {
  return (
        <>
            <h1 className={styles.body_header}>Соберите бургер</h1>
            <div className={styles.content}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </DndProvider>
            </div>
        </>
  );
}

export default HomePage;
