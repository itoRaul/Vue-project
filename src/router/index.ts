import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import QuestionView from '../views//question/QuestionView.vue'
import ConfigView from '../views//question/ConfigView.vue'
import RegisterView from '../views//question/RegisterView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /*
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    */
    {
      path: '/questions',
      name: 'questions',
      component: QuestionView,
    },
    {
      path: '/configuration',
      name: 'configuration',
      component: ConfigView,
    },
    {
      path: '/registerquestions',
      name: 'registerquestions',
      component: RegisterView,
    },
  ],
})

export default router
