import { IIngredient, ConstructorIngredient } from "../../../share/typing"

export interface IBurgerState {
    bun: IIngredient|null,
    core: ConstructorIngredient[]
}
  