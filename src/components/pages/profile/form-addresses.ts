import { BaseAddress } from '@commercetools/platform-sdk';
import { createCustomElement } from '../../shared/utilities/helper-functions';
import { createFormDiv, createFormWithOptions } from '../registration/creationform-helpers';
import { CheckIt, setError, setSuccess } from '../registration/validation-helpers';
import { checkCity, checkPost } from '../registration/validation';
import { StpClientApi } from '../../shared/api/stpClient-api';

export const AddressesInfo = (customerAddresses: BaseAddress[]): HTMLElement => {
    const container = createCustomElement('div', ['container-addresses']);
    const title = createCustomElement('div',['title-addresses'],'Your addresses')
    container.append(title);

    for(let i=0; i<customerAddresses.length; i+=1){
        const addressID = customerAddresses[i].id;
        // const arrShippingAdd = 
        // const shippingTrue = () =>{

        // };
        const divForBtn = createCustomElement('div',['div-btnedit']);
        const btnEdit = createCustomElement('button',['btn-edit'], 'Edit') as HTMLButtonElement;
        divForBtn.append(btnEdit);

        const noEditCountry = createFormDiv(`country-personal-${i}`, 'Country', 'text', `country-personal-${i}`);
        noEditCountry.container.classList.add('container-info');
        noEditCountry.input.classList.add('input-info');
        noEditCountry.input.setAttribute('readonly', 'readonly');
        noEditCountry.input.value = `${customerAddresses[i].country}`;

        const country =  createFormWithOptions(`country${i}`, 'Country');
        country.classList.add('country-invisible');

        const postcode =  createFormDiv(`postcode-personal-${i}`, 'Postal code', 'text', `postcode-personal-${i}`);
        postcode.container.classList.add('container-info');
        postcode.input.classList.add('input-info');
        postcode.input.setAttribute('readonly', 'readonly');
        postcode.input.value = `${customerAddresses[i].postalCode}`;

        const city =  createFormDiv(`city-personal-${i}`, 'City', 'text', `city-personal-${i}`);
        city.container.classList.add('container-info');
        city.input.classList.add('input-info');
        city.input.setAttribute('readonly', 'readonly');
        city.input.value = `${customerAddresses[i].city}`;

        const street =  createFormDiv(`street-personal-${i}`, 'Street', 'text', `street-personal-${i}`);
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

        const btnDiv = createCustomElement('div',['div-btn']);
        const btnSave = createCustomElement('button',['btn-saveadd'],'Save changes') as HTMLButtonElement;
        btnSave.classList.add('btn-invisible');
        const btnDelete = createCustomElement('button',['btn-delete'],'Delete address') as HTMLButtonElement;
        btnDelete.classList.add('btn-invisible');
        btnDiv.append(btnSave, btnDelete);

        const address = createCustomElement('div', ['container-address']);
        address.append(divForBtn, country, noEditCountry.container, postcode.container, city.container, street.container, adressLabelDiv,btnDiv)

        const formField = btnEdit.parentNode;
        const countryOption = formField?.querySelector('.country');
        if(countryOption){
            countryOption.classList.add('container-info');
            countryOption.classList.add('input-info');
            countryOption.setAttribute('readonly', 'readonly');
        }

        btnEdit.addEventListener('click',()=>{
            btnSave.classList.remove('btn-invisible');
            btnDelete.classList.remove('btn-invisible');
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
            const warningsArray = document.querySelectorAll('.small-visible');
            const UpdAddress = {
              'country':'US',
              'postalCode': postcode.input.value.trim(),
              'city': city.input.value.trim(),
              'streetName': street.input.value.trim(),
            }
            if (warningsArray.length === 0) {
              const id = localStorage.getItem('id');
              let version: string;
              const updateCus = async () => {
                if(id){
                  const customer = await new StpClientApi().getCustomerbyId(id);
                  version = String(customer.version);
                  if(id&&addressID){
                    const updateAdd = new StpClientApi().changeAddress(id, version, addressID, UpdAddress);
                    updateAdd
                    .then(async (data) => {
                      if (data.statusCode === 200) {
                        try {
                          btnSave.classList.add('btn-invisible');
                          btnDelete.classList.add('btn-invisible');
                          city.input.setAttribute('readonly', 'readonly');
                          postcode.input.setAttribute('readonly', 'readonly');
                          street.input.setAttribute('readonly', 'readonly');
                          city.input.classList.add('input-info');
                          postcode.input.classList.add('input-info');
                          street.input.classList.add('input-info');
                          noEditCountry.container.classList.remove('country-invisible');
                          country.classList.add('country-invisible');
                          shipping.classList.remove('address-invisible');
                          billing.classList.remove('address-invisible');
                          shippingDefault.classList.remove('address-invisible');
                          billingDefault.classList.remove('address-invisible');
                        } catch {
                          throw Error('Cannot update address');
                        }
                      }
                    })
                   }
                }
              }
              updateCus();
            }
          });

          btnDelete.addEventListener('click',()=>{
            const emailVal = localStorage.getItem('email');
            if(emailVal){
              const id = localStorage.getItem('id');
              let version: string;
              const updateCus = async () => {
                if(id){
                  const customer = await new StpClientApi().getCustomerbyId(id);
                  version = String(customer.version);
                  if(id&&addressID){
                    const deleteAdd = new StpClientApi().deleteAddress(id, version, addressID);
                    deleteAdd
                    .then(async (data) => {
                      if (data.statusCode === 200) {
                        try {
                          address.classList.add('invisible');
                          btnSave.classList.add('btn-invisible');
                          btnDelete.classList.add('btn-invisible');
                        } catch {
                          throw Error('Cannot delete address');
                        }
                      }
                    })
                   }
                }
              }
              updateCus();

            }
          })

        container.append(address);
    }


    const btnAddAddress = createCustomElement('button',['btn-add'],'Add address') as HTMLButtonElement;

    const newAddress = createCustomElement('div',['container-newaddress']);
    newAddress.classList.add('newaddress-invisible');
    const countryNew =  createFormWithOptions('country', 'Country');
    const postcodeNew =  createFormDiv('newpostcode', 'Postal code', 'text','newpostcode');
    const cityNew =  createFormDiv('newcity', 'City', 'text','newcity');
    const streetNew =  createFormDiv('newstreet', 'Street', 'text', 'newstreet');
    const btnSaveNew = createCustomElement('button',['btn-save'],'Save changes') as HTMLButtonElement;

    cityNew.input.addEventListener('input', (event) => {
      const cityValue: string = (event.target as HTMLInputElement).value;
      CheckIt(checkCity(cityValue), cityNew.input);
    });
    postcodeNew.input.addEventListener('input', (event) => {
      const postValue: string = (event.target as HTMLInputElement).value;
      CheckIt(checkPost('USA', postValue), postcodeNew.input);
    });
    streetNew.input.addEventListener('input', (event) => {
      const streetValue: string = (event.target as HTMLInputElement).value;
      if (streetValue === '') {
        setError(streetNew.input, 'Street cannot be blank');
      } else {
        setSuccess(streetNew.input);
      }
    });

    btnSaveNew.addEventListener('click',()=>{
      const newAdd ={
        country: 'US',
        city: cityNew.input.value.trim(),
        streetName: streetNew.input.value.trim(),
        postalCode: postcodeNew.input.value.trim(),
      }
      const warningsArray = document.querySelectorAll('.small-visible');
      let id: string|null;
      let version: string;
      if (warningsArray.length === 0) {
        id = localStorage.getItem('id');
        const addNew = async () => {
          if(id){
            const customer = await new StpClientApi().getCustomerbyId(id);
            version = String(customer.version);
          }
          if(id&&version){
            const newAddressInfo = new StpClientApi().addAddress(id, version, newAdd);
            newAddressInfo
              .then(async (data) => {
                if (data.statusCode === 200) {
                  try {
                    newAddress.classList.add('newaddress-invisible');
                    btnAddAddress.classList.remove('btnAadd-invisible');
                    cityNew.input.value ='';
                    streetNew.input.value='';
                    postcodeNew.input.value='';
                  } catch {
                    throw Error('Cannot add new address');
                  }
              }
          })
          }
        }
      addNew();
      }
      }
  )

    newAddress.append(countryNew, postcodeNew.container, cityNew.container, streetNew.container, btnSaveNew);

    btnAddAddress.addEventListener('click',()=>{
      btnAddAddress.classList.add('btnAadd-invisible');
      newAddress.classList.remove('newaddress-invisible');
    });

    container.append(btnAddAddress, newAddress);



  return container;
}