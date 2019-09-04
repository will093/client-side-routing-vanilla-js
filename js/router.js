class Router {

  constructor(routes) {
    this.routes = routes;
    this._loadInitialRoute();
  }

  loadRoute(...urlSegments) {
    // Get the template for the given route.
    const matchedRoute = this._matchUrlToRoute(urlSegments);

    // Push a history entry, with the url of the matched route. 
    // We pass an empty object and an empty string as the historyState and title arguments, but their values do not really matter here.
    history.pushState({}, '', matchedRoute.path);

    // Append the given template to the DOM inside the router outlet.
    const routerOutletElement = document.querySelectorAll('[data-router-outlet]')[0];
    routerOutletElement.innerHTML = '';
    // insertAdjacentHtml preserves any event handlers (setting innerHTML does not).
    routerOutletElement.insertAdjacentHTML('beforeend', matchedRoute.template);
  }

  _matchUrlToRoute(urlSegments) {
    // Try and match the URL to a route.
    const matchedRoute = this.routes.find(route => {
      // Assume that the route path always starts with a slash, and so the first item in the segments array 
      // will always be an empty string. Splice the array to ignore this empty string.
      const routePathSegments = route.path.split('/').splice(1);
      // If there are different numbers of segments, then the route does not match the URL.
      if (routePathSegments.length !== urlSegments.length) {
        return false;
      }

      // If each segment in the url matches the corresponding route path, then the route is matched.
      return routePathSegments.every((routePathSegment, i) => routePathSegment === urlSegments[i]);
    });
    return matchedRoute;
  }

  _loadInitialRoute() {
    // Figure out the path segments for the route which should load initially.
    const pathnameSplit = window.location.pathname.split('/');
    const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.splice(1) : '';
    // Load the initial route.
    this.loadRoute(...pathSegments );
  }
}