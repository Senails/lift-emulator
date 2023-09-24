<script setup lang="ts">
import styles from './index.module.css';
import LiftComponent from "../lift-component/LiftComponent.vue";
import Button from "../../shared/components/Button/Button.vue";
import { CallLift, useSelector } from '../entities/index';

const liftStates= useSelector((s)=> s.liftStateList);
const buttonsList = useSelector((s)=> s.buttonList );

</script>

<template>
  <div :class="styles.conteiner">
    <!-- lifts -->
    <LiftComponent v-for="(_,index) in liftStates" 
    :key="index"
    :level-count="liftStates.length"
    :lift-state="liftStates[index]"
    />
    
    <!-- buttons -->
    <div :class="styles.buttons">
      <div v-for="(isActive,index) in buttonsList" :class="isActive?styles.active:''" :key="index" >
        <Button text="вызвать лифт" 
          :on-click="()=>CallLift(index+1)" 
          :background-color="isActive?'#faf59d':''"
        ></Button>
      </div>
    </div>

  </div>
</template>