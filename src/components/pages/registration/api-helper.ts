// import { StpClientApi } from "../../shared/api/stpClient-api";
// import { regCardObj } from "../../../types/shared";

// export const isNewCustomer = async (email: string) => {
//       const customers = await new StpClientApi().getCustomers();
//       if(customers.find((data) => data.email === email)){
//         return true
//       };
//       return false;
//     }

// export const createNewCustomer = async (registrationCard: regCardObj) => {
//       const result = await new StpClientApi().createCustomer(registrationCard);
//       return result;
//     }