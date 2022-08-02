<template>
  <MainComponent />
</template>

<script>
import MainComponent from './components/Main/MainComponent.vue'

export default {
  name: 'App',
  components: {
    MainComponent
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/_reset.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
