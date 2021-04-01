<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="playList.coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <!-- 歌单名称 -->
        <p class="title">{{ playList.name }}</p>
        <div class="author-wrap">
          <!-- 创建者头像 -->
          <img class="avatar" :src="playList.creator.avatarUrl" alt="" />
          <!-- 创建者昵称 -->
          <span class="name">{{ playList.creator.nickname }}</span>
          <!-- 创建时间 -->
          <span class="time">{{ playList.createTime | LocaleDateString }}创建</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="(item, index) in playList.tags" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc">{{ playList.description }}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
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
            <tr class="el-table__row" v-for="(item, index) in playList.tracks" :key="index">
              <td>{{ index + 1 }}</td>
              <td>
                <div class="img-wrap">
                  <img :src="item.al.picUrl" alt="" />
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
                </div>
              </td>
              <!-- 歌手名称 -->
              <td>{{ item.ar[0].name }}</td>
              <!-- 专辑名称 -->
              <td>{{ item.al.name }}</td>
              <td>{{ item.dt | formatDuration }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>

      <el-tab-pane :label="'评论('+count+')'" name="2">
        <!-- 精彩评论 -->
        <div v-if="commentInfo.hotComments" class="comment-wrap">
          <p class="title">
            精彩评论<span class="number">{{ `(${commentInfo.hotComments.length})` }}</span>
          </p>
          <div class="comments-wrap">
            <div class="item" v-for="(item, index) in commentInfo.hotComments" :key="index">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{ item.user.nickname }}</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <!-- <div class="re-content">
                  <span class="name">小苹果：</span>
                  <span class="comment">还是小时候比较可爱</span>
                </div> -->
                <!-- <div class="date">2020-02-12 17:26:11</div> -->
                <div class="date">{{ item.time }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">
            最新评论<span class="number">{{ `(${commentInfo.total})` }}</span>
          </p>
          <div class="comments-wrap">
            <div class="item" v-for="(item, index) in commentInfo.comments" :key="index">
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
                <div class="date">{{ item.time }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页器 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[5,10, 20, 30, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'playlist',
  data() {
    return {
      activeIndex: '1',
    }
  },
  computed: {
    ...mapState(['playList', 'commentInfo']),
    // 评论总数
    count() {
      return this.commentInfo.total + this.commentInfo.hotComments.length
    },
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
  },
}
</script>

<style >
</style>
