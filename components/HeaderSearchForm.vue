<template>
    <form action="" class="search-form">
        <button type="button" class="search-form-btn" @click="goToShop">
            <img
                src="@/assets/images/icons/search.svg"
                alt="search"
                class="search-form-btn-img"
            />
        </button>
        <input type="text" class="search-form-input" placeholder="Search" />
    </form>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goToShop() {
    router.push('/shop');
}
</script>

<style lang="scss">
.search-form {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  border-radius: 4px;
  padding-left: 10px;
  background-color: #efefef;

    &-input {
      @include t-small(#707070);
      padding: 10px;
      width: 100%;
      background-color: transparent;
    }
}
</style>
