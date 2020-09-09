import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: () => import('./views/app'),
      redirect: '/welcome',
      children: [{
          path: 'welcome',
          name: 'welcome',
          component: () => import('./views/app/home')
        },
        {
          path: 'goods_management',
          name: 'goods_management',
          component: () => import('./views/app/goods_management'),
          redirect: '/goods_management/goods_index/goods_list',
          children: [{
              path: 'banner_list',
              name: 'banner_list',
              component: () => import('./views/app/goods_management/banner_list/index.vue')
            },
            {
              path: 'goods_index',
              name: 'goods_index',
              component: () => import('./views/app/goods_management/goods_list/index.vue'),
              redirect: '/goods_management/goods_index/goods_list',
              children:[
                {
                  path: 'goods_list',
                  name: 'goods_list',
                  component: () => import('./views/app/goods_management/goods_list/goods_list.vue')
                },
                {
                  path: 'goods_info/:id',
                  name: 'goods_info',
                  component: () => import('./views/app/goods_management/goods_list/goods_info.vue')
                }
              ]
            },
            {
              path: 'goods_type',
              name: 'goods_type',
              component: () => import('./views/app/goods_management/goods_type/index.vue')
            }
          ]
        },
        {
          path: 'special_management',
          name: 'special_management',
          component: () => import('./views/app/special_management/index.vue'),
          redirect: '/special_management/pt_manage',
          children: [{
              path: 'pt_manage',
              name: 'pt_manage',
              component: () => import('./views/app/special_management/PtManage.vue')
            },
            {
              path: 'kj_manage',
              name: 'kj_manage',
              component: () => import('./views/app/special_management/KjManage.vue')
            },
            {
              path: 'so_manage',
              name: 'so_manage',
              component: () => import('./views/app/special_management/SoManage.vue')
            },
            {
              path: 'article_manage',
              name: 'article_manage',
              component: () => import('./views/app/special_management/articleManage'),
              redirect: '/special_management/article_manage/article_list',
              children: [{
                path: 'article_list',
                name: 'article_list',
                component: () => import('./views/app/special_management/articleManage/articleManage.vue'),
              }, {
                path: 'article_detail/:id',
                name: 'article_detail',
                component: () => import('./views/app/special_management/articleManage/EditArticleInfo.vue'),
              }]
            },
          ]
        },
        {
          path: 'order_management',
          name: 'order_management',
          component: () => import('./views/app/order_management/index.vue'),
          redirect: '/order_management/order_list',
          children: [{
              path: 'order_list',
              name: 'order_list',
              component: () => import('./views/app/order_management/OrderList.vue')
            },
            {
              path: 'kj_manage',
              name: 'kj_manage',
              component: () => import('./views/app/special_management/KjManage.vue')
            }
          ]
        },
        {
          path: 'user_management',
          name: 'user_management',
          component: () => import('./views/app/user/index.vue'),
          redirect: '/user_management/user_list',
          children: [{
              path: 'user_list',
              name: 'user_list',
              component: () => import('./views/app/user/UserList.vue')
            },
            {
              path: 'admin_list',
              name: 'admin_list',
              component: () => import('./views/app/user/AdminList.vue')
            },
          ]
        },
        {
          path: 'system_management',
          name: 'system_management',
          component: () => import('./views/app/system_management/index.vue'),
          redirect: '/system_management/search_history_list',
          children: [{
            path: 'search_history_list',
            name: 'search_history_list',
            component: () => import('./views/app/system_management/searchHistoryList.vue')
          }, ]
        },

      ]
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('./views/signin/Signin.vue')
    },
    {
      path: '/*',
      name: '404',
      component: () => import('./views/NotFound/index.vue')
    }
  ]
})