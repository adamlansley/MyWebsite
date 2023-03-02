<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { random } from "../utils/MathUtils";
import { prefersDark } from "../utils/UserPreferenceHelpers";
import { LavaBlob } from "./LavaBlob";
import { debounce } from "lodash";
const canvas = ref<HTMLCanvasElement>();
const lavaBlobs = reactive<LavaBlob[]>([]);

let lavaBlobCount: number = 20;

function buildLavaBlobs() {
  if (canvas.value) {
    for (let i = 0; i < lavaBlobCount; i++) {
      lavaBlobs.push(new LavaBlob(random(0, canvas.value.width), random(0, canvas.value.height)));
    }
  }
}

function renderLavaBlobs() {
  if (!canvas.value) {
    // @TODO: Error handling
    return;
  }

  const ctx = canvas.value.getContext("2d");

  if (!ctx) {
    // @TODO: Error handling
    return;
  }

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  ctx.globalCompositeOperation = prefersDark() ? "lighter" : "multiply";

  lavaBlobs.forEach((blob) => {
    blob.draw(ctx);
    blob.move(canvas.value!.width, canvas.value!.height);
  });

  window.requestAnimationFrame(renderLavaBlobs);
}

function resizeCanvas()  {
  if (canvas.value) {
    canvas.value.width = canvas.value.clientWidth;
    canvas.value.height = canvas.value.clientHeight;
  } 
}

const debouncedResizeCanvas = debounce(resizeCanvas);

onMounted(() => {
  if (canvas.value) {
    resizeCanvas();
    lavaBlobCount = Math.min(20, ((canvas.value.width * canvas.value.height) / 75000));

    buildLavaBlobs();

    window.requestAnimationFrame(renderLavaBlobs);
    window.addEventListener("resize", debouncedResizeCanvas);
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", debouncedResizeCanvas);
});
</script>

<template>
  <canvas class="h-screen w-screen absolute" ref="canvas" />
</template>
