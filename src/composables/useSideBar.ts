import { computed } from 'vue';
import HomeIcon from "@/components/icons/HomeIcon.vue";
import DashboardIcon from "@/components/icons/DashboardIcon.vue";

export const icons = {
  HomeIcon,
  DashboardIcon,

};
export const sidebarItems = computed(() => [
  {
    title: 'home',
    icon: 'HomeIcon',
    routeName: 'admin-panel',
    children: [
      {
        title: 'dashboard',
        icon: 'DashboardIcon',
        routeName: 'admin-panel',
      }
    ]
  },
  {
    title: 'suppliers',
    icon: 'HomeIcon',
    routeName: 'suppliers',
  },
  {
    title: 'products',
    icon: 'HomeIcon',
    routeName: 'products',
  },
]);
