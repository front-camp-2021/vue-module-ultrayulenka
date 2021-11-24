import {
    readonly,
    reactive
} from 'vue';

export function useCart() {

    const state = reactive({
        products: []
    })

    function addToCart(product) {
        const { id } = product;
        const index = state.products.findIndex(item => item.id === id);

        if(index >= 0) {
            state.products[index].quantity++;
        } else {
            state.products.push({...product, quantity: 1});
        }
    }

    function removeFromCart(id) {
        state.products = [];
        const index = state.products.findIndex(item => item.id === id);
        if(index >= 0) {
            state.products.splice(index, 1);
        }
    }

    function changeQuantity(id, quantity) {
        const index = state.products.findIndex(item => item.id === id);

        if(index < 0) return;

        if(quantity <= 0) {
            state.products.splice(index, 1);
        } else {
            state.products[index].quantity = quantity;
        }
    }

    return {
        addToCart,
        removeFromCart,
        changeQuantity,
        state: readonly(state)
    }
}