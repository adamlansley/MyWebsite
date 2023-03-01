<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
const canvas = ref<HTMLCanvasElement>();
const lavaBlobs = reactive<LavaBlob[]>([]);

interface NumberRange {
  min: number;
  max: number;
}

const lavaBlobCount: number = 10;
const lavaBlobColourGroups: [string, string][] = [["#66ccff", "#ffaaff"]];
const lavaBlobSize: NumberRange = { min: 120, max: 200 };
const blurRange: NumberRange = { min: 30, max: 200 };

function random(min: number, max: number): number {
  return Math.random() * ( max - min ) + min;
}

class LavaBlob {
  private _radius: number;
  private _blur: number;
  private _x: number;
  private _y: number;
  private _colourGroup: [string, string];
  private _gradient: [number, number, number, number];

  private _dX: number = random(-0.5, 0.5);
  private _dY: number = random(-0.5, 0.5);
  private _dBlur: number = random(-0.25, 0.25);

  constructor(initialX: number, initialY: number) {
    this._radius = random(lavaBlobSize.min, lavaBlobSize.max);
    this._blur = random(blurRange.min, blurRange.max);
    this._colourGroup = lavaBlobColourGroups[random(0, lavaBlobColourGroups.length - 1)];

    this._x = initialX;
    this._y = initialY;
    this._gradient = [this._x - this._radius / 2, this._y - this._radius / 2, this._x + this._radius, this._y + this._radius];
  }

  private buildGradient(ctx: CanvasRenderingContext2D) {
    let grd = ctx.createLinearGradient(...this._gradient);
    grd.addColorStop(0, this._colourGroup[0]);
    grd.addColorStop(1, this._colourGroup[1]);

    return grd;
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.filter = `blur(${this._blur}px)`;
    ctx.fillStyle = this.buildGradient(ctx);
    ctx.arc( this._x, this._y, this._radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  move(maxX: number, maxY: number) {
    let newX = this._x + this._dX;
    let newY = this._y + this._dY;
    let newBlur = this._blur + this._dBlur;
    
    if (newX - this._radius >= maxX || newX + this._radius <= 0) {
      this._dX *= -1;

      // Round in the opposite direction, with a little oomph
      newX += this._dX * 2;
    }

    if (newY - this._radius >= maxY || newY + this._radius <= 0 ) {
      this._dY *= -1;

      // Round in the opposite direction, with a little oomph
      newY += this._dY * 2;
    }

    if (newBlur > blurRange.max || newBlur < blurRange.min ) {
      this._dBlur *= -1;

      // Round in the opposite direction, with a little oomph
      newBlur += this._dBlur * 2;
    }

    this._x = newX;
    this._y = newY;
    this._blur = newBlur;

  }
}

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
  ctx.globalCompositeOperation = "source-over";

  lavaBlobs.forEach((blob) => {
    blob.draw(ctx);
    blob.move(canvas.value!.width, canvas.value!.height);
  });

  window.requestAnimationFrame(renderLavaBlobs);
}

onMounted(() => {
  if (canvas.value) {
    canvas.value.width = canvas.value.clientWidth;
    canvas.value.height = canvas.value.clientHeight;

    buildLavaBlobs();

    window.requestAnimationFrame(renderLavaBlobs);
  }
});
</script>

<template>
  <canvas class="h-screen w-screen absolute" ref="canvas" />
</template>
