<template>
  <div class="top-container">
    <div class="left dflex">
      <img src="/images/home.svg" class="homeImg" align="middle" alt="" />
      <el-tooltip class="item" effect="dark" content="去主页：www.bookbook.cc" placement="right">
        <a href="https://www.bookbook.cc" target="blank">bookbook.cc</a>
      </el-tooltip>
    </div>
    <div class="center">
      <el-autocomplete
        @keyup.native.enter="search"
        v-model="inputValue"
        :fetch-suggestions="getSearchAsync"
        :placeholder="placeholder"
        @select="handleSelect"
        prefix-icon="el-icon-search"
        clearable
        class="border-radius"
        size="small"
      ></el-autocomplete>
    </div>
    <div class="right">
      <el-switch v-model="state" @change="changeState"> </el-switch>
      <el-tooltip class="item" effect="dark" content="指不定哪天派上用场~" placement="bottom">
        <el-button type="danger" size="small" round v-popover:popover>
          <i class="iconfont icon-power"></i>
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: 'top',
  data() {
    return {
      // 输入提示
      placeholder: '',
      // 输入的内容
      inputValue: '',
      // 热搜列表
      searchHot: [],
      // 热搜推荐列表
      searchHotList: [],
      // 用于标识是系统请求，还是用户请求
      auth: '',
      // 暂存搜索关键字
      searchKeywords: '',
      // 开关状态  是否显示音乐面板
      state: true,
    }
  },
  created() {
    // 获取默认搜索关键词
    this.getDefaultKeywords()
  },
  computed: {},
  methods: {
    // 改变开关装填的回调
    changeState() {
      // this.$store.commit('updateIsControl', state)
      this.$Bus.$emit('switchState',this.state)
    },
    // 返回主页
    goHome() {
      this.$router.push('/discovery')
    },
    // 搜索方法
    search() {
      // 新搜索结果等于旧搜索结果 取消搜索
      if (this.$route.query.q == this.inputValue.trim()) {
        return
      }

      if (this.inputValue.trim() == '') {
        this.$message('请输入搜索内容~')
        return
      }

      // 去搜索页面
      if (this.$route.path != '/result') {
        this.$router.push(`/result?q=${this.inputValue}`)
      } else {
        this.$router.replace(`/result?q=${this.inputValue}`)
      }
    },
    // 获取默认搜索提示和关键字
    async getDefaultKeywords() {
      const { data: data } = await this.$axios.get('/search/default')
      if (data.code == 200) {
        this.placeholder = data.data.showKeyword
        // 关键字
        // this.inputValue = data.data.realkeyword
      }
    },
    // 搜索推荐+搜索多重匹配
    async getSearchAsync(queryString, cb) {
      if (this.inputValue == '') {
        // 如果有数据就不需要重新请求
        if (this.searchHotList != '') return cb(this.searchHotList)
        this.auth = 'system'
        this.searchHotList = []
        // 获取推荐搜索信息
        const { data: data } = await this.$axios.get('/search/hot/')
        if (data.code == 200) {
          data.result.hots.forEach(item => {
            this.searchHotList.push({ value: item.first })
          })
          cb(this.searchHotList)
        }
      } else {
        // 判断有没有输入新的字符
        if (queryString == this.searchKeywords) return cb(this.searchHot)

        this.auth = 'user'
        this.searchHot = []
        // 获取搜索建议
        const { data: data } = await this.$axios.get(`/search/suggest?keywords=${queryString}`)
        if (data.code == 200) {
          this.searchKeywords = queryString
          // 歌曲 songs
          if (data.result.songs && data.result.songs.length > 0) {
            data.result.songs.forEach(item => {
              this.searchHot.push({
                // value: '歌曲：' + item.name + '—' + item.artists[0].name,
                value: item.name + '—' + item.artists[0].name,
                id: item.id,
                type: 'songs',
              })
            })
          }
          // 专辑  albums
          // if (data.result.albums && data.result.albums.length > 0) {
          //   data.result.albums.forEach(item => {
          //     this.searchHot.push({
          //       value: '专辑：' + item.name + '——' + item.artist.name,
          //       id: item.id,
          //       type: 'albums',
          //     })
          //   })
          // }
          // 歌单 playlists
          // if (data.result.playlists && data.result.playlists.length > 0) {
          //   data.result.playlists.forEach(item => {
          //     this.searchHot.push({
          //       value: '歌单：' + item.name + '——' + item.name,
          //       id: item.id,
          //       type: 'playlists',
          //     })
          //   })
          // }
          cb(this.searchHot)
        }
      }
    },
    // 创建状态过滤器
    handleSelect(item) {
      this.search()
    },
  },
}
</script>

<style  scoped>
.top-container {
  padding: 0;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.center {
  flex-basis: 400px;
}
.el-autocomplete {
  width: 100%;
}
.left .homeImg {
  width: 28px;
  height: auto;
  object-fit: cover;
}
.left {
  flex-basis: 200px;
  text-align: center;
}
.left a {
  padding-left: 5px;
  font-size: 22px;
  color: black;
}
</style>
