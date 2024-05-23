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


export const url = "https://norma.nomoreparties.space/api/ingredients"//"data.json"
export const get_ingredients = () => new Promise<Array<Ingredient>>((resolve, reject) => {
    fetch(url).then( resp => {
        const contentType = resp.headers.get("content-type");
        if(resp.ok && contentType && contentType.indexOf("application/json") !== -1){
            try {
                resp.json().then  ( _json => {
                    if(_json.success) {
                        const ingredients = _json.data
                        resolve(
                            ingredients.map( (item:Ingredient)  => ({
                                ...item,
                                type_loc_many: type_localisation[item.type]?.many,
                                type_loc_one: type_localisation[item.type]?.one,
                            } as Ingredient))
                        )
                    } else {
                        reject(_json)
                    }
                }).catch( reject )
            } catch {
                reject( resp )
            }
        } else if(resp.ok) {
            resp.text().then(text => reject( text )) 
        } else {
            reject( resp )
        }
    }).catch( reject )
})