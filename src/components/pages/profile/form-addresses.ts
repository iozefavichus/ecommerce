import { BaseAddress } from '@commercetools/platform-sdk';
import { createCustomElement } from '../../shared/utilities/helper-functions';
import { createFormDiv, createFormWithOptions } from '../registration/creationform-helpers';
import { CheckIt, setError, setSuccess } from '../registration/validation-helpers';
import { checkCity, checkPost } from '../registration/validation';
import { StpClientApi } from '../../shared/api/stpClient-api';
import { createRoundSwitch } from '../../shared/utilities/round-switch';
import { drawLabels } from './label';

export const AddressesInfo = (customerAddresses: BaseAddress[]): HTMLElement => {
    const container = createCustomElement('div', ['container-addresses']);
    const title = createCustomElement('div',['title-addresses'],'Your addresses')
    container.append(title);

    for(let i=0; i<customerAddresses.length; i+=1){
        const addressID = customerAddresses[i].id;
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

        const divForSwitch = createCustomElement('div',['container-switch']);
        const shipSwitch = createRoundSwitch('shipping-switch', 'shipping',`shippingswitch-input${i}`);
        const billSwitch = createRoundSwitch('billing-switch', 'billing',`billingswitch-input${i}`);
        const shipDefaultSwitch = createRoundSwitch('shippingdef-switch','shipping default',`shippingDefswitch-input${i}`);
        const billDefaultSwitch = createRoundSwitch('billingdef-switch','billing default',`billingDefswitch-input${i}`);
        divForSwitch.append(shipSwitch, shipDefaultSwitch, billSwitch, billDefaultSwitch);
        divForSwitch.classList.add('invisible');

        const Labels = createCustomElement('div',['container-labels']);
        const LabelsBoolean = async () => {
          const emailVal = localStorage.getItem('email');
          if(emailVal){
            let defaultShipping = false;
            let defaultBilling = false;
            let shipping = false;
            let billing= false;
            const customer =  await new StpClientApi().getCustomerInfoByEmail(emailVal);
            // console.log(addressID);
            // console.log(customer);
            // console.log(customer[0].shippingAddressIds);
            // console.log(customer[0].billingAddressIds);
            // console.log(customer[0].defaultBillingAddressId);
            // console.log(customer[0].defaultShippingAddressId);
            const ArrayWithShipping = customer[0].shippingAddressIds;
            const ArrayWithBilling = customer[0].billingAddressIds;
            if(addressID === customer[0].defaultShippingAddressId){
               defaultShipping = true;
               const shipDefInput = document.querySelector(`.shippingDefswitch-input${i}`);
               shipDefInput?.setAttribute('checked','checked');
            }
            if(addressID === customer[0].defaultBillingAddressId){
              defaultBilling = true;
              const billDefInput = document.querySelector(`.billingDefswitch-input${i}`);
              billDefInput?.setAttribute('checked','checked');
           }
           if(addressID&&customer[0].shippingAddressIds&& ArrayWithShipping?.includes(addressID)){
              shipping = true;
              const shipInput = document.querySelector(`.shippingswitch-input${i}`);
              shipInput?.setAttribute('checked','checked');

           }
           if(addressID&&customer[0].billingAddressIds&&ArrayWithBilling?.includes(addressID)){
              billing = true;
              const billInput = document.querySelector(`.billingswitch-input${i}`);
              billInput?.setAttribute('checked','checked');
           }
           Labels.append(drawLabels(shipping, billing, defaultShipping, defaultBilling));
        }}
        LabelsBoolean();


        const btnDiv = createCustomElement('div',['div-btn']);
        const btnSave = createCustomElement('button',['btn-saveadd'],'Save changes') as HTMLButtonElement;
        btnSave.classList.add('btn-invisible');
        const btnDelete = createCustomElement('button',['btn-delete'],'Delete address') as HTMLButtonElement;
        btnDelete.classList.add('btn-invisible');
        btnDiv.append(btnSave, btnDelete);

        const address = createCustomElement('div', ['container-address']);
        address.append(divForBtn, country, noEditCountry.container, postcode.container, city.container, street.container, Labels, divForSwitch ,btnDiv)

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
            Labels.classList.add('invisible');
            divForSwitch.classList.remove('invisible');

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
                          Labels.classList.remove('invisible');
                          divForSwitch.classList.add('invisible');
                        } catch {
                          throw Error('Cannot update address');
                        }
                      }
                    })
                   }
                   const shipDefInput = document.querySelector(`.shippingDefswitch-input${i}`);
                   const shipDefInputBoolean = shipDefInput?.hasAttribute('checked');
                   if(addressID&&shipDefInputBoolean){
                    const setDefaultShipping = new StpClientApi().setDefaultShipping(id,version,addressID);
                    setDefaultShipping
                    .then(async (data) => {
                      if (data.statusCode === 200) {
                        try {
                          divForSwitch.classList.add('invisible');
                        } catch {
                          throw Error('Cannot update address');
                        }
                      }
                    })
                   }
                   const billDefInput = document.querySelector(`.billingDefswitch-input${i}`);
                   const billDefInputBoolean = billDefInput?.hasAttribute('checked');
                   if(addressID&&billDefInputBoolean){
                    const setDefaultBilling = new StpClientApi().setDefaultBilling(id,version,addressID);
                    setDefaultBilling
                    .then(async (data) => {
                      if (data.statusCode === 200) {
                        try {
                          divForSwitch.classList.add('invisible');
                        } catch {
                          throw Error('Cannot update address');
                        }
                      }
                    })
                   }
                   const shipInput = document.querySelector(`.shippingswitch-input${i}`);
                   const shipInputBoolean = shipInput?.hasAttribute('checked');
                   if(addressID&&shipInputBoolean){
                    const setShipping = new StpClientApi().addShipping(id,version,addressID);
                    setShipping
                    .then(async (data) => {
                      if (data.statusCode === 200) {
                        try {
                          divForSwitch.classList.add('invisible');
                        } catch {
                          throw Error('Cannot update address');
                        }
                      } else {
                        const removeShipping = new StpClientApi().removeShipping(id, version, addressID);
                        removeShipping
                        .then(async (data) => {
                          if (data.statusCode === 200) {
                            try {
                              divForSwitch.classList.add('invisible');
                            } catch {
                              throw Error('Cannot update address');
                            }
                      }
                    })
                   }
                })
              }
              const billInput = document.querySelector(`.billingswitch-input${i}`);
                   const billInputBoolean = billInput?.hasAttribute('checked');
                   if(addressID&&billInputBoolean){
                    const setBilling = new StpClientApi().addBilling(id,version,addressID);
                    setBilling
                    .then(async (data) => {
                      if (data.statusCode === 200) {
                        try {
                          divForSwitch.classList.add('invisible');
                        } catch {
                          throw Error('Cannot update address');
                        }
                      } else {
                        const removeBilling = new StpClientApi().removeBilling(id, version, addressID);
                        removeBilling
                        .then(async (data) => {
                          if (data.statusCode === 200) {
                            try {
                              divForSwitch.classList.add('invisible');
                            } catch {
                              throw Error('Cannot update address');
                            }
                      }
                    })
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

    const divForSwitchNew = createCustomElement('div',['container-switch']);
    const shipSwitch = createRoundSwitch('shipping-switch', 'shipping',`shippingswitch-new`);
    const billSwitch = createRoundSwitch('billing-switch', 'billing',`billingswitch-new`);
    const shipDefaultSwitch = createRoundSwitch('shippingdef-switch','shipping default',`shippingDefswitch-new`);
    const billDefaultSwitch = createRoundSwitch('billingdef-switch','billing default',`billingDefswitch-new`);
    divForSwitchNew.append(shipSwitch, shipDefaultSwitch, billSwitch, billDefaultSwitch);

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
      if(newAdd.city&&newAdd.streetName&&newAdd.postalCode){
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
      if(!newAdd.city){
        setError(cityNew.input, 'Cannot be blank')
      }
      if(!newAdd.streetName){
        setError(streetNew.input, 'Cannot be blank')
      }
      if(!newAdd.postalCode){
        setError(postcodeNew.input, 'Cannot be blank')
      }
      }
  )

    newAddress.append(countryNew, postcodeNew.container, cityNew.container, streetNew.container,divForSwitchNew, btnSaveNew);

    btnAddAddress.addEventListener('click',() => {
      btnAddAddress.classList.add('btnAadd-invisible');
      newAddress.classList.remove('newaddress-invisible');
    });

    container.append(btnAddAddress, newAddress);



  return container;
}