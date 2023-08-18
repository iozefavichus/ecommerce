import { checkEmail, checkPost, checkCity, checkSurname} from "./validation";

test('Check email', () => {
    expect(checkEmail('mama@gmail.com')).toEqual(true);
})

describe('When given email with quotes inside',()=>{
    it('returns false',() =>{
        const result = checkEmail('mama@g"""mail.com');
        const expected = false;
        expect(result).toEqual(expected);
    })
})

test('Check postcode for USA', () => {
    expect(checkPost('USA','AJDHJS')).toEqual(['Your post code does not match USA postal codes.','You need DDDDD format (where D - digit)']);
})

test('Check postcode when country is blank', () => {
    expect(checkPost('','DFGSA')).toEqual(['Please enter your country first']);
})

describe('When given blank postcode',()=>{
    it('returns warnings that postcode cannot be blank',() =>{
        const result = checkPost('USA','');
        const expected = ['Post code cannot be blank'];
        expect(result).toEqual(expected);
    })
})

describe('When given blank city',()=>{
    it('returns warnings that city must be at least 1 character long',() =>{
        const result = checkCity('');
        const expected = ['City must be at least 1 character long'];
        expect(result).toEqual(expected);
    })
})

describe('When given blank surname',()=>{
    it('returns warnings that surname must be at least 1 character long',() =>{
        const result = checkSurname('');
        const expected = ['Surname must be at least 1 character long'];
        expect(result).toEqual(expected);
    })
})