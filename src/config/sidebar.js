export default [
    {
      name: '首页',
      lang: 'home',
      menu_url: '/'
    },
    {
      name: '打样业务',
      lang: 'dayangyewu',
      child: [
        {
            name: '打样单',
            lang: 'dayangdan',
            menu_url: '/danyangdan',
        },
        {
            name: '打样单列表',
            lang: 'dayangdanliebiao',
            menu_url: '/danyangdan-list',
        },
      ]
    },
    {
      name: '配置',
      menu_url: 'config'
    }
]