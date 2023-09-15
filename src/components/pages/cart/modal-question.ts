import { getLocalStorage, removeLocalStorageValue } from "../../app/local-storage/local-storage";
import { createCustomElement } from "../../shared/utilities/helper-functions";
import { KEY_CART } from "./has-cart";
import { ApiClient } from "../../shared/api/stp-client-api";
import { EmptyCart } from "./empty-cart";
import { customRoute } from "../../app/router/router";

export const confirmationWindow = () =>{
    const container  = document.querySelector('.modal-container');
    const modalDiv = createCustomElement('div',['modal-window']);
    const modalText = createCustomElement('div',['modal-text'],'Are you sure you want to clear your cart?');
    const divForButton = createCustomElement('div',['button-container']);
    const btnCancel = createCustomElement('button',['button-cancel'],`No, I don't`) as HTMLButtonElement;
    const btnApprove = createCustomElement('button',['button-approve'],'Yes, I do') as HTMLButtonElement;
    divForButton.append(btnCancel, btnApprove);

    btnCancel.addEventListener('click',()=>{
        customRoute('/cart');
        container?.classList.add('modal-invisible');
    });
    btnApprove.addEventListener('click',async()=>{
        const id = getLocalStorage(KEY_CART) as string;
        const {version} = await new ApiClient().getCartById(id);
        const clear = await new ApiClient().deleteCart(id, version);
        removeLocalStorageValue(KEY_CART);
        EmptyCart();
        container?.classList.add('modal-invisible');
    })

    modalDiv.append(modalText, divForButton);
    container?.append(modalDiv);

}