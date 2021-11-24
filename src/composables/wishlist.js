import {
    readonly,
    reactive
} from 'vue';

export function useWishlist() {

    const state = reactive({
        products: []
    })

    function changeWishlistStatus(product) {
        console.log(product);
        const { id } = product;
        const index = state.products.findIndex(item => item.id === id);

        if(index >= 0) {
            state.products.splice(index, 1);
        } else {
            state.products.push(product);
        }
    }

    function removeAll() {
        state.products = [];
    }

    return {
        changeWishlistStatus,
        removeAll,
        state: readonly(state)
    }
}