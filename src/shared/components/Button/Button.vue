<script lang="ts" setup>
import style from'./index.module.css';

type TPropsType = {
  text?: string,
  onClick?: ()=>void,
  backgroundColor?:string;
  color?:string;
}

const {text, onClick, backgroundColor, color} = defineProps<TPropsType>()

</script>

<template>
    <span :class="style.Button+` noselect`" 
    :style="{ backgroundColor , color}"
    @click="onClick">
        {{text}}
    </span>
</template>