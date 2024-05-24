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

interface TypeLocale {
    many: string,
    one: string
}

interface TypeLocales {
    [propName: string]: TypeLocale
}

export const type_localisation = {
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

const ingredient_loc = (ingredient:Ingredient) => ({
    ...ingredient,
    type_loc_many: type_localisation[ingredient.type]?.many,
    type_loc_one: type_localisation[ingredient.type]?.one,
} as Ingredient)

const get_fetch_json = async (
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

export const get_ingredients = async () => {
    try {
        const _json = await get_fetch_json(await fetch(url))
        if(_json.success){
            return _json.data.map(ingredient_loc)
        }
    } catch (err) {
        throw err
    }
}
