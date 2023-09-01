import { createCustomElement } from '../../shared/utilities/helper-functions';
import { createPageTitle } from '../../shared/utilities/title';
import { createFormDiv } from '../registration/creationform-helpers';
import { customRoute } from '../../app/router/router';
import { checkPassword } from '../registration/validation';
import { CheckIt, setError } from '../registration/validation-helpers';


const ChangePassword = ():HTMLElement  =>{
    const container = createCustomElement('div', ['container-changepass']);

    const oldPass = createFormDiv('oldpass', 'Old password', 'password', 'old-passsword');
    const oldPasslink = createCustomElement('a',['oldpass-control']);
    oldPass.container.append(oldPasslink);
    const newPass = createFormDiv('newpass', 'New password', 'password', 'new-password');
    const newPasslink = createCustomElement('a',['newpass-control']);
    newPass.container.append(newPasslink);
    const repeatPass = createFormDiv('repeatpass', 'Repeat password', 'password', 'repeat-password');
    const repeatPasslink = createCustomElement('a',['repeatpass-control']);
    repeatPass.container.append(repeatPasslink);

    const btnSave = createCustomElement('button',['btn-save'],'Save') as HTMLButtonElement;;
    btnSave.addEventListener(('click'),()=>{
        if(newPass.input.value.trim()===repeatPass.input.value.trim()){
            customRoute('/successchangedpass');
        } else {
            setError(newPass.input,'Passwords are not similar');
            setError(repeatPass.input,'Passwords are not similar')
        }
    })

    const btnCancel = createCustomElement('button',['btn-cancel'],'Cancel') as HTMLButtonElement;
    btnCancel.addEventListener('click', () => {
        customRoute('/profile');
    })
    container.append(oldPass.container, newPass.container, repeatPass.container, btnSave, btnCancel)

    oldPass.input.addEventListener('input', (event) => {
        const password: string = (event.target as HTMLInputElement).value;
        CheckIt(checkPassword(password), oldPass.input);
      });
    newPass.input.addEventListener('input', (event) => {
        const password: string = (event.target as HTMLInputElement).value;
        CheckIt(checkPassword(password), newPass.input);
      });
    repeatPass.input.addEventListener('input', (event) => {
        const password: string = (event.target as HTMLInputElement).value;
        CheckIt(checkPassword(password), repeatPass.input);
      });

    newPasslink.addEventListener('click',()=>{
        if(newPasslink.classList.contains('newpass-control')){
            newPasslink.classList.remove('newpass-control');
            newPasslink.classList.add('view-control');
            newPass.input.type = 'text';
        } else {
            newPasslink.classList.add('newpass-control');
            newPasslink.classList.remove('view-control');
            newPass.input.type = 'password';
        }
    })


    return container;
}

export const drawChangePassword = async () => {
    const mainWrapper = document.querySelector('.main__wrapper') as HTMLElement;
    mainWrapper.innerHTML = '';
    const wrapper = createCustomElement('div', ['wrapper']);
    mainWrapper?.append(wrapper);
    const pageTitle = createPageTitle('Change password');
    wrapper.append(pageTitle);
    const changePass = ChangePassword();
    wrapper.append(changePass);
}