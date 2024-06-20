import React from 'react'
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStoreState } from "../../services/store";
import { selectIngredientById } from "../../services/selectors/ingredients";
import IngredientDetail from "../ingredient-details/ingredient-details";
import Modal from "../share/modal/modal";



const IngredientModal = () => {
    const location = useLocation()
    const { id } = useParams();
    const backgroundLocation = location.state?.backgroundLocation as Location
    const navigate = useNavigate()
    const ingredient = useSelector((state:RootStoreState) => selectIngredientById(state, id))
  
    const onIngredientModalClose = () => {
      navigate(backgroundLocation, {replace: true})
    }
  
    return (
        <Modal 
        isOpen={true} 
        onClose={onIngredientModalClose}
        header_title='Детали ингридиента'
        >
            <IngredientDetail ingredient={ingredient}/>
        </Modal>
    )
}

  export default IngredientModal