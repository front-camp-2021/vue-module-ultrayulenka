<script>
import { 
    h,
    defineComponent
} from 'vue'

export default defineComponent({
    props: {
        isInList: {
            type: Boolean,
            default: false
        }
    },
    render() {
        return h(
            this.isInList? 'li' : 'div',
            {},
            this.$slots.default()
        )
    }
})
</script>