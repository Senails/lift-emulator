<script setup lang="ts">
import { LiftState } from '../entities/lift/types';
import styles from './index.module.css';
import { computed } from 'vue';


type TPropsType = {
  levelCount: number
  liftState: LiftState
}
const { levelCount, liftState } = defineProps<TPropsType>();


const positionLift = computed(()=>{
  const num1:number = liftState.Position - 1;
  const num2:number = levelCount;

  return num1/num2*100;
})
const liftColor = computed(()=>{
  const color: string = 
  liftState.Status == "moving"?"rgba(100, 245, 100, 0.6)":
  liftState.Status == "sleep"?"rgba(118, 246, 127, 0.5)":
  "rgba(224, 231, 95, 0.7)";
  return color;
})
const liftText = computed(()=>{
  if (liftState.Status === "sleep") return `лифт спит`;
  if (liftState.Status === "wait") return `лифт ждет пассажира`;
  const direction = liftState.Direction === "up" ? "вверх" : "вниз";
  return `лифт едет `+direction + ` к ${liftState.Targets[0]}`;
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