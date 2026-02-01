<template>
  <aside
    class="bg-white fixed w-[18.875rem] border-e border-black/10 start-0 top-0 h-screen overflow-hidden pt-4"
    @mouseover="emit('onHover')"
    @mouseleave="emit('onLeave')"
  >
    <!-- logo -->
    <div class="h-[70.8px] flex items-center justify-center gap-2">
      <img v-if="isExpanded || isHovered" class=" w-[5.5rem]" src="@/assets/images/text-logo.svg" />
      <img v-else class="w-[4rem] h-[]" src="@/assets/images/logo.svg" />

    </div>

    <!-- menu -->
    <div data-scrollbar class="h-[calc(100%-98px)]" id="sidebar-scroll">
      <div
        class="px-7 flex flex-col gap-8 overflow-y-hidden overflow-x-hidden"
        :class="{ 'items-center': !isExpanded && !isHovered }"
      >
        <AccordionSidebar :mini="!isHovered && !isExpanded" />
      </div>
    </div>

  </aside>
</template>

<script setup lang="ts">
import AccordionSidebar from './partial/Accordion.vue';

const props = defineProps<{
  isExpanded: boolean
  isHovered: boolean
}>()

const emit = defineEmits(['onHover', 'onLeave'])
</script>
<style>

</style>
