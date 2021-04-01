import Vue from 'Vue'
import Vuex from 'Vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 音乐地址
    musicUrl: '',
    random: '',
    // 搜索得到的信息
    searchMusicInfo: '',
    // 当前歌曲信息
    currentMusicInfo: null,
    // 歌单信息
    playList: {},
    // 评论信息
    commentInfo: {}
  },
  // 只有 mutations中的函数才有权利修改 state。
  // 不能在 mutations里执行异步操作。
  mutations: {
    // 更新音乐地址
    updateMusicUrl(state, data) {
      // 音乐地址
      let url = data[0].url
      if (state.musicUrl == url) {
        state.random = Date.now()
      } else {
        state.currentMusicInfo = data[0]
        state.musicUrl = url
      }
    },
    // 更新搜索到的歌曲名字
    updateMusicInfo(state, data) {
      state.searchMusicInfo = data
    },
    // 更新歌单信息
    updatePlayList(state, data) {
      state.playList = data.playlist
    },
    // 更新获取到的评论信息
    updateCommentInfo(state, data) {
      state.commentInfo = data
    }
  },
  // 在Actions 中不能直接修改 state中的数据，要通过 mutations修改。
  actions: {
    // 获取音乐地址
    async getMusicUrl(context, id) {
      const { data: data } = await axios.get('/song/url', {
        params: {
          id,
        },
      })
      if (data.code == 200) {
        console.log(data.data[0].url);
        // context.commit('updateMusicUrl', data.data[0].url)
        context.commit('updateMusicUrl', data.data)
      }
    },
    // 搜索音乐
    async searchMusic(context, queryInfo) {
      // 获取歌曲信息
      const { data: data } = await axios.get('/search', {
        params: {
          keywords: queryInfo.keywords,
          type: queryInfo.type,
          limit: queryInfo.limit
        },
      })
      data.result.keywords = queryInfo.keywords
      context.commit('updateMusicInfo', data.result)
      console.log(data);
    },
    // 获取歌单详情
    async getMusicListDetail(context, id) {
      const { data: data } = await axios.get('/playlist/detail', { params: { id }, })
      if (data.code == 200) {
        context.commit('updatePlayList', data)
      }
    },
    // 获取歌单评论信息
    async getMusicComment(context, queryInfo) {
      const { data: data } = await axios.get('/comment/playlist', {
        params: {
          // id: 歌单 id
          //可选参数 : 
          // limit: 取出评论数量 , 默认为 20
          // offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
          // before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
          id: queryInfo.id,
        },
      })
      let newData = {
        comments: data.comments,
        hotComments: data.hotComments,
        total: data.total
      }
      if (data.code == 200) {
        context.commit('updateCommentInfo', newData)
      }
    }
  },
  getters: {
    // 相当于组件的计算属性
  },
})