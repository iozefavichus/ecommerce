import {
  checkName,
  checkEmail,
  checkPost,
  checkCity,
  checkSurname,
  hasSpaceInStartOrEnd,
  checkPassword,
  checkBirth,
  writeErrors,
} from '../src/components/pages/registration/validation';
import {
  createLabel,
  createFormElement,
  createFormDiv,
  createFormWithOptions,
} from '../src/components/pages/registration/creationform-helpers';

test('Check email', () => {
  expect(checkEmail('mama@gmail.com')).toEqual(true);
});

describe('When given email with quotes inside', () => {
  it('returns false', () => {
    const result = checkEmail('mamagmail.com');
    const expected = false;
    expect(result).toEqual(expected);
  });
});

test('Check postcode for USA', () => {
  expect(checkPost('USA', 'AJDHJS')).toEqual([
    'Your post code does not match USA postal codes.',
    'You need DDDDD format (where D - digit)',
  ]);
});

test('Check postcode for USA', () => {
  expect(checkPost('USA', '11111')).toEqual([]);
});

test('Check postcode when country is blank', () => {
  expect(checkPost('', 'DFGSA')).toEqual(['Please enter your country first']);
});

describe('When given blank postcode', () => {
  it('returns warnings that postcode cannot be blank', () => {
    const result = checkPost('USA', '');
    const expected = ['Post code cannot be blank'];
    expect(result).toEqual(expected);
  });
});

describe('When given blank city', () => {
  it('returns warnings that city must be at least 1 character long', () => {
    const result = checkCity('');
    const expected = ['City must be at least 1 character long'];
    expect(result).toEqual(expected);
  });
});

describe('When given blank surname', () => {
  it('returns warnings that surname must be at least 1 character long', () => {
    const result = checkSurname('');
    const expected = ['Surname must be at least 1 character long'];
    expect(result).toEqual(expected);
  });
});

describe('When given surname with numbers', () => {
  it('returns warnings that surname must not contain special characters or numbers', () => {
    const result = checkSurname('a2sdasd');
    const expected = ['Surname must not contain special characters or numbers.'];
    expect(result).toEqual(expected);
  });
});

describe('When given blank name', () => {
  it('returns warnings that name must be at least 1 character long', () => {
    const result = checkName('');
    const expected = ['Name must be at least 1 character long'];
    expect(result).toEqual(expected);
  });
});

describe('When given name with numbers', () => {
  it('returns warnings that name must not contain special characters or numbers', () => {
    const result = checkName('111asdasd');
    const expected = ['Name must not contain special characters or number.'];
    expect(result).toEqual(expected);
  });
});

describe('When given email with spaces in the end', () => {
  it('returns true if there are spaces in the end after email', () => {
    const result = hasSpaceInStartOrEnd('gaga@gmail.com  ');
    const expected = true;
    expect(result).toEqual(expected);
  });
});

describe('When given email with spaces in the beggining', () => {
  it('returns true if there are spaces in the end after email', () => {
    const result = hasSpaceInStartOrEnd('  gaga@gmail.com');
    const expected = true;
    expect(result).toEqual(expected);
  });
});

describe('When given strong password', () => {
  it('returns empty array of warnings', () => {
    const result = checkPassword('aD1122!!shs');
    const expected: Array<string> = [];
    expect(result).toEqual(expected);
  });
});

describe('When given blank password', () => {
  it('returns array of warnings', () => {
    const result = checkPassword('');
    const expected: Array<string> = [
      'Password must be at least 8 characters long',
      'Password must contain at least one uppercase letter (A-Z)',
      'Password must contain at least one lowercase letter (a-z)',
      'Password must contain at least one digit (0-9)',
      'Password must contain at least one special character (e.g., !@#$%^&*)',
    ];
    expect(result).toEqual(expected);
  });
});

describe('When given right password with leading whitespace', () => {
  it('returns array with warning that password must not contain leading whitespace', () => {
    const result = checkPassword(' 12!!aaSSaass');
    const expected: Array<string> = ['Password must not contain leading or trailing whitespace'];
    expect(result).toEqual(expected);
  });
});

describe('When given true date of birth with age more then 13 years', () => {
  it('returns true', () => {
    const result = checkBirth(' 12-12-2000');
    const expected = true;
    expect(result).toEqual(expected);
  });
});

describe('When given city with numbers', () => {
  it('returns warnings that city must not contain special characters or numbers', () => {
    const result = checkCity('111asdasd');
    const expected = ['City must not contain special characters or numbers'];
    expect(result).toEqual(expected);
  });
});

describe('When given array of warnings', () => {
  it('returns list', () => {
    const result = writeErrors(['error1']);
    const expected = true;
    expect(result.classList.contains('warnings')).toEqual(expected);
  });
});

describe('When given array of classes for label', () => {
  it('returns that it has this class', () => {
    const result = createLabel(['label'], 'name');
    const expected = true;
    expect(result.classList.contains('label')).toEqual(expected);
  });
});

describe('When given array of classes for element of form', () => {
  it('returns that it has this class', () => {
    const result = createFormElement('div', ['wrong'], 'name');
    const expected = true;
    expect(result.classList.contains('wrong')).toEqual(expected);
  });
});

describe('When create form div element', () => {
  it('returns input with type attribute', () => {
    const result = createFormDiv('labelname', 'Label text', 'input-id', 'input');
    const expected = true;
    expect(result.input.hasAttribute('type')).toEqual(expected);
  });
});

describe('When create form element with options', () => {
  it('returns that it has this class form-control', () => {
    const result = createFormWithOptions('labelname', 'Label text');
    const expected = true;
    expect(result.classList.contains('form-control')).toEqual(expected);
  });
});
