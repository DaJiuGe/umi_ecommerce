export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/login',
        component: '../layouts/LoginLayout',
        routes: [
          {
            name: 'login',
            path: '/login',
            component: './Login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/dashboard',
              },
              {
                name: 'DashBoard',
                path: '/dashboard',
                icon: 'PieChartOutlined',
                component: './DashBoard',
              },
              {
                name: 'User',
                path: '/user',
                icon: 'UserOutlined',
                component: './User',
              },
              {
                name: 'Goods',
                path: '/goods',
                icon: 'ShoppingOutlined',
                component: './Goods',
              },
              {
                name: 'Category',
                path: '/category',
                icon: 'BarsOutlined',
                component: './Category',
              },
              {
                name: 'Order',
                path: '/order',
                icon: 'MoneyCollectOutlined',
                component: './Order',
              },
              {
                name: 'Comment',
                path: '/comments',
                icon: 'CommentOutlined',
                component: './Comment',
              },
              {
                name: 'Slide',
                path: '/slide',
                icon: 'SlidersOutlined',
                component: './Slide',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
