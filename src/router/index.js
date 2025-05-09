import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

// Pages
import HomePage from '@/pages/HomePage.vue';
import ProjectsPage from '@/pages/ProjectsPage.vue';
import ProjectDetailPage from '@/pages/ProjectDetailPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';


// Admin Pages
import LoginPage from '@/pages/admin/LoginPage.vue';
import RegisterPage from '@/pages/admin/RegisterPage.vue';
import DashboardPage from '@/pages/admin/DashboardPage.vue';
import ProjectsAdmin from '@/pages/admin/ProjectsAdmin.vue';
import ExperienceAdmin from '@/pages/admin/ExperienceAdmin.vue';
import SkillsAdmin from '@/pages/admin/SkillsAdmin.vue';
import ProfileAdmin from '@/pages/admin/ProfileAdmin.vue';

const routes = [
  // Public Routes
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { title: 'Ana Sayfa' }
  },
  {
    path: '/projects',
    name: 'Projects',
    component: ProjectsPage,
    meta: { title: 'Projeler' }
  },
  {
    path: '/projects/:id',
    name: 'ProjectDetail',
    component: ProjectDetailPage,
    meta: { title: 'Proje Detayı' },
    props: true
  },
  
  // Admin Routes
  {
    path: '/admin/login',
    name: 'Login',
    component: LoginPage,
    meta: { title: 'Admin Girişi', guestOnly: true }
  },
  

  {
    path: '/admin/register',
    name: 'Register',
    component: RegisterPage,
    meta: { title: 'Admin Kaydı', guestOnly: true }
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: DashboardPage,
    meta: { title: 'Admin Paneli', requiresAuth: true }
  },
  {
    path: '/admin/projects',
    name: 'AdminProjects',
    component: ProjectsAdmin,
    meta: { title: 'Projeler Yönetimi', requiresAuth: true }
  },
  {
    path: '/admin/experiences',
    name: 'AdminExperiences',
    component: ExperienceAdmin,
    meta: { title: 'Deneyimler Yönetimi', requiresAuth: true }
  },
  {
    path: '/admin/skills',
    name: 'AdminSkills',
    component: SkillsAdmin,
    meta: { title: 'Yetenekler Yönetimi', requiresAuth: true }
  },
  {
    path: '/admin/profile',
    name: 'AdminProfile',
    component: ProfileAdmin,
    meta: { title: 'Profil Yönetimi', requiresAuth: true }
  },
  
  // Not Found Route
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
    meta: { title: 'Sayfa Bulunamadı' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      };
    }
    
    if (savedPosition) {
      return savedPosition;
    }
    
    return { top: 0 };
  }
});

// Navigation guards
router.beforeEach(async (to, from, next) => {
  // Update page title
  document.title = `${to.meta.title || 'Portfolyo'} | Portfolyo`;
  
  const authStore = useAuthStore();
  const isLoggedIn = authStore.isAuthenticated;
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !isLoggedIn) {
    return next({ name: 'Login', query: { redirect: to.fullPath } });
  }
  
  // Check if route is for guest only (like login)
  if (to.meta.guestOnly && isLoggedIn) {
    return next({ name: 'AdminDashboard' });
  }
  
  next();
});

export default router;
