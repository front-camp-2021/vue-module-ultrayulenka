import {
    readonly,
    reactive
} from 'vue';

export function useParams() {
    const state = reactive({
        selectedFilters: [],
        selectedRanges: [],
        search: ''
    })

    function addFilter(value){
        state.selectedFilters.push(value);
    }

    function removeFilter(value) {
        const index = state.selectedFilters.indexOf(value);
        if(index > -1) {
            state.selectedFilters.splice(index, 1);
        }
    }

    function changeSelectedRange(title, selected) {
        const index = state.selectedRanges.findIndex(range => range.title === title);
        if(index > -1) {
            state.selectedRanges.splice(index, 1, {title, selected})
        } else {
            state.selectedRanges.push({title, selected});
        }
    }

    function getSelectedRange(title, min, max) {
        const range = state.selectedRanges.find(item => item.title === title);
        return range?.selected? range.selected : {from: min, to: max};
    }

    function changeSearchQuery(value) {
        if(value.trim()) {
            state.search = value.trim();
        } else {
            state.search = '';
        }
    }

    function resetFilters() {
        state.selectedFilters = [];
        state.selectedRanges = [];
        state.search = '';
    }

    return {
        changeSelectedRange,
        addFilter,
        removeFilter,
        changeSearchQuery,
        resetFilters,
        getSelectedRange,
        state: readonly(state)
    }
}