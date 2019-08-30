// TODO: router class?

function loadRoute(...path) {
  // Page title for this route.
  const pageTitle = '';
  // History state object for this route.
  const historyState = {};
  // pushState, this modifies the current URL, without making any server request for a new page.
  const url = `/${path.join('/')}`
  history.pushState(historyState, pageTitle, url);
  // Get the template for the given route.
  const templateHTML = matchPathToTemplate(path);
  const routerOutletElement = document.querySelectorAll('[data-router-outlet]')[0];
  routerOutletElement.innerHTML = '';
  routerOutletElement.insertAdjacentHTML('beforeend', templateHTML);
}

function matchPathToTemplate(path) {
  console.log(path);
  return routes[path[0]].template;
}

// TODO: separate file.
const routes = {
  '': {
    template: '<h1>Home</h1>'
  },
  'about': {
    template: '<h1>About</h1>',
    children: {
      'my-life-story': {
        template: ''
      },
      'my-hobbies': {
        template: '',
      }
    }
  },
  'contact': {
    template: '<h1>Contact</h1>',
  },
  'products/{productId}': {
    template: '',
  },
}