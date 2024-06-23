export interface Ingredient {
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

export interface ConstructorIngredient extends Ingredient {
    uid: string
}

interface TypeLocale {
    many: string,
    one: string
}

interface TypeLocales {
    [propName: string]: TypeLocale
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
} as TypeLocales

export const ingredientLoc = (ingredient:Ingredient) => ({
    ...ingredient,
    type_loc_many: typeLocalisation[ingredient.type]?.many,
    type_loc_one: typeLocalisation[ingredient.type]?.one,
} as Ingredient)

const getFetchJson = async (
    resp: Response
) => {
    const contentType = resp.headers.get("content-type");
    if(resp.ok && contentType && contentType.indexOf("application/json") !== -1){
        try {
            return await resp.json()
        } catch (error) {
            throw error
        }
    } else if(resp.ok) {
        throw await resp.text()
    } else {
        throw resp
    }
}

const url = "https://norma.nomoreparties.space/api/ingredients"

export const getIngredients = async () => {
    try {
        const _json = await getFetchJson(await fetch(url))
        if(_json.success){
            return _json.data.map(ingredientLoc)
        }
    } catch (err) {
        throw err
    }
}
