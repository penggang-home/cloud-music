<template>
  <div id="app">
    <top />
    <index />
  </div>
</template>

<script>
import top from './components/01.top.vue'
import index from './components/02.index.vue'
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
