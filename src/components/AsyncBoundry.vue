<template>
    <div>
        <ErrorIndicator v-if="error"/>
        <Spinner v-else-if="loading"/>
        <slot v-else/>
    </div>
</template>

<script>
import Spinner from './Spinner';
import ErrorIndicator from './ErrorIndicator';
import { defineComponent } from 'vue'

export default defineComponent({
    components: {
        Spinner,
        ErrorIndicator
    },
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        error: {
            type: Boolean,
            default: false
        }
    }
})
</script>