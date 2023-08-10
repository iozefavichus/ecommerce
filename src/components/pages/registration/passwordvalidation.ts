const regUppercase = /^(?=.*[A-Z])/;
const regLowercase = /^(?=.*[a-z])/;
const regNumbers = /^(?=.*[0-9])/;
const regSpecial = /^(?=.*[!@#$%^&*])/;
const regSpace = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{5,})/;

export const checkPassword = (value: string):string => {
    const result: Array<string> = [];
    if (value.length < 8){
        result.push('Password must be at least 8 characters long');
    }
    if(!regUppercase.test(value)){
        result.push('Password must contain at least one uppercase letter (A-Z)');
    }
    if(!regLowercase.test(value)){
        result.push('Password must contain at least one lowercase letter (a-z)');
    }
    if(!regNumbers.test(value)){
        result.push('Password must contain at least one digit (0-9)');
    }
    if(!regSpecial.test(value)){
        result.push('Password must contain at least one special character (e.g., !@#$%^&*)');
    }
    if(!regSpace.test(value)){
        result.push('Password must not contain leading or trailing whitespace');
    }
    return result.join('\n');
}