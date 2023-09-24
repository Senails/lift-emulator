<script setup lang="ts">
import LiftEmulator from '../lift-emulator/widget/LiftEmulator.vue';
import styles from './index.module.css';


</script>

<template>
  <main :class="styles.mainConteiner">
    <div>
      <LiftEmulator/>
    </div>
  </main>
</template>