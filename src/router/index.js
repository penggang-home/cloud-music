import Vue from 'vue'
import VueRouter from 'vue-router'
// 路由整合
Vue.use(VueRouter)

// 导入对应的路由
import discovery from '@/views/01.discovery.vue'
import playlists from '@/views/02.playlists.vue'
import songs from '@/views/03.songs.vue'
import mvs from '@/views/04.mvs.vue'
import result from '@/views/05.result.vue'
import playlist from '@/views/06.playlist.vue'
import mv from '@/views/07.mv.vue'
import test from '@/views/test.vue'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/discovery'
    },
    {
      // 发现音乐
      path: '/discovery',
      component: discovery
    },
    {
      // 推荐歌单
      path: '/playlists',
      component: playlists
    },
    {
      // 推荐歌单
      path: '/playlist',
      component: playlist
    },
    {
      // 最新音乐
      path: '/songs',
      component: songs
    },
    {
      // 最新音乐
      path: '/mvs',
      component: mvs
    },
    // mv详情
    {
      path: '/mv',
      component: mv
    },
    // 搜索结果页
    {
      path: '/result',
      component: result
    },
    {
      path: '/test',
      component: test
    }
  ],
  mode: 'history'
})

export default router