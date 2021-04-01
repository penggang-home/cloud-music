<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title">{{ queryInfo.keywords }}</h2>
      <span class="sub-title">{{ `共找到${count}个结果` }}</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table infinite-list">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row" @dblclick="playMusic(item.id, item.artists[0].name)" v-for="(item, index) in searchResult.songs" :key="index">
              <td>{{ index + 1 }}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <!-- 歌名 -->
                    <span>{{ item.name }}</span>
                    <!-- mv的图标 -->
                    <span v-if="item.mvid" class="iconfont icon-mv"></span>
                  </div>
                </div>
              </td>
              <!-- 歌手的名字 -->
              <td>{{ item.artists[0].name }}</td>
              <!-- 专辑名称 -->
              <td>{{ item.album.name }}</td>
              <td>{{ item.duration | formatDuration }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div class="item" v-for="(item, index) in searchResult.playlists" :key="index">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量：
                <span class="num">{{ item.playCount | ellipsisPlayVolume }}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div class="item" v-for="(item, index) in searchResult.mvs" :key="index">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{ item.playCount | ellipsisPlayVolume }}</div>
              </div>
              <span class="time">{{ item.duration | formatDuration }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'result',
  data() {
    return {
      activeIndex: 'songs',
      queryInfo: {
        keywords: '',
        // type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
        type: 1,
        // limit : 返回数量 , 默认为 30
        limit: 30,
        // offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
        offset: 1,
      },
      // 搜索结果
      searchResult: [],
      // 搜索总计
      count: 0,
      // 是否加载更多
      disabled: false,
    }
  },
  computed: {
    // 从vuex里导入 需要的 歌曲信息
    // ...mapState(['searchMusicInfo', 'currentMusicInfo']),
    ...mapState(['currentMusicInfo']),
    // watch的路由信息
    searchQueryInfo() {
      return this.$route.query.q
    },
  },
  created() {
    // 初次查询信息
    this.queryInfo.keywords = this.$route.query.q
    // 有可能没传入 所以加入 ||
    this.queryInfo.type = this.$route.query.type || 1
    this.queryInfo.limit = this.$route.query.limit || 30
    this.searchMusic()
  },
  destroyed() {
    console.log('destroyed')
    console.log(this.disabled)
    this.disabled = false
  },
  watch: {
    // 切换面板 查询信息
    activeIndex(newVal) {
      let type = null
      switch (newVal) {
        case 'songs':
          type = 1
          break
        case 'lists':
          type = 1000
          break
        case 'mv':
          type = 1004
          break
        default:
          type = 1
          break
      }
      this.queryInfo.type = type
      this.searchMusic()
    },
    // 当在result页面搜索的时候触发该函数
    searchQueryInfo: {
      handler: function () {
        this.queryInfo.keywords = this.$route.query.q
        this.searchMusic()
      },
      deep: true,
    },
  },
  methods: {
    // 搜索音乐
    async searchMusic() {
      // 获取歌曲信息
      const { data: data } = await this.$axios.get('/search', {
        params: {
          keywords: this.queryInfo.keywords,
          type: this.queryInfo.type || 1,
          limit: this.queryInfo.limit || 30,
          offset: this.queryInfo.offset || 1,
        },
      })
      if (data.code == 200) {
        this.count = data.result.songCount || data.result.playlistCount || data.result.mvCount
        this.searchResult = data.result
      }
    },
    // 播放音乐
    playMusic(id, name) {
      this.$store.dispatch('getMusicUrl', id)
      this.$notify({
        title: '开始播放：' + this.queryInfo.keywords + ' ' + name,
        offset: 50,
      })
    },
  },
}
</script>

<style scoped>
tr,
th,
td,
song-wrap,
name-wrap {
  user-select: none;
}
</style>
