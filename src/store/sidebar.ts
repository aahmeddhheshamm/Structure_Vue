import { defineStore } from 'pinia';

export const useSidebarStore = defineStore("sidebar", {
  state: () => ({
    isMobileSidebarOpen: false,  // Track the mobile sidebar state
  }),

  actions: {
    openMobileSidebar() {
      console.log('openMobileSidebar');
      this.isMobileSidebarOpen = true;  // Open mobile sidebar
    },

    closeMobileSidebar() {
      this.isMobileSidebarOpen = false;  // Close mobile sidebar
    },
  },
});
