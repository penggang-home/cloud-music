<template>
  <div :class="['index-container', { 'padding-bottom': state }]">
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
      <el-backtop target=".main"></el-backtop>
    </div>
    <div :class="['player', { hide: !state }]">
      <aplayer
        ref="aplayer"
        :audio="audioInfo"
        :lrcType="1"
        :volume.sync="volume"
        :mini.sync="mini"
        :loop.sync="loop"
        :order.sync="order"
        :listFolded.sync="listFolded"
        :fixed="fixed"
        :autoplay="autoplay"
        @playing="play"
      />
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
      // 播放列表最大高度
      // listMaxHeight: '130',
      volume: 0.7,
      // 迷你模式
      mini: false,
      // 音频循环播放, 可选值: 'all', 'one', 'none'
      loop: 'all',
      // 音频循环顺序, 可选值: 'list', 'random'
      order: 'random',
      // 自动播放
      autoplay: true,
      // 吸底模式
      fixed: true,
      // 列表默认折叠
      listFolded: true,
      state: true,
    }
  },
  created() {
    this.$Bus.$on('switchState', state => {
      this.state = state
    })
  },

  computed: {
    // 3.通过vuex获取
    ...mapState(['audioInfo']),
  },
  methods: {
    // 播放事件
    play(info) {
      console.log(this.$refs.aplayer.currentSettings)
      // console.log(info)
    },
    // 删除功能待实现
    remove(index) {
      // this.$refs.aplayer.audio.splice(1, 1)
      // this.$refs.aplayer.audio.splice(index, 1)
    },
  },
}
</script>

<style scope>
/* 锚点跟踪 不懂别动 */
.main {
  overflow-anchor: none;
}
.player {
  transition: all 0.3s;
}
.hide {
  transform-origin: bottom;
  transform: rotateX(90deg);
}
.icon-shanchu:before {
  color: #f56c6c;
  position: relative;
  right: 5px;
}
.padding-bottom{
  padding-bottom: 66px;
}
</style>
