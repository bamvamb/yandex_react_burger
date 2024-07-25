import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../services/hooks";
import { selectIngredientById } from "../../services/selectors/ingredients";
import IngredientDetail from "../ingredient-details/ingredient-details";
import Modal from "../share/modal/modal";

const IngredientModal = () => {
    const location = useLocation()
    const { id } = useParams();
    const backgroundLocation = location.state?.backgroundLocation as Location
    const navigate = useNavigate()
    const ingredient = useAppSelector(state => selectIngredientById(state, id))
  
    const onIngredientModalClose = () => {
      navigate(backgroundLocation, {replace: true})
    }
  
    return (
        <Modal 
        isOpen={true} 
        onClose={onIngredientModalClose}
        headerTitle='Детали ингридиента'
        >
            <IngredientDetail ingredient={ingredient}/>
        </Modal>
    )
}

  export default IngredientModal