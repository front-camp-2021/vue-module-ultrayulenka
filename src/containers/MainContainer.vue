<template>
  <div>
    <Search />
    <CardList :products="products" />
    <Pagination
      :page="page"
      :total-pages="totalPages"
    />
  </div>
</template>

<script>
import CardList from '../components/CardList';
import Search from '../components/Search';
import Pagination from '../components/Pagination';
import db from '../../server/db.json';

export default {
    components: {
        CardList,
        Search,
        Pagination
    },
    props: {
        searchQuery: {
            type: String,
            default: ''
        },
        page: {
            type: Number,
            default: 1,
            validator: function(value) {
                return value > 0;
            }
        },
        totalPages: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            products: [...db.products.slice(0,9)]
        }
    }
}
</script>

<style lang="scss">
</style>