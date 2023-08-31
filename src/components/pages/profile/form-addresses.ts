import { BaseAddress } from '@commercetools/platform-sdk';
import { createCustomElement } from '../../shared/utilities/helper-functions';
import { createFormDiv, createFormWithOptions } from '../registration/creationform-helpers';
import { CheckIt, setError, setSuccess } from '../registration/validation-helpers';
import { checkCity, checkPost } from '../registration/validation';

export const AddressesInfo = (customerAddresses: BaseAddress[]): HTMLElement => {
    const container = createCustomElement('div', ['container-addresses']);
    const title = createCustomElement('div',['title-addresses'],'Your addresses')
    container.append(title);

    for(let i=0; i<customerAddresses.length; i+=1){
        const divForBtn = createCustomElement('div',['div-btnedit']);
        const btnEdit = createCustomElement('button',['btn-edit'], 'Edit') as HTMLButtonElement;
        divForBtn.append(btnEdit);

        const noEditCountry = createFormDiv('country', 'Country', 'country-personal', 'text');
        noEditCountry.container.classList.add('container-info');
        noEditCountry.input.classList.add('input-info');
        noEditCountry.input.setAttribute('readonly', 'readonly');
        noEditCountry.input.value = `${customerAddresses[i].country}`;

        const country =  createFormWithOptions('country', 'Country');
        country.classList.add('country-invisible');

        const postcode =  createFormDiv('postcode', 'Postal code', 'postcode-personal', 'text');
        postcode.container.classList.add('container-info');
        postcode.input.classList.add('input-info');
        postcode.input.setAttribute('readonly', 'readonly');
        postcode.input.value = `${customerAddresses[i].postalCode}`;

        const city =  createFormDiv('city', 'City', 'city-personal', 'text');
        city.container.classList.add('container-info');
        city.input.classList.add('input-info');
        city.input.setAttribute('readonly', 'readonly');
        city.input.value = `${customerAddresses[i].city}`;

        const street =  createFormDiv('street', 'Street', 'street-personal', 'text');
        street.container.classList.add('container-info');
        street.input.classList.add('input-info');
        street.input.setAttribute('readonly', 'readonly');
        street.input.value = `${customerAddresses[i].streetName}`;


        const adressLabelDiv = createCustomElement('div',['addresses-label']);
        const shippingDefault = createCustomElement('div',['shippingdefault-label'],'shipping default');
        shippingDefault.classList.add('label-invible');
        const billingDefault = createCustomElement('div',['billingdefault-label'],'billing default');
        billingDefault.classList.add('label-invible');
        const shipping = createCustomElement('div',['shipping-label'],'shipping');
        shipping.classList.add('label-invible');
        const billing = createCustomElement('div',['billing-label'],'billing');
        billing.classList.add('label-invible');
        adressLabelDiv.append(shipping,billing,shippingDefault,billingDefault);

        const btnSave = createCustomElement('button',['btn-edit'],'Save') as HTMLButtonElement;
        btnSave.classList.add('btn-invisible');

        const address = createCustomElement('div', ['container-address']);
        address.append(divForBtn, country, noEditCountry.container, postcode.container, city.container, street.container, adressLabelDiv,btnSave)

        const formField = btnEdit.parentNode;
        const countryOption = formField?.querySelector('.country');
        if(countryOption){
            countryOption.classList.add('container-info');
            countryOption.classList.add('input-info');
            countryOption.setAttribute('readonly', 'readonly');
        }

        btnEdit.addEventListener('click',()=>{
            btnSave.classList.remove('btn-invisible');
            if(countryOption){
                countryOption.removeAttribute('readonly');
                countryOption.classList.remove('input-info');
            }
            shipping.classList.add('address-invisible');
            billing.classList.add('address-invisible');
            shippingDefault.classList.add('address-invisible');
            billingDefault.classList.add('address-invisible');
            postcode.input.removeAttribute('readonly');
            city.input.removeAttribute('readonly');
            street.input.removeAttribute('readonly');
            postcode.input.classList.remove('input-info');
            city.input.classList.remove('input-info');
            street.input.classList.remove('input-info');
            noEditCountry.container.classList.add('country-invisible');
            country.classList.remove('country-invisible');
          })

          city.input.addEventListener('input', (event) => {
            const cityValue: string = (event.target as HTMLInputElement).value;
            CheckIt(checkCity(cityValue), city.input);
          });
          postcode.input.addEventListener('input', (event) => {
            const postValue: string = (event.target as HTMLInputElement).value;
            CheckIt(checkPost('USA', postValue), postcode.input);
          });
          street.input.addEventListener('input', (event) => {
            const streetValue: string = (event.target as HTMLInputElement).value;
            if (streetValue === '') {
              setError(street.input, 'Street cannot be blank');
            } else {
              setSuccess(street.input);
            }
          });

          btnSave.addEventListener('click',()=>{
            btnSave.classList.add('btn-invisible');
            city.input.setAttribute('readonly', 'readonly');
            postcode.input.setAttribute('readonly', 'readonly');
            street.input.setAttribute('readonly', 'readonly');
            city.input.classList.add('input-info');
            postcode.input.classList.add('input-info');
            street.input.classList.add('input-info');
            noEditCountry.container.classList.remove('country-invisible');
            country.classList.add('country-invisible');
          });

        container.append(address);
    }
    const btnAddAddress = createCustomElement('button',['btn-add'],'Add address') as HTMLButtonElement;


    container.append(btnAddAddress);



  return container;
}