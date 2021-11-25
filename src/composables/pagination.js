import {
    readonly,
    reactive
} from 'vue';

export function usePagination() {

    const state = reactive({
        page: 1,
        totalPages: 12,
        pageLimit: 9,
        total: 100
    })

    function changePage(index) {
        if(index > 0 && index <= state.totalPages) {
            state.page = index;
        }
    }

    function changeTotal(amount) {
        state.total = amount;
        state.totalPages = Math.ceil(amount / state.pageLimit);
    }

    return {
        changePage,
        changeTotal,
        state: readonly(state)
    }
}