export const checkTextValue = (val:string|null, allowNullLength:boolean=true):boolean => {
    return !!val && (allowNullLength || val.length > 0)
}

export const checkEmailValue = (val:string|null):boolean => {
    if (val === null) return false;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(val);
}