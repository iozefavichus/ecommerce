import { ClientApi } from "../../shared/api/clientAPI";
import { regCardObj } from "../../../types/shared";

export const isNewCustomer = async (email: string) => {
      const customers = await new ClientApi().getCustomers();
      if(customers.find((data) => data.email === email)){
        return true
      };
      return false;
    }

export const createNewCustomer = async (registrationCard: regCardObj) => {
      const result = await new ClientApi().createCustomer(registrationCard);
      return result;
    }