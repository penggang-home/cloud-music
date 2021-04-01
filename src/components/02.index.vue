<template>
  <div class="index-container">
    <div class="nav">
      <ul>
        <li>
          <router-link to="/discovery">
            <span class="iconfont icon-find-music"></span>
            发现音乐
          </router-link>
        </li>
        <li>
          <router-link to="/playlists">
            <span class="iconfont icon-music-list"></span>
            推荐歌单
          </router-link>
        </li>
        <li>
          <router-link to="/songs">
            <span class="iconfont icon-music"></span>
            最新音乐
          </router-link>
        </li>
        <li>
          <router-link to="/mvs">
            <span class="iconfont icon-mv"></span>
            最新MV
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="player">
      <audio :src="musicUrl" controls autoplay ref="audio" loop></audio>
    </div>
  </div>
</template>

<script>
// 导入辅助函数
import { mapState } from 'vuex'

export default {
  name: 'index',
  data() {
    return {
      // 1.子传父
      // musicUrl: 'test',
    }
  },
  created() {
    // 2. 接收利用事件总线传递的数据
    // this.$Bus.$on('newMusic', url => {
    //   console.log('url', url)
    // })
  },
  computed: {
    // 3.通过vuex获取
    ...mapState(['musicUrl','random']),
  },
  watch:{
    random(random){
      console.log('newRandom',random);
      // 调用 audio对象上的方法
      // 常见方法：MDN https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement
      this.$refs.audio.play()
    }
  }
}
</script>

<style scope>
.main{
  overflow-anchor: none;
}
</style>
