<script setup lang="ts">
const emits = defineEmits(['backModel'])

</script>

<template>
  <div>
    <p class="cursor-pointer flex items-center gap-2" @click="emits('backModel')">
      <svg
        width="19"
        height="11"
        viewBox="0 0 19 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.90576 11C6.23718 11.0026 6.50784 10.7312 6.5104 10.3939C6.51171 10.2262 6.44514 10.0653 6.32645 9.94905L2.54953 6.10798L17.8998 6.10798C18.7001 6.10798 18.7001 4.88647 17.8998 4.88647L2.55306 4.88647L6.32645 1.0454C6.5614 0.806243 6.5614 0.418503 6.32645 0.179356C6.0915 -0.0597916 5.7106 -0.0597849 5.47565 0.179371L0.6745 5.06659C0.441833 5.30483 0.441833 5.68962 0.6745 5.92786L5.47565 10.8151C5.58859 10.9333 5.74375 11 5.90576 11Z"
          fill="#000"
        />
      </svg>
      <span>back</span>
    </p>
  </div>
</template>

<style scoped>

</style>