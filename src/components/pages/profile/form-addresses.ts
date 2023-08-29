import { BaseAddress } from '@commercetools/platform-sdk';
import { createCustomElement } from '../../shared/utilities/helper-functions';
// import { createFormDiv } from '../registration/creationform-helpers';


const addressField = (country: string, city: string|undefined, street: string|undefined, postcode: string|undefined, firstName: string|undefined, surname: string|undefined, isShipping?: boolean, isBilling?: boolean, defaultShipping?: boolean, defaultBilling?: boolean ) =>{
    const container = createCustomElement('div', ['container-add']);
    const btnEdit = createCustomElement('button',['btn-edit'], 'Edit') as HTMLButtonElement;
    const firstRow = createCustomElement('div',[],`${country}, ${postcode}`);
    const secondRow = createCustomElement('div',[],`${city}, ${street}`);
    const thirdRow = createCustomElement('div',[],`${firstName}, ${surname}`);
    const shippingDefault = createCustomElement('div',[],'shipping default');
    const billingDefault = createCustomElement('div',[],'billing default');
    const shipping = createCustomElement('div',['shipping-label'],'shipping');
    const billing = createCustomElement('div',['billing-label'],'billing');
    const btnSave = createCustomElement('button',['btn-edit'],'Save') as HTMLButtonElement;

    if(isShipping){
        shipping.classList.add('shipping-visible');
    }
    if(isBilling){
        billing.classList.add('billing-visible');
    }
    if(defaultBilling){
        shippingDefault.classList.add('shipping-visible');
    }
    if(defaultShipping){
        billingDefault.classList.add('billing-visible');
    }
    container.append(btnEdit, firstRow, secondRow, thirdRow,shippingDefault, billingDefault, shipping, billing, btnSave)
    return container;
}

export const AddressesInfo = (customerAddresses: BaseAddress[]): HTMLElement => {
    const container = createCustomElement('div', ['container-addresses']);
    for(let i=0; i<customerAddresses.length; i+=1){
        const address = addressField(customerAddresses[i].country, customerAddresses[i].postalCode, customerAddresses[i].city,customerAddresses[i].streetName, customerAddresses[i].firstName, customerAddresses[i].lastName);
        container.append(address);
    }

  return container;
}