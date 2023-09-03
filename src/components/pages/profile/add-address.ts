import { createCustomElement } from "../../shared/utilities/helper-functions";
import { createFormWithOptions,createFormDiv } from "../registration/creationform-helpers";
import { createRoundSwitch } from "../../shared/utilities/round-switch";
import { CheckIt, setError, setSuccess } from "../registration/validation-helpers";
import { StpClientApi } from "../../shared/api/stpClient-api";
import { checkCity,checkPost } from "../registration/validation";
import { customRoute } from "../../app/router/router";

export const AddNewAddress =(): HTMLElement=>{
    const divForAddress =createCustomElement('div',['container-newaddress']);
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

    const shippingSwitch = shipSwitch.querySelector(`.shippingswitch-new`);
    shippingSwitch?.removeAttribute('disabled');
    const billingSwitch = billSwitch.querySelector(`.billingswitch-new`);
    billingSwitch?.removeAttribute('disabled');
    const shippingDefaultSwitch = shipDefaultSwitch.querySelector(`.shippingDefswitch-new`);
    shippingDefaultSwitch?.removeAttribute('disabled');
    const billingDefaultSwitch = billDefaultSwitch.querySelector(`.billingDefswitch-new`);
    billingDefaultSwitch?.removeAttribute('disabled');

    const btnSaveNew = createCustomElement('button',['btn-save'],'Save changes') as HTMLButtonElement;
    const btnCancel = createCustomElement('button',['btn-cancel'],'Cancel') as HTMLButtonElement;

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

    btnCancel.addEventListener('click',()=>{
        newAddress.classList.add('newaddress-invisible');
        btnAddAddress.classList.remove('btnAadd-invisible');
        cityNew.input.value ='';
        streetNew.input.value='';
        postcodeNew.input.value='';
    })

    btnSaveNew.addEventListener('click',()=>{
      const newAdd ={
        country: 'US',
        city: cityNew.input.value.trim(),
        streetName: streetNew.input.value.trim(),
        postalCode: postcodeNew.input.value.trim(),
      }
      const warningsArray = document.querySelectorAll('.small-visible');
      let version: string;
      const id = localStorage.getItem('id');

      if(newAdd.city&&newAdd.streetName&&newAdd.postalCode){
        if (warningsArray.length === 0) {

          const addNew = async () => {
            if(id&&version){
              const customer = await new StpClientApi().getCustomerbyId(id);
              version = String(customer.version);
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
                      customRoute('/successupdate');
                    } catch {
                      throw Error('Cannot add new address');
                    }
                }
            })
            }
          }
        addNew();

        const addShipping = async () => {
          let addressID;
          if(id){
            const customer = await new StpClientApi().getCustomerbyId(id);
            version = String(customer.version);
            const len = customer.addresses.length;
            addressID = customer.addresses[len-1].id;
          }
          if(addressID&&id&&version){
            const shipInput = shipSwitch.querySelector(`.shippingswitch-new`);
            const shipInputBoolean = shipInput?.hasAttribute('checked');
            if(shipInputBoolean){
              const customer = await new StpClientApi().getCustomerbyId(id);
              version = String(customer.version);
              const setShipping = new StpClientApi().addShipping(id,version,String(addressID));
              setShipping
              .then(async (data) => {
                    if (data.statusCode === 200) {
                      try {
                        // divForSwitch.classList.add('invisible');
                      } catch {
                        throw Error('Cannot update address');
                      }
                    }
              })
                }
          }
        }
        const addBilliing = async () => {
          let addressID;
          if(id){
            const customer = await new StpClientApi().getCustomerbyId(id);
            version = String(customer.version);
            const len = customer.addresses.length;
            addressID = customer.addresses[len-1].id;
          }
          if(addressID&&id&&version){
            const billInput = billSwitch.querySelector(`.billingswitch-new`);
            const billInputBoolean = billInput?.hasAttribute('checked');
            if(billInputBoolean){
              const customer = await new StpClientApi().getCustomerbyId(id);
              version = String(customer.version);
              const setBilling= new StpClientApi().addBilling(id,version,String(addressID));
              setBilling
              .then(async (data) => {
                    if (data.statusCode === 200) {
                      try {
                        // divForSwitch.classList.add('invisible');
                      } catch {
                        throw Error('Cannot update address');
                      }
                    }
              })
                }
          }
        }
        const addDefaultShipping = async () => {
          let addressID;
          if(id){
            const customer = await new StpClientApi().getCustomerbyId(id);
            version = String(customer.version);
            const len = customer.addresses.length;
            addressID = customer.addresses[len-1].id;
          }
          if(addressID&&id&&version){
            const shipDefInput = shipDefaultSwitch.querySelector(`.shippingDefswitch-new`);
            const shipDefInputBoolean = shipDefInput?.hasAttribute('checked');
            if(shipDefInputBoolean){
              const customer = await new StpClientApi().getCustomerbyId(id);
              version = String(customer.version);
              const setDefaultShipping = new StpClientApi().setDefaultShipping(id, version, addressID);
              setDefaultShipping
              .then(async (data) => {
                    if (data.statusCode === 200) {
                      try {
                        // divForSwitch.classList.add('invisible');
                      } catch {
                        throw Error('Cannot update address');
                      }
                    }
              })
                }
          }
        }
        const addDefualtBilliing = async () => {
          let addressID;
          if(id){
            const customer = await new StpClientApi().getCustomerbyId(id);
            version = String(customer.version);
            const len = customer.addresses.length;
            addressID = customer.addresses[len-1].id;
          }
          if(addressID&&id&&version){
            const billDefaultInput = billDefaultSwitch.querySelector(`.billingDefswitch-new`);
            const billDefaultInputBoolean = billDefaultInput?.hasAttribute('checked');
            // console.log(billDefaultInputBoolean );
            if(billDefaultInputBoolean){
              const customer = await new StpClientApi().getCustomerbyId(id);
              version = String(customer.version);
              const setDefaultBilling= new StpClientApi().setDefaultBilling(id,version,String(addressID));
              setDefaultBilling
              .then(async (data) => {
                    if (data.statusCode === 200) {
                      try {
                        // divForSwitch.classList.add('invisible');
                      } catch {
                        throw Error('Cannot update address');
                      }
                    }
              })
                }
          }
        }
        addShipping();
        addBilliing();
        addDefaultShipping();
        addDefualtBilliing();
        customRoute('/successupdate');
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

    newAddress.append(countryNew, postcodeNew.container, cityNew.container, streetNew.container,divForSwitchNew, btnSaveNew, btnCancel);

        btnAddAddress.addEventListener('click',() => {
            btnAddAddress.classList.add('btnAadd-invisible');
            newAddress.classList.remove('newaddress-invisible');
          });

    divForAddress.append(btnAddAddress,newAddress);
    return divForAddress;
}
