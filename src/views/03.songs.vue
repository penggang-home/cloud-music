<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span :class="['item', { active: tagId == '0' }]" @click="tagId = 0">全部</span>
      <span :class="['item', { active: tagId == '7' }]" @click="tagId = 7">华语</span>
      <span :class="['item', { active: tagId == '96' }]" @click="tagId = 96">欧美</span>
      <span :class="['item', { active: tagId == '8' }]" @click="tagId = 8">日本</span>
      <span :class="['item', { active: tagId == '16' }]" @click="tagId = 16">韩国</span>
    </div>
    <!-- 底部的table -->
    <table class="el-table playlit-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr class="el-table__row" v-for="(item, index) in list" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <!-- Vuex方式一：使用辅助函数 -->
            <div class="img-wrap" @click="getMusicUrl(item.id)">
              <!-- Vuex方式二：手动 dispatch -->
              <!-- <div class="img-wrap" @click="playMusic(item.id)"> -->
              <img :src="item.album.picUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <!-- 音乐标题 -->
                <span>{{ item.name }}</span>
                <span class="iconfont icon-mv"></span>
              </div>
              <span></span>
            </div>
          </td>
          <!-- 歌手 -->
          <td>{{ item.album.artists[0].name }}</td>
          <!-- 专辑 -->
          <td>{{ item.album.name }}</td>
          <td>{{ item.duration | formatDuration}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'songs',
  data() {
    return {
      // 歌曲列表
      list: [],
      // 分类id 全部:0华语:7欧美:96日本:8韩国:16
      tagId: 0,
    }
  },
  watch: {
    // 监听
    tagId(val) {
      this.getNewMusic()
    },
  },
  created() {
    this.getNewMusic()
  },
  methods: {
    // 1.Vuex方式一 使用辅助函数
    ...mapActions(['getMusicUrl']),
    // 获取最新音乐数据
    async getNewMusic() {
      console.log(this.tagId)
      const { data: data } = await this.$axios.get('/top/song', {
        params: {
          // 地区类型ID
          type: this.tagId,
        },
      })
      if (data.code == 200) {
        this.list = data.data
        // 处理时长 毫秒转为 分秒
        // for (let i = 0; i < this.list.length; i++) {
        //   // 拿到毫秒
        //   let duration = this.list[i].duration
        //   // 分钟：向下取整，转为字符，不足两位补零
        //   let minute = Math.floor(duration / 1000 / 60)
        //     .toString()
        //     .padStart(2, '0')
        //   let second = Math.floor((duration / 1000) % 60)
        //     .toString()
        //     .padStart(2, '0')
        //   this.list[i].duration = minute + ':' + second
        // }
      }
    },
    // 2.Vuex方式二
    // 手动 dispatch
    // playMusic(id) {
    //   this.$store.dispatch('getMusicUrl',id)
    // },
  },
}
</script>

<style >
</style>
