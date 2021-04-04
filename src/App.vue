<template>
  <div id="app">
    <top />
    <index />
  </div>
</template>

<script>
import top from './components/Top.vue'
import index from './components/Index.vue'
export default {
  name: 'app',
  components: {
    top,
    index,
  },
  created() {
    window.addEventListener('keyup', event => {
      // 32 空格
      if (event.keyCode == 32 || event.code == 'Space') {
        this.$Bus.$emit('toggle')
        e.preventDefault();
        e.stopPropagation()
        return false
      }
    })
  },
}
</script>

<style >
</style>
