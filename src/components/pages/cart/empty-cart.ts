import { createCustomElement } from "../../shared/utilities/helper-functions";
import { customRoute } from "../../app/router/router";

export const EmptyCart = () => {
    const wrapper = document.querySelector('.cart-wrapper')
    if(wrapper){
        wrapper.textContent = '';
        const emptyCart = createCustomElement(
                'div',
                ['empty__text'],
                `Your shopping cart is empty! Let's go to the catalog to choose something new!`,
              );
        const btnCatalog = createCustomElement('button', ['btn-catalog'], 'To catalog') as HTMLButtonElement;
        btnCatalog.addEventListener('click',()=>{
                customRoute('/catalog');
              })
        wrapper.append(emptyCart, btnCatalog);
    }
}