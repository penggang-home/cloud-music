<template>
  <div
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    style="width: 100%"
  >
    加载
  </div>
</template>

<script>
export default {
  data() {
    return {
     
      loading: true,
    }
  },
}
</script>