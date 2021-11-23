<script>
import { h } from 'vue'

export default {
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
}
</script>