<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$store.dispatch('authenticate')
  },
}
</script>

<style scoped>
  body,html {
    height: 100%;
  }
</style>
