import { createCustomElement } from '../../shared/utilities/helper-functions';
import { createPageTitle } from '../../shared/utilities/title';
import { createFormDiv } from '../registration/creationform-helpers';
import { customRoute } from '../../app/router/router';


const ChangePassword = ():HTMLElement  =>{
    const container = createCustomElement('div', ['container-changepass']);

    const oldPass = createFormDiv('oldpass', 'Old password', 'old-passsword', 'text');
    const newPass = createFormDiv('newpass', 'New password', 'new-password', 'text');
    const repeatPass = createFormDiv('repeatpass', 'Repeat password', 'repeat-password', 'text');

    const btnSave = createCustomElement('button',['btn-save'],'Save') as HTMLButtonElement;;
    btnSave.addEventListener(('click'),()=>{
        customRoute('/successchangedpass');
    })
    container.append(oldPass.container, newPass.container, repeatPass.container, btnSave)

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