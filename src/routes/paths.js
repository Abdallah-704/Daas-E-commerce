// Define all route paths as constants to avoid typos and enable easy updates
export const PATHS = {
  // Public paths
  HOME: '/',
  CATEGORIES: '/categories',
  PRODUCT: '/product/:id',

  // Auth paths
  LOGIN: '/login',
  REGISTER: '/register',
  LOGOUT: '/logout',
  GOOGLE_CALLBACK: '/auth/google/callback',

  // Dashboard paths
  DASHBOARD: '/dashboard',
  USERS: '/dashboard/users',
  USER_DETAIL: '/dashboard/users/:id',
  USER_ADD: '/dashboard/user/add',
  CATEGORIES_DASHBOARD: '/dashboard/categories',
  CATEGORY_EDIT: '/dashboard/categories/:id',
  CATEGORY_ADD: '/dashboard/categorie/add',
  PRODUCTS: '/dashboard/products',
  PRODUCT_EDIT: '/dashboard/products/:id',
  PRODUCT_ADD: '/dashboard/product/add',
  WRITER: '/dashboard/writer',

  // Error paths
  NOT_FOUND: '/*'
}; 