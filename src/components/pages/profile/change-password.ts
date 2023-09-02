import { createCustomElement } from '../../shared/utilities/helper-functions';
import { createPageTitle } from '../../shared/utilities/title';
import { createFormDiv } from '../registration/creationform-helpers';
import { customRoute } from '../../app/router/router';
import { checkPassword } from '../registration/validation';
import { CheckIt, setError } from '../registration/validation-helpers';
import { StpClientApi } from '../../shared/api/stpClient-api';

const ChangePassword = ():HTMLElement  =>{
    const container = createCustomElement('div', ['container-changepass']);

    const oldPass = createFormDiv('old-passsword', 'Old password', 'password', 'old-passsword');
    const oldPasslink = createCustomElement('a',['oldpass-control']);
    oldPass.container.append(oldPasslink);
    const newPass = createFormDiv('new-password', 'New password', 'password', 'new-password');
    const newPasslink = createCustomElement('a',['newpass-control']);
    newPass.container.append(newPasslink);
    const repeatPass = createFormDiv('repeat-password', 'Repeat password', 'password', 'repeat-password');
    const repeatPasslink = createCustomElement('a',['repeatpass-control']);
    repeatPass.container.append(repeatPasslink);

    const btnSave = createCustomElement('button',['btn-save'],'Save') as HTMLButtonElement;;

    btnSave.addEventListener('click',()=>{
      const emailVal = localStorage.getItem('email');
      const oldPassValue = oldPass.input.value.trim();
      const newPassValue = newPass.input.value.trim();
      const repeatPassValue = repeatPass.input.value.trim();
      const warningsArray = document.querySelectorAll('.small-visible');
      if (warningsArray.length === 0) {
        if(newPassValue&&repeatPassValue){
            if(newPassValue===repeatPassValue){
                if(emailVal){
                    const id = localStorage.getItem('id');
                    let version: string;
                    const updatePassword = async () => {
                      if(id){
                        const customer = await new StpClientApi().getCustomerbyId(id);
                        version = String(customer.version);
                        const updatePass = new StpClientApi().updatePassword(id,version,oldPassValue,newPassValue);
                        updatePass
                        .then(async (data) => {
                          if (data.statusCode === 200) {
                            try{
                              customRoute('/successchangedpass');
                            } catch {
                              throw Error('Cannot update password');
                            }
                          }
                        })
                      }
                    }
                    updatePassword();
                  }
              } else {
                const message = 'Passwords are not the same';
                setError(newPass.input,message);
                setError(repeatPass.input,message)
              }
        } else {
            const message = 'Passwords cannot be blank';
            setError(newPass.input,message);
            setError(repeatPass.input,message)
        }
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