<script lang="ts" setup>
import BaseChip from "../controls/BaseChip.vue";
import VueLogo from "../../assets/imgs/vue_logo.svg";
import TypeScriptLogo from "../../assets/imgs/typescript_logo.svg";
import IconCypress from "../controls/icons/IconCypress.vue";
import VitestLogo from "../../assets/imgs/vitest_logo.svg";

</script>

<template>
  <div class="flex gap-2 flex-wrap justify-center">
    <BaseChip colour="">
      <img class="w-5 h-5" :src="VueLogo" />Vue
    </BaseChip> 
    <BaseChip colour="">
      <img class="w-5 h-5" :src="TypeScriptLogo" />Typescript
    </BaseChip> 
    <BaseChip colour="">
      <IconCypress class="w-5 h-5"  />Cypress
    </BaseChip > 
    <BaseChip colour="">
      <img class="w-5 h-5" :src="VitestLogo" />Vitest
    </BaseChip>
  </div>
</template>
