<template>
    <div></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Options, Vue } from 'vue-class-component';

@Options({
   
})
export default class Loader extends Vue {
    
}
</script>
<style lang="scss" scoped>
div {
  width: 16px;
  height: 16px;
  background-color: var(--grey);
  border-radius: 25px;
  animation-name: example;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  margin-left: 83px;
  margin-bottom: 80px;
}

@keyframes example {
  from {background-color: var(--primary);}
  to {background-color: var(--dark-bold);}
}
</style>
