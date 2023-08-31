import { createCustomElement } from '../../shared/utilities/helper-functions';
import { createPageTitle } from '../../shared/utilities/title';
import { createFormDiv } from '../registration/creationform-helpers';
import { customRoute } from '../../app/router/router';
import { checkPassword } from '../registration/validation';
import { CheckIt } from '../registration/validation-helpers';


const ChangePassword = ():HTMLElement  =>{
    const container = createCustomElement('div', ['container-changepass']);

    const oldPass = createFormDiv('oldpass', 'Old password', 'old-passsword', 'password');
    const oldPasslink = createCustomElement('a',['oldpass-control']);
    oldPass.container.append(oldPasslink);
    const newPass = createFormDiv('newpass', 'New password', 'new-password', 'password');
    const newPasslink = createCustomElement('a',['newpass-control']);
    newPass.container.append(newPasslink);
    const repeatPass = createFormDiv('repeatpass', 'Repeat password', 'repeat-password', 'password');
    const repeatPasslink = createCustomElement('a',['repeatpass-control']);
    repeatPass.container.append(repeatPasslink);

    const btnSave = createCustomElement('button',['btn-save'],'Save') as HTMLButtonElement;;
    btnSave.addEventListener(('click'),()=>{
        customRoute('/successchangedpass');
    })
    container.append(oldPass.container, newPass.container, repeatPass.container, btnSave)

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