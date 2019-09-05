const routes = [
  {
    path: '/',
    getTemplate: (params) => '<h1>Home</h1>'
  },
  {
    path: '/about',
    getTemplate: (params) => '<h1>About</h1>',
  },
  {
    path: '/contact',
    getTemplate: (params) => '<h1>Contact</h1>',
  },
  {
    path: '/products/:productId',
    getTemplate: (params) => `<h1>Product ${params.productId}</h1>`,
  },
];
