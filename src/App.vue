<script setup lang="ts">
import { storeToRefs } from "pinia"
import { defineAsyncComponent, onMounted } from "vue"
import { useI18n } from "vue-i18n"
import { useLocaleStore } from "./store/locale"


const { locale } = useI18n()
const { currentLocale } = storeToRefs(useLocaleStore())



onMounted(async () => {
  locale.value = currentLocale.value.lang
})

</script>

<template>
  <transition name="fade" mode="out-in">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </transition>
</template>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
</style>
