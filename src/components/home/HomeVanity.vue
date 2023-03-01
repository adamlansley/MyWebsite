<script lang="ts" setup>
import HomeVanityChips from "./HomeVanityChips.vue";
</script>

<template>
  <section class="inline-flex flex-col text-center gap-y-2 drop-shadow m-auto">
    <h1 class="text-6xl inline-block">Adam Lansley</h1>
    <h2 class="text-2xl inline-block">Front End Developer</h2>
    <HomeVanityChips class="mt-2" />
  </section>
</template>

<style scoped>
section > * {
  text-shadow: 0 0 15px var(--background-colour);
}

</style>