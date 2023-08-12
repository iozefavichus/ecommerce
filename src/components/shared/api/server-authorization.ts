// import { ClientApi } from "./clientAPI";

// const searchCustomer = async (email: string) => {
//   const customers = await new ClientApi().getCustomers();
//   const customer = customers.find((data) => data.email === email);
//   if (customer) {
//     console.log(customer)
//   }
// }

export const authorization = () => {
  const formElem = document.querySelector('#login-form');

  formElem?.addEventListener('submit', (event) => {
    event.preventDefault();
    const mailInput = document.querySelector('.authorization-form__mail') as HTMLInputElement;
    const passwordInput = document.querySelector('.authorization-form__password') as HTMLInputElement;
    const mail = mailInput.value;
    const password = passwordInput.value;

    if (mail !== null && password !== null) {
      const formData: Record<string, string> = {
        email: mail,
        password,
      };
      console.log(formData);
    }
  });
};
