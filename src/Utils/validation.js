export const verifyEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email)
}

export const VerifyPhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]+$/;
    return phoneRegex.test(phone)
}

export const VerifyPhoneNumberLength = (phone) => {
    return (String(phone).length == 10 || String(phone) == 9) ? true : false;
}