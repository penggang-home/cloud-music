<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video controls :src="mvUrl"></video>
      </div>

      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="artistAvatarUrl" alt="" />
          </div>
          <!-- 发布者昵称 -->
          <span class="name">{{ mvDetail.artistName }}</span>
        </div>
        <div class="mv-info">
          <!-- mv名称 -->
          <h2 class="title">{{ mvDetail.name }}</h2>
          <span class="date">发布：{{ mvDetail.publishTime }}</span>
          <span class="number">播放：{{ mvDetail.playCount }}次</span>
          <p class="desc">{{ mvDetail.desc }}</p>
        </div>
      </div>

      <!-- 精彩评论 -->
      <div class="comment-wrap" v-if="mvCommentInfo.isHotComments">
        <p class="title">
          精彩评论<span class="number">({{ mvCommentInfo.hotComments.length }})</span>
        </p>
        <div class="comments-wrap">
          <div class="item" v-for="(item, index) in mvCommentInfo.hotComments" :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}：</span>
                <span class="comment">{{ item.content }}</span>
              </div>
              <div class="date">{{ item.time | LocaleString }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 最新评论 -->
      <div class="comment-wrap">
        <p class="title">
          最新评论<span class="number">({{ mvCommentInfo.total }})</span>
        </p>
        <div class="comments-wrap">
          <div class="item" v-for="(item, index) in mvCommentInfo.comments" :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}：</span>
                <span class="comment">{{ item.content }}</span>
              </div>
              <div class="re-content" v-if="item.beReplied[0]">
                <span class="name">{{ item.beReplied[0].user.nickname }}：</span>
                <span class="comment">{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ item.time | LocaleString }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 相关推荐 -->
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item" v-for="(item, index) in similarMv" :key="index">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mv',
  data() {
    return {
      // mv相关信息
      mvUrl: '',
      // 相关推荐
      similarMv: [],
      // MV详情
      mvDetail: {},
      // 歌手头像
      artistAvatarUrl: '',
      // mv评论信息
      mvCommentInfo: {},
    }
  },
  created() {
    let mvId = this.$route.query.id
    console.log('mvId: ', mvId)
    // 获取mv地址
    this.getMvUrl(mvId)
    // 获取相似mv
    this.getSimiMvInfo(mvId)
    // 获取mv信息
    this.getMvDetail(mvId)
    // 获取MV评论信息
    this.getMvComment(mvId)
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    // 获取mvUrl
    async getMvUrl(id) {
      const { data: data } = await this.$axios.get('/mv/url', {
        params: {
          id,
        },
      })
      if (data.code == 200) {
        this.mvUrl = data.data.url
      }
    },
    // 获取相似mv
    async getSimiMvInfo(id) {
      const { data: data } = await this.$axios.get(`/simi/mv?mvid=${id}`)
      if (data.code == 200) {
        this.similarMv = data.mvs
      }
    },
    // 获取mv详细信息
    async getMvDetail(id) {
      const { data: data } = await this.$axios.get(`/mv/detail?mvid=${id}`)
      if (data.code == 200) {
        this.mvDetail = data.data
        // 获取歌手详细信息，拿到歌手头像
        this.getArtisiDetail(this.mvDetail.artists[0].id)
      }
    },
    // 获取歌手信息
    async getArtisiDetail(id) {
      const { data: data } = await this.$axios.get(`/artist/detail?id=${id}`)
      if (data.code == 200) {
        this.artistAvatarUrl = data.data.artist.cover
      }
    },
    // 获取MV评论信息
    async getMvComment(id) {
      // const { data: data } = await this.$axios.get(`/comment/mv?id=${id}`)
      const { data: data } = await this.$axios.get(`/comment/mv?id=5436712  `)
      console.log('data: ', data)
      if (data.code == 200) {
        this.mvCommentInfo.total = data.total
        this.mvCommentInfo.comments = data.comments
        // 判断是否显示精彩评论
        data.hotComments.length > 0 ? (this.mvCommentInfo.isHotComments = true) : (this.mvCommentInfo.isHotComments = false)
        this.mvCommentInfo.hotComments = data.hotComments
      }
    },
  },
}
</script>

<style></style>
