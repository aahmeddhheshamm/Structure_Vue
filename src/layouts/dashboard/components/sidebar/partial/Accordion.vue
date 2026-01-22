<template>
  <div class="hs-accordion-group py-8 flex flex-col gap-8 overflow-y-hidden overflow-x-hidden justify-start">
    <template v-for="(item, index) in menuItems" :key="`${item.title}_${index}`">
      <div
          class="hs-accordion"
          :class="{
          active: $route.matched.some(({ name }) => name === item.routeName),
          'hs-accordion-active': openAccordion === index
        }"
          :id="`hs-basic-heading-${item.title}_${index}`"
      >
        <button
            @click="handleItemClick(index, item)"
            class="flex hs-accordion-toggle justify-between items-center px-3 h-10 w-full rounded disabled:pointer-events-none text-black hs-accordion-active:bg-primary-700 hs-accordion-active:text-[#fff]"
            :class="{
            '!w-12 !h-10 transition-all duration-500 bg-neural-200/10': mini,
            'bg-primary-700 text-white': openAccordion === index || $route.matched.some(({ name }) => name === item.routeName)
          }"
            :aria-expanded="openAccordion === index"
            :aria-controls="`hs-basic-collapse-${item.title}_${index}`"
        >
          <div class="flex items-center justify-start gap-2 w-full">
            <div class="w-6 h-6 flex justify-center items-center">
              <span v-html="item?.icon" class="item-icon"></span>
            </div>
            <p class="font-medium w-full text-start" :class="{ hidden: mini }">
              {{ item.title }}
            </p>
          </div>
          <svg
              v-if="!mini && item.children"
              :class="['size-4 transition-transform duration-200', openAccordion === index ? 'rotate-180' : '']"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <!-- Show children if available and not minimized -->
        <div
            v-if="item.children && !mini"
            :id="`hs-basic-collapse-${item.title}_${index}`"
            class="overflow-hidden transition-all duration-300"
            :style="{
            maxHeight: openAccordion === index ? '500px' : '0px',
            opacity: openAccordion === index ? 1 : 0
          }"
        >
          <ul class="flex flex-col gap-2 pt-3">
            <template v-for="(child, key) in item.children" :key="key">
              <li>
                <router-link
                    :to="{ name: child?.link?.name }"
                    exact-active-class="active-sidebar"
                    class="flex items-center ps-10 w-full h-10 px-3 rounded-md relative z-10 text-neural-300"
                    :class="[
                    {
                      '!w-12 !h-10 justify-center items-center rounded-lg !p-0 transition-all duration-500': mini
                    }
                  ]"
                >
                  <div class="flex gap-2 items-center">
                    <div class="w-6 h-6 flex justify-center items-center">
                      <span v-html="child.icon"></span>
                    </div>
                    <p v-if="!mini" class="text-xs text-nowrap">{{ child.title }}</p>
                  </div>
                </router-link>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import menuItems from '../sidbar.json'

const props = defineProps({
  item: { type: Object },
  active: { type: Boolean, default: false },
  mini: { type: Boolean }
})

const router = useRouter()
const route = useRoute()
const openAccordion = ref<number | null>(null)

const handleItemClick = (index: number, item: any) => {
  if (!item.children || item.children.length === 0) {
    // If no children, navigate to the route
    router.push({ name: item.routeName })
    openAccordion.value = openAccordion.value === index ? null : index
  } else {
    // Toggle the accordion if there are children
    openAccordion.value = openAccordion.value === index ? null : index
  }
}

</script>

<style scoped>
.active-sidebar {
  @apply bg-primary-50 !text-primary-700;
}

.active-sidebar p {
  @apply font-semibold;
}

.active-sidebar span > svg > path {
  fill: theme('colors.primary.700');
}
</style>