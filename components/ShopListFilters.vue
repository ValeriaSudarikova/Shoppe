<template>
  <form class="filters">
    <FiltersHeadingMedia v-if="isMobile" @close="$emit('click-btn')" />
    <FiltersInput v-model="isSearch" />
    <FiltersSelect
      v-model="selectedCategory"
      selectGroup="category"
      :options="category"
      optionLabel="name"
      placeholder="Category"
    />
    <FiltersSelect
      v-model="selectedSort"
      selectGroup="sort"
      :options="sort"
      optionLabel="name"
      placeholder="Sort By"
    /><FiltersRange
      v-model="localPrices"
      :minPrice="initialMinPrice"
      :maxPrice="initialMaxPrice"
      :step="0.05"
      :veiwPrices="veiwPrices"
    />
    <FiltersToggleSwitch v-model="isOnSale" type="sale" label="On sale" />
    <FiltersToggleSwitch v-model="isInStock" type="stock" label="In stock" />
  </form>
</template>

<script setup lang="ts">
  import { useHeaderMobile } from '@/stores/mobileVersion'
  import { toRefs, ref, computed } from 'vue'

  const { isMobile } = toRefs(useHeaderMobile())

  interface Filters {
    search: string
    category: string
    sort: string
    minPrice: number
    maxPrice: number
    onSale: boolean
    inStock: boolean
  }

  interface CategorySortOption {
    name: string
  }

  const props = defineProps<{
    filters: Filters
    modelValue: number[]
  }>()

  const emit = defineEmits(['click-btn', 'update:filters', 'update:modelValue'])

  const localFilters = ref({ ...props.filters })
  const initialMinPrice = ref(props.filters.minPrice)
  const initialMaxPrice = ref(props.filters.maxPrice)

  const isSearch = computed({
    get: () => localFilters.value.search,
    set: (value) => {
      localFilters.value.search = value
      emit('update:filters', localFilters.value)
    },
  })

  const isOnSale = computed({
    get: () => localFilters.value.onSale,
    set: (value) => {
      localFilters.value.onSale = value
      emit('update:filters', localFilters.value)
    },
  })

  const isInStock = computed({
    get: () => localFilters.value.inStock,
    set: (value) => {
      localFilters.value.inStock = value
      emit('update:filters', localFilters.value)
    },
  })

  const selectedCategory = computed({
    get: () => category.value.find((option) => option.name === props.filters.category),
    set: (value) => {
      localFilters.value.category = value?.name || ''
      emit('update:filters', localFilters.value)
    },
  })

  const selectedSort = computed({
    get: () => sort.value.find((option) => option.name === props.filters.sort),
    set: (value) => {
      localFilters.value.sort = value?.name || ''
      emit('update:filters', localFilters.value)
    },
  })

  const category = ref<CategorySortOption[]>([
    { name: 'electronics' },
    { name: 'jewelery' },
    { name: `men's clothing` },
    { name: `women's clothing` },
  ])

  const sort = ref<CategorySortOption[]>([
    { name: 'Price: Low to High' },
    { name: 'Price: High to Low' },
    { name: 'Name: A → Z' },
    { name: 'Name: Z → A' },
  ])

  const localPrices = computed({
    get: () => props.modelValue,
    set: (value) => {
      emit('update:modelValue', value)
      localFilters.value.minPrice = value[0]
      localFilters.value.maxPrice = value[1]
      emit('update:filters', localFilters.value)
    },
  })

  const veiwPrices = computed(() => {
    return `Price: $${props.modelValue[0]} - $${props.modelValue[1]}`
  })
</script>

<style lang="scss">
  .filters {
    width: 100%;
    max-width: 262px;
    margin-right: 40px;

    @media (max-width: $breakpoints-s) {
      position: absolute;
      inset: 0;
      z-index: 50;
      max-width: 100%;
      padding: 4px 16px;
      margin-right: 0;
      background-color: white;
      transform: translateX(-102%);
      transition: all 0.3s;
    }
  }
</style>
