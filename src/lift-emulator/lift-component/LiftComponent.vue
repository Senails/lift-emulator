<script setup lang="ts">
import type { LiftState } from '../entities/types';
import styles from './index.module.css';
import { computed } from 'vue';


type TPropsType = {
  levelCount: number
  liftState: LiftState
}

const props = defineProps<TPropsType>();


const positionLift = computed(()=>{
  return (props.liftState.Position - 1)/props.levelCount*100;
})
const liftColor = computed(()=>{
  const color: string = 
  props.liftState.Status == "moving"?"rgba(100, 245, 100, 0.6)":
  props.liftState.Status == "sleep"?"rgba(118, 246, 127, 0.3)":
  "rgba(224, 231, 95, 0.7)";
  return color;
})
const liftText = computed(()=>{
  if (props.liftState.Status === "sleep") return `лифт спит`;
  if (props.liftState.Status === "wait") return `лифт ждет пассажира`;
  const direction = props.liftState.Direction === "up" ? "вверх" : "вниз";
  return `лифт едет `+direction + ` к ${props.liftState.Targets[0]}`;
})

</script>

<template>
  <div :class="styles.liftTonnel" :style="{height: `${500}px`}">
    <div :class="styles.liftBox" 
      :style="{
        height: `${500/levelCount}px`,
        bottom: `${positionLift}%`,
        backgroundColor: liftColor
      }
    ">
      <div>{{liftText}}</div>
    </div>
  </div>
</template>