<template>
  <div class="search">
    <form class="searchbar">
      <input
        class="searchbar__input" 
        type="text" 
        placeholder="Search"
        :value="value"
        @keyup="$emit('search-changed', $event.target.value)"
      >
      <button
        class="search-button"
        type="submit"
      >
        <img
          class="searchbar__icon"
          src="../assets/images/search.svg"
          alt="Search"
        >
      </button>
    </form>
  </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss">
    @use "sass:map";
    @use "../assets/scss/variables" as *;
    @use "../assets/scss/mixins" as *;
    @use "../assets/scss/media-mixins" as *;

    .search {
        color: $font-color;

        &__header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1vh;
        }

        &__text {
            align-self: center;
            @include text(21px);
        }
    }

    .searchbar {
        display: flex;
        justify-content: space-between;
        width: 100%;
        background-color: $bg-color-container;
        @extend %small-shadow;
        border-radius: 8px;
        padding: 0 22px 0 32px;

        &__input {
            display: block;
            width: 100%;
            border: none;
            background-color: transparent;
            @include text(26px, "bigger", "light");
            color: $light-font-color;
            padding: 20px 0 20px 0;
        }

        &:focus {
            outline: none;
        }
    }

    .search-button {
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
</style>