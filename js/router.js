class Router {

  constructor(routes) {
    this.routes = routes;
    this._loadInitialRoute();
  }

  loadRoute(...urlSegments) {
    // Get the template for the given route.
    const matchedRoute = this._matchUrlToRoute(urlSegments);

    // Push a history entry with the new url.
    // We pass an empty object and an empty string as the historyState and title arguments, but their values do not really matter here.
    const url = `/${urlSegments.join('/')}`;
    history.pushState({}, '', url);

    // Append the given template to the DOM inside the router outlet.
    const routerOutletElement = document.querySelectorAll('[data-router-outlet]')[0];
    routerOutletElement.innerHTML = matchedRoute.getTemplate(matchedRoute.params);
  }

  _matchUrlToRoute(urlSegments) {
    // Try and match the URL to a route.
    const routeParams = {};
    const matchedRoute = this.routes.find(route => {
      
      // We assume that the route path always starts with a slash, and so 
      // the first item in the segments array  will always be an empty
      // string. Slice the array at index 1 to ignore this empty string.
      const routePathSegments = route.path.split('/').slice(1);

      // If there are different numbers of segments, then the route does not match the URL.
      if (routePathSegments.length !== urlSegments.length) {
        return false;
      }

      // If each segment in the url matches the corresponding segment in the route path, 
      // or the route path segment starts with a ':' then the route is matched.
      const match = routePathSegments.every((routePathSegment, i) => {
        return routePathSegment === urlSegments[i] || routePathSegment[0] === ':';
      });

      // If the route matches the URL, pull out any params from the URL.
      if (match) {
        routePathSegments.forEach((segment, i) => {
          if (segment[0] === ':') {
            const propName = segment.slice(1);
            routeParams[propName] = decodeURIComponent(urlSegments[i]);
          }
        });
      }
      return match;
    });
    
    return { ...matchedRoute, params: routeParams };
  }

  _loadInitialRoute() {
    // Figure out the path segments for the route which should load initially.
    const pathnameSplit = window.location.pathname.split('/');
    const pathSegments = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : '';
    // Load the initial route.
    this.loadRoute(...pathSegments );
  }
}