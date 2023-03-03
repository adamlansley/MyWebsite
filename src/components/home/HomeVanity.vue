<script lang="ts" setup>
import HomeVanityChips from "./HomeVanityChips.vue";
import VanityImage from "../../assets/imgs/vanity-picture.png";
import { ref, computed } from "vue";
import HomeLavaCanvas from "@/components/home/HomeLavaCanvas.vue";

const vanityImg = ref<HTMLImageElement | null>(null);

const vanityImgBounds = computed(() => {
  if (!vanityImg.value) {
    return null;
  }

  const bounds = vanityImg.value.getBoundingClientRect();

  return {
    x: bounds.x + bounds.width / 2,
    y: bounds.y + bounds.height / 2
  };
});
</script>

<template>
  <HomeLavaCanvas v-if="vanityImgBounds" :origin-x="vanityImgBounds.x" :origin-y="vanityImgBounds.y" />
  <section class="inline-flex flex-col justify-center items-center gap-y-2 m-auto text-center">
    <img ref="vanityImg" :src="VanityImage" class="rounded-full w-1/2" />
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