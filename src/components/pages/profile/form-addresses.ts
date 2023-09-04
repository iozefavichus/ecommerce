import { BaseAddress } from '@commercetools/platform-sdk';
import { createCustomElement } from '../../shared/utilities/helper-functions';
import { createFormDiv, createFormWithOptions } from '../registration/creationform-helpers';
import { CheckIt, setError, setSuccess } from '../registration/validation-helpers';
import { checkCity, checkPost } from '../registration/validation';
import { StpClientApi } from '../../shared/api/stpClient-api';
import { createRoundSwitch } from '../../shared/utilities/round-switch';
import { LabelsBoolean } from './label';
import { AddNewAddress } from './add-address';
import { customRoute } from '../../app/router/router';

export const AddressesInfo = (customerAddresses: BaseAddress[]): HTMLElement => {
  const container = createCustomElement('div', ['container-addresses']);
  const title = createCustomElement('div', ['title-addresses'], 'Your addresses');
  container.append(title);

  for (let i = 0; i < customerAddresses.length; i += 1) {
    const addressID = customerAddresses[i].id;
    const divForBtn = createCustomElement('div', ['div-btnedit']);
    const btnEdit = createCustomElement('button', ['btn-edit'], 'Edit') as HTMLButtonElement;
    divForBtn.append(btnEdit);

    const noEditCountry = createFormDiv(`country-personal-${i}`, 'Country', 'text', `country-personal-${i}`);
    noEditCountry.container.classList.add('container-info');
    noEditCountry.input.classList.add('input-info');
    noEditCountry.input.setAttribute('readonly', 'readonly');
    noEditCountry.input.value = `${customerAddresses[i].country}`;

    const country = createFormWithOptions(`country${i}`, 'Country');
    country.classList.add('country-invisible');

    const postcode = createFormDiv(`postcode-personal-${i}`, 'Postal code', 'text', `postcode-personal-${i}`);
    postcode.container.classList.add('container-info');
    postcode.input.classList.add('input-info');
    postcode.input.setAttribute('readonly', 'readonly');
    postcode.input.value = `${customerAddresses[i].postalCode}`;

    const city = createFormDiv(`city-personal-${i}`, 'City', 'text', `city-personal-${i}`);
    city.container.classList.add('container-info');
    city.input.classList.add('input-info');
    city.input.setAttribute('readonly', 'readonly');
    city.input.value = `${customerAddresses[i].city}`;

    const street = createFormDiv(`street-personal-${i}`, 'Street', 'text', `street-personal-${i}`);
    street.container.classList.add('container-info');
    street.input.classList.add('input-info');
    street.input.setAttribute('readonly', 'readonly');
    street.input.value = `${customerAddresses[i].streetName}`;

    const divForSwitch = createCustomElement('div', ['container-switch']);
    const shipSwitch = createRoundSwitch('shipping-switch', 'shipping', `shippingswitch-input${i}`);
    const billSwitch = createRoundSwitch('billing-switch', 'billing', `billingswitch-input${i}`);
    const shipDefaultSwitch = createRoundSwitch(
      'shippingdef-switch',
      'shipping default',
      `shippingDefswitch-input${i}`,
    );
    const billDefaultSwitch = createRoundSwitch('billingdef-switch', 'billing default', `billingDefswitch-input${i}`);
    divForSwitch.append(shipSwitch, shipDefaultSwitch, billSwitch, billDefaultSwitch);

    if (addressID) {
      LabelsBoolean(addressID, i);
    }

    const btnDiv = createCustomElement('div', ['div-btn']);
    const btnSave = createCustomElement('button', ['btn-saveadd'], 'Save changes') as HTMLButtonElement;
    btnSave.classList.add('btn-invisible');
    const btnCancel = createCustomElement('button', ['btn-cancelchange'], 'Cancel') as HTMLButtonElement;
    btnCancel.classList.add('btn-invisible');
    const btnDelete = createCustomElement('button', ['btn-delete'], 'Delete address') as HTMLButtonElement;
    btnDelete.classList.add('btn-invisible');
    btnDiv.append(btnSave, btnCancel, btnDelete);

    const address = createCustomElement('div', ['container-address']);
    address.append(
      divForBtn,
      country,
      noEditCountry.container,
      postcode.container,
      city.container,
      street.container,
      divForSwitch,
      btnDiv,
    );

    const formField = btnEdit.parentNode;
    const countryOption = formField?.querySelector('.country');
    if (countryOption) {
      countryOption.classList.add('container-info');
      countryOption.classList.add('input-info');
      countryOption.setAttribute('readonly', 'readonly');
    }

    btnEdit.addEventListener('click', () => {
      btnSave.classList.remove('btn-invisible');
      btnCancel.classList.remove('btn-invisible');
      btnDelete.classList.remove('btn-invisible');
      if (countryOption) {
        countryOption.removeAttribute('readonly');
        countryOption.classList.remove('input-info');
      }

      postcode.input.removeAttribute('readonly');
      city.input.removeAttribute('readonly');
      street.input.removeAttribute('readonly');
      postcode.input.classList.remove('input-info');
      city.input.classList.remove('input-info');
      street.input.classList.remove('input-info');
      noEditCountry.container.classList.add('country-invisible');
      country.classList.remove('country-invisible');
      const shippingSwitch = shipSwitch.querySelector(`.shippingswitch-input${i}`);
      shippingSwitch?.removeAttribute('disabled');
      const billingSwitch = billSwitch.querySelector(`.billingswitch-input${i}`);
      billingSwitch?.removeAttribute('disabled');
      const shippingDefaultSwitch = shipDefaultSwitch.querySelector(`.shippingDefswitch-input${i}`);
      shippingDefaultSwitch?.removeAttribute('disabled');
      const billingDefaultSwitch = billDefaultSwitch.querySelector(`.billingDefswitch-input${i}`);
      billingDefaultSwitch?.removeAttribute('disabled');
    });

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

    btnSave.addEventListener('click', () => {
      const warningsArray = document.querySelectorAll('.small-visible');
      const UpdAddress = {
        country: 'US',
        postalCode: postcode.input.value.trim(),
        city: city.input.value.trim(),
        streetName: street.input.value.trim(),
      };

      if (UpdAddress.city && UpdAddress.postalCode && UpdAddress.streetName) {
        if (warningsArray.length === 0) {
          const id = localStorage.getItem('id');
          let version: string;
          const updateCus = async () => {
            if (id) {
              const customer = await new StpClientApi().getCustomerbyId(id);
              version = String(customer.version);
              const ShippingArray = customer.shippingAddressIds;
              const BillingArray = customer.billingAddressIds;
              const shippingDefaultValue = customer.defaultShippingAddressId;
              const billingDefaultValue = customer.defaultBillingAddressId;

              if (id && addressID) {
                const customer = await new StpClientApi().getCustomerbyId(id);
                version = String(customer.version);
                const updateAdd = await new StpClientApi().changeAddress(id, version, addressID, UpdAddress);
                version = String(updateAdd.body.version);

                const shipDefInput = shipDefaultSwitch.querySelector(`.shippingDefswitch-input${i}`);
                const shipDefInputBoolean = shipDefInput?.hasAttribute('checked');
                if (!(shippingDefaultValue === addressID) && addressID && shipDefInputBoolean) {
                  const setDefaultShipping = await new StpClientApi().setDefaultShipping(id, version, addressID);
                  version = String(setDefaultShipping.body.version);
                }
                if (
                  shippingDefaultValue === addressID &&
                  addressID &&
                  !shipDefInputBoolean &&
                  ShippingArray?.includes(addressID)
                ) {
                  const removeShipping = await new StpClientApi().removeShipping(id, version, addressID);
                  version = String(removeShipping.body.version);
                  const setShipping = await new StpClientApi().addShipping(id, version, addressID);
                  version = String(setShipping.body.version);
                }

                const billDefInput = billDefaultSwitch.querySelector(`.billingDefswitch-input${i}`);
                const billDefInputBoolean = billDefInput?.hasAttribute('checked');
                if (!(billingDefaultValue === addressID) && addressID && billDefInputBoolean) {
                  const setDefaultBilling = await new StpClientApi().setDefaultBilling(id, version, addressID);
                  version = String(setDefaultBilling.body.version);
                }

                if (
                  billingDefaultValue === addressID &&
                  addressID &&
                  !billDefInputBoolean &&
                  BillingArray?.includes(addressID)
                ) {
                  const removeBilling = await new StpClientApi().removeBilling(id, version, addressID);
                  version = String(removeBilling.body.version);
                  const setBilling = await new StpClientApi().addBilling(id, version, addressID);
                  version = String(setBilling.body.version);
                }

                const shipInput = shipSwitch.querySelector(`.shippingswitch-input${i}`);
                const shipInputBoolean = shipInput?.hasAttribute('checked');
                const ShipIncludes = ShippingArray?.includes(addressID);
                const setShipping = await new StpClientApi().addShipping(id, version, addressID);
                version = String(setShipping.body.version);
                if (ShipIncludes && addressID && !shipInputBoolean) {
                  const removeShipping = await new StpClientApi().removeShipping(id, version, addressID);
                  version = String(removeShipping.body.version);
                }

                const billInput = billSwitch.querySelector(`.billingswitch-input${i}`);
                const billInputBoolean = billInput?.hasAttribute('checked');
                const billIncludes = BillingArray?.includes(addressID);
                if (!billIncludes && addressID && billInputBoolean) {
                  const setBilling = await new StpClientApi().addBilling(id, version, addressID);
                  version = String(setBilling.body.version);
                }
                if (billIncludes && addressID && !billInputBoolean) {
                  const removeBilling = await new StpClientApi().removeBilling(id, version, addressID);
                  version = String(removeBilling.body.version);
                }
              }
              btnSave.classList.add('btn-invisible');
              btnDelete.classList.add('btn-invisible');
              btnCancel.classList.add('btn-invisible');
              city.input.setAttribute('readonly', 'readonly');
              postcode.input.setAttribute('readonly', 'readonly');
              street.input.setAttribute('readonly', 'readonly');
              city.input.classList.add('input-info');
              postcode.input.classList.add('input-info');
              street.input.classList.add('input-info');
              noEditCountry.container.classList.remove('country-invisible');
              country.classList.add('country-invisible');
            }
          };
          updateCus();
        }
        customRoute('/successupdate');
      }
      if (!UpdAddress.city) {
        setError(city.input, 'Cannot be blank');
      }
      if (!UpdAddress.postalCode) {
        setError(postcode.input, 'Cannot be blank');
      }
      if (!UpdAddress.streetName) {
        setError(street.input, 'Cannot be blank');
      }
    });

    btnCancel.addEventListener('click', () => {
      btnSave.classList.add('btn-invisible');
      btnCancel.classList.add('btn-invisible');
      btnDelete.classList.add('btn-invisible');
      postcode.input.setAttribute('readonly', 'readonly');
      city.input.setAttribute('readonly', 'readonly');
      city.input.classList.add('input-info');
      street.input.setAttribute('readonly', 'readonly');
      street.input.classList.add('input-info');
      postcode.input.classList.add('input-info');
      country.classList.add('country-invisible');
      noEditCountry.container.classList.remove('country-invisible');
    });

    btnDelete.addEventListener('click', () => {
      const emailVal = localStorage.getItem('email');
      if (emailVal) {
        const id = localStorage.getItem('id');
        let version: string;
        const updateCus = async () => {
          if (id) {
            const customer = await new StpClientApi().getCustomerbyId(id);
            version = String(customer.version);
            if (id && addressID) {
              const customer = await new StpClientApi().getCustomerbyId(id);
              version = String(customer.version);
              const deleteAdd = new StpClientApi().deleteAddress(id, version, addressID);
              deleteAdd.then(async (data) => {
                if (data.statusCode === 200) {
                  try {
                    address.classList.add('invisible');
                    btnSave.classList.add('btn-invisible');
                    btnDelete.classList.add('btn-invisible');
                  } catch {
                    throw Error('Cannot delete address');
                  }
                }
              });
            }
          }
        };
        updateCus();
      }
    });
    container.append(address);
  }

  const newAddress = AddNewAddress();
  container.append(newAddress);

  return container;
};
