import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { IIngredient } from '../../../share/typing'
import styles from './burger-constructor-item.module.css'
import { useDrag, useDrop } from "react-dnd";
import { useAppDispatch, useAppSelector } from '../../../services/hooks';
import { selectIngredientTypes } from '../../../services/selectors/ingredients';
import { useRef } from 'react';
import { addCoreIngredient, setCoreIngredient, changeBun, deleteCoreIngredient } from "../../../services/slices/burger/burger"
interface IProps {
    ingredient: IIngredient | null
    type?: 'top' | 'bottom'
    drag?: Boolean
    index?: number
}

const BurgerConstructorItem: React.FC<IProps> = ({ ingredient, type, drag, index }) => {
    const dispatch = useAppDispatch()
    const types = useAppSelector(selectIngredientTypes)
    const acceptedTypes = type ? ["bun"] : types.filter( type => type !== 'bun')
    
    const ref = useRef<HTMLDivElement>(null);

    const [{isHover}, dropTarget] = useDrop({
        accept: acceptedTypes,
        drop(item:{ ingredient: IIngredient; index: number }, monitor) {
            if(item.ingredient.type === "bun"){
                dispatch(changeBun(item.ingredient))
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if(!hoverIndex && hoverIndex !== 0){
                if(type){
                    //если тип - булка
                    dispatch(changeBun(item.ingredient))
                } else {
                    //список пуст
                    dispatch(addCoreIngredient({idx: 0, ingredient: item.ingredient}))
                }
            } else {
                if (!ref.current) {
                    return;
                }
                if (dragIndex === hoverIndex) {
                    //сам над собой
                    return;
                }
                if(dragIndex || dragIndex === 0){
                    //если элемент из бургера
                    dispatch(setCoreIngredient({
                        startIdx: dragIndex, 
                        endIdx:hoverIndex
                    }))
                } else {
                    //если элемент из списка
                    dispatch(addCoreIngredient({idx: hoverIndex, ingredient: item.ingredient}))

                }
            }
        },
        collect: monitor => ({
            isHover: monitor.isOver()
        })
    });

    const [{isDragging}, dragRef] = useDrag({
        type: ingredient?.type ?? "none",
        item: {ingredient, index},
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    const handleDelete = index || index === 0 ? () => { dispatch(deleteCoreIngredient(index))} : undefined

    if(!ingredient){
        const className = (
            type === "bottom" ? styles.null_constructor_element_bottom : (
                type === "top" ?  styles.null_constructor_element_top : styles.null_constructor_element
            ) 
        )
        return <div 
            ref={dropTarget} 
            className={`${className} ${ isHover ? styles.hover : '' }`}
        >перенесите {type ? "булку":"ингредиент"} сюда</div>
    }

    if(!type){
        dragRef(dropTarget(ref));
    }

    const className = `${(
        drag ? 
        styles.burger_constructor_ingredient_allowed_drag : 
        styles.burger_constructor_ingredient
    )} ${
        isHover ? styles.hover : ''
    } ${
        isDragging ? styles.dragging : ''
    }`

    return (
        <div
            ref={type ? dropTarget : ref}
            className={className}
        >
            {drag ? <DragIcon type="primary" /> : <div />}
            {
                ingredient ? (
                    <ConstructorElement
                        text={ingredient.name}
                        type={type}
                        isLocked={ingredient.type === 'bun'}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                        handleClose={handleDelete}
                    />
                ) : (
                    <ConstructorElement
                        text={""}
                        price={0}
                        thumbnail={""}
                    />
                )
            }
        </div>
    )
}

export default BurgerConstructorItem
