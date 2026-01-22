<template>
  <Teleport to="#modal">
    <Transition appear name="sidebar">
      <div
          v-if="isMobileSidebarOpen"
          id="mini-sidebar"
          v-bind="$attrs"
          class="sidebar-bg-color fixed left-0 top-0 right-0 bottom-0 z-[999] flex justify-end"
          @click="closeSidebar"
      >
        <aside
            class="bg-white fixed w-[18.875rem] border-e border-black/10 start-0 top-0 h-screen overflow-auto flex flex-col justify-start items-stretch gap-1"
            @click.stop
        >
          <!-- logo -->
          <div class="h-[70.8px] flex items-center justify-center gap-2 mt-5">
<!--            <img class="w-[1.5rem]" src="@/assets/images/logo.png" />-->
            <span class="font-bold text-xl text-black">Masarat</span>
          </div>

          <UserHint class="self-center" name="mobisidebar" />

          <!-- menu -->
          <div id="mobsidebar-scroll">
            <div class="px-7 flex flex-col gap-8 overflow-y-auto overflow-x-hidden">
              <Accordion :mini="false" />
            </div>
          </div>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSidebarStore } from '@/store/sidebar';
import UserHint from '../../navbar/partial/UserHint.vue';
import Accordion from './Accordion.vue';

const { isMobileSidebarOpen } = storeToRefs(useSidebarStore());

const { closeMobileSidebar } = useSidebarStore();

const closeSidebar = () => {
  closeMobileSidebar();
};
</script>

<style scoped>
.sidebar-bg-color {
  background: rgba(0, 0, 0, 0.3);
}

.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 0.3s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
