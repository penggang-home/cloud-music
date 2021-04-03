<template>
  <div>
    parseInt(document.querySelector("#app > div.index-container > div.main").scrollTop + document.querySelector("#app > div.index-container >
    div.main").offsetHeight) / document.querySelector("#app > div.index-container > div.main").scrollHeight
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