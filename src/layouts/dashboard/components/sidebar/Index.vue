<template>
  <aside
      class="bg-white fixed w-[18.875rem] border-e border-black/10 start-0 top-0 h-screen overflow-hidden pt-4"
      @mouseover="emit('onHover')"
      @mouseleave="emit('onLeave')"
  >
    <!-- logo -->
    <div class="flex items-center justify-center gap-2 border-b border-black/10 pb-2">
      <TextLogoIcon v-if="isExpanded || isHovered"  class="h-14 fill-primary-700"/>
      <LogoIcon v-else  class="w-9 h-9 fill-primary-700 mb-1"/>
    </div>

    <!-- menu -->
    <div data-scrollbar class="h-[calc(100%-98px)] overflow-y-auto" id="sidebar-scroll">
      <div
        class="px-4 flex flex-col gap-8 overflow-x-hidden"
        :class="{ 'items-center': !isExpanded && !isHovered }"
      >
        <AccordionSidebar :mini="!isHovered && !isExpanded" />
      </div>
    </div>

  </aside>
</template>

<script setup lang="ts">
import AccordionSidebar from './partial/Accordion.vue';
import TextLogoIcon from "@/components/icons/TextLogoIcon.vue";
import LogoIcon from "@/components/icons/LogoIcon.vue";

defineProps<{
  isExpanded: boolean
  isHovered: boolean
}>()

const emit = defineEmits(['onHover', 'onLeave'])
</script>
<style>

</style>
