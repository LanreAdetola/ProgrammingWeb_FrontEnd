import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './components/HomePage.vue';
import UserPage from './components/UserPage.vue';
import LoginPage from './components/LoginPage.vue';
import SearchResultsPage from './components/SearchResults.vue';
import ListProperty from './components/ListProperty.vue';
import DashBoard from './components/DashBoard.vue';
import SpotProfile from './components/SpotProfile.vue';
import ViewCampingSpot from '@/components/ViewCampingSpot.vue';
import SingularCampingSpot from '@/components/SingularCampingSpot.vue';
import AdminDashboard from '@/components/AdminDashboard.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    { 
      path: '/list-property',
      name: 'List Property',
      component: ListProperty
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'Register',
      component: UserPage
    },
    {
      path: '/searchresults',
      name: 'SearchResults',
      component: SearchResultsPage
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashBoard,
      meta: { requiresAuth: true }
    },
    {
      path: '/spot/:id',
      name: 'SpotProfile',
      component: SpotProfile
    },
    {
      path: '/camping-spot/:id',
      name: 'viewCampingSpot',
      component: ViewCampingSpot,
      props: true
    },
    {
      path: '/camping-spot/:id/edit',
      name: 'editCampingSpot',
      component: SingularCampingSpot,
      props: true
    },
    {
      path: '/admin',
      name: 'AdminDashboard',
      component: AdminDashboard,
      meta: { requiresAuth: true, requiresAdmin: true } 
    }
  ]
});

router.beforeEach((to, from, next) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const loggedIn = userData !== null;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  if (requiresAuth && !loggedIn) {
    next('/login');
  } else if (requiresAdmin && (!userData || !userData.isAdmin)) {
    next('/'); // Redirect to home or some other page if user is not an admin
  } else {
    next();
  }
});

export default router;
