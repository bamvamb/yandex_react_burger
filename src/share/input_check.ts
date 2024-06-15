export const check_text_value = (val:string|null, allow_null_length:boolean=true) => {
    return !!val && (allow_null_length || val.length > 0)
}

export const check_email_value = (val:string|null) => {
    if (val === null) return false;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(val);
}