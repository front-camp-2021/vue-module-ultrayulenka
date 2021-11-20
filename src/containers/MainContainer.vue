<template>
    <div>
        <Search />
        <CardList :products="products" />
        <Pagination
            :page="3"
            :totalPages="10"/>
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
    data() {
        return {
            products: [...db.products.slice(0,9)]
        }
    }
}
</script>

<style lang="scss">
</style>