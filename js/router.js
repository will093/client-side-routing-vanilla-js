class Router {

  constructor(routes) {
    this.routes = routes;
    this._loadInitialRoute();
  }

  loadRoute(...pathSegments) {
    // Page title (ie. what appears in the browser tab) for this route.
    const pageTitle = document.title;
    // History state object - window.history.state will be set to this value. We
    // won't use this for anything, so set it to an empty object.
    const historyState = {};
    // Path (relative to the base url) of the new route.
    const path = `/${pathSegments.join('/')}`
    history.pushState(historyState, pageTitle, path);
    // Get the template for the given route.
    const templateHTML = this._matchPathToTemplate(pathSegments);
    // Append the given template to the DOM inside the router outlet.
    const routerOutletElement = document.querySelectorAll('[data-router-outlet]')[0];
    routerOutletElement.innerHTML = '';
    routerOutletElement.insertAdjacentHTML('beforeend', templateHTML);
  }

  _matchPathToTemplate(path) {
    return this.routes[path[0]].template;
  }

  _loadInitialRoute() {
    // Figure out the path segments for the route which should load initially.
    const pathnameSplit = window.location.pathname.split('/');
    const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.splice(1) : '';
    // Load the initial route.
    this.loadRoute(...pathSegments );
  }
}