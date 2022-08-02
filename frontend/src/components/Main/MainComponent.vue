<template>
  <Header />
  <Contents />
  <Footer />
</template>

<script>
import Header from './HeaderComponent.vue'
import Footer from './FooterComponent.vue'
import Contents from './ContentsComponent.vue'

export default {
  components: {
    Header,
    Footer,
    Contents
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main/main.scss';

</style>