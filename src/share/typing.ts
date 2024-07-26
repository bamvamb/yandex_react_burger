export interface IResponse {
    success: boolean
}

export interface IErrorResponse {
    success: boolean,
    message: string
}

export interface IIngredient {
    _id: string,
    name: string,
    type: string,
    type_loc_many?: string,
    type_loc_one?: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    description?: string
    __v: number
}

export type ISODateString = string
export const isISODateString = (dateString: string): dateString is ISODateString => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(dateString)


export interface ConstructorIngredient extends IIngredient {
    uid: string
}

interface ITypeLocale {
    many: string,
    one: string
}

interface ITypeLocales {
    [propName: string]: ITypeLocale
}

export const typeLocalisation = {
    "bun": {
        many: "Булки",
        one: "Булка"
    },
    "main": {
        many: "Начинки",
        one: "Начинка"
    },
    "sauce": {
        many: "Соусы",
        one: "Соус"
    }
} as ITypeLocales

export const ingredientLoc = (ingredient:IIngredient) => ({
    ...ingredient,
    type_loc_many: typeLocalisation[ingredient.type]?.many,
    type_loc_one: typeLocalisation[ingredient.type]?.one,
} as IIngredient)
