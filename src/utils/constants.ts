const API_BASE = 'api';

enum LocalRoutes {
  AUTH = 'auth',
  USERS = 'users',
  CATEGORIES = 'categories',
}

export const Routes = new Proxy(LocalRoutes, {
  get: (target, prop) => {
    const value = target[prop];
    return `${API_BASE}/${value}`;
  },
});
