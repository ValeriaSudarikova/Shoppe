<template>
  <form class="filters" :class="{ form__mobile: form }">
    <FiltersHeadingMedia v-if="isBreakpointXL" @close="$emit('click-btn')" />
    <FiltersInput v-model="isSearch" />
    <BaseSelect
      v-model="selectedCategory"
      selectGroup="category"
      :options="category"
      optionLabel="name"
      placeholder="Category"
    />
    <BaseSelect
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
      :viewPrices="viewPrices"
    />
    <FiltersToggleSwitch v-model="isOnSale" type="sale" label="On sale" />
    <FiltersToggleSwitch v-model="isInStock" type="stock" label="In stock" />
  </form>
</template>

<script setup lang="ts">
  import BaseSelect from '@/components/base/BaseSelect.vue'
  import { useMobileVersion } from '@/stores/mobileVersion'
  import { toRefs, ref, computed } from 'vue'
  import type { Ref } from 'vue'

  const { isBreakpointXL } = toRefs(useMobileVersion())

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
    form: boolean
    filters: Filters
    modelValue: number[]
    initialMinPrice: number
    initialMaxPrice: number
  }>()

  const emit = defineEmits(['click-btn', 'update:filters', 'update:modelValue'])

  const localFilters = ref({ ...props.filters })

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

  function createFiltersComputed<Key extends keyof Filters, T>(
    key: Key,
    emit: (event: 'update:filters', value: Filters) => void,
    localFilters: Ref<Filters>,
    transform?: {
      get?: (value: Filters[Key]) => T
      set?: (value: T) => Filters[Key]
    },
  ) {
    return computed({
      get: () => {
        const value = localFilters.value[key]
        return transform?.get ? transform.get(value) : value
      },
      set: (value: T) => {
        const newValue = transform?.set ? transform.set(value) : value
        localFilters.value = { ...localFilters.value, [key]: newValue }
        emit('update:filters', localFilters.value)
      },
    })
  }

  const isSearch = createFiltersComputed<'search', string>('search', emit, localFilters)
  const isOnSale = createFiltersComputed<'onSale', boolean>('onSale', emit, localFilters)
  const isInStock = createFiltersComputed<'inStock', boolean>('inStock', emit, localFilters)
  const selectedCategory = createFiltersComputed<'category', CategorySortOption | undefined>(
    'category',
    emit,
    localFilters,
    {
      get: () => category.value.find((option) => option.name === props.filters.category),
      set: (value?: CategorySortOption) => value?.name || '',
    },
  )
  const selectedSort = createFiltersComputed<'sort', CategorySortOption | undefined>(
    'sort',
    emit,
    localFilters,
    {
      get: () => sort.value.find((option) => option.name === props.filters.sort),
      set: (value?: CategorySortOption) => value?.name || '',
    },
  )

  const localPrices = computed({
    get: () => props.modelValue,
    set: (value) => {
      emit('update:modelValue', value)
      localFilters.value.minPrice = value[0]
      localFilters.value.maxPrice = value[1]
      emit('update:filters', localFilters.value)
    },
  })

  const viewPrices = computed(() => {
    return `Price: $${props.modelValue[0]} - $${props.modelValue[1]}`
  })
</script>

<style lang="scss">
  .filters {
    width: 100%;
    max-width: 262px;
    margin-right: 40px;

    @media (max-width: $breakpoints-xl) {
      position: absolute;
      inset: 0;
      z-index: 50;
      max-width: 100%;
      padding: 16px;
      margin-right: 0;
      background-color: white;
      transform: translateX(-102%);
    }
  }

  .form__mobile {
    @media (max-width: $breakpoints-xl) {
      transform: translateX(0%);
    }
  }
</style>
