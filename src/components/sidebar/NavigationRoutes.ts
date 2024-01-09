export interface INavigationRoute {
  name: string
  displayName: string
  meta: { icon: string }
  children?: INavigationRoute[]
}

export default {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: 'menu.dashboard',
      meta: {
        icon: 'vuestic-iconset-dashboard',
      },
    },

    {
      name: 'statistics',
      displayName: 'menu.users_management',
      meta: {
        icon: 'vuestic-iconset-user',
      },
      disabled: true,
      children: [
        {
          name: 'users',
          displayName: 'Users',
        },
        {
          name: 'guide',
          displayName: 'guide request',
        },
        // {
        //   name: 'Permissions',
        //   displayName: 'Permissions',
        // },
      ],
    },
    {
      name: 'statistics',
      displayName: 'Tours',
      meta: {
        icon: 'vuestic-iconset-user',
      },
      disabled: true,
      children: [
        {
          name: 'tour',
          displayName: 'Tours',
        },

      ],
    },

    {
      name: 'statistics',
      displayName: 'Reviews',
      meta: {
        icon: 'vuestic-iconset-user',
      },
      disabled: true,
      children: [
        {
          name: 'guides',
          displayName: 'reviews',
        },

      ],
    },


  ] as INavigationRoute[],
}
