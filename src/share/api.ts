export interface DataFrame {
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
    __v: number
}

interface TypeLocale {
    many: string,
    one: string
}

interface TypeLocales {
    [propName: string]: TypeLocale
}

export const type_localisation = <TypeLocales>{
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
}


export const url = "data.json"
export const get_data = () => new Promise<Array<DataFrame>>((resolve, reject) => {


    fetch(url).then( resp => {
        resp.json().then  ( data => {
        resolve(
            data.map( (item:DataFrame)  => <DataFrame>{
                ...item,
                type_loc_many: type_localisation[item.type]?.many,
                type_loc_one: type_localisation[item.type]?.one,
            })
        )
        }).catch( reject )
    }).catch( reject )
})