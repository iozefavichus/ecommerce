import { Cart } from "@commercetools/platform-sdk";

export const totalpricebeforeDiscount =(cart: Cart): number=>{
    const beforeDiscount = cart.lineItems.reduce((acc,el)=>{
        if(el.price.discounted?.value.centAmount){
          acc += el.price.discounted.value.centAmount*el.quantity;
        }
        return acc;
      },0);
    return beforeDiscount;
}