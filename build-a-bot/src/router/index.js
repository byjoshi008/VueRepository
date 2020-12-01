import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../home/HomePage.vue';
import RobotBuilder from '../robot-builder/RobotBuilder.vue';
import PartInfo from '../parts/PartInfo.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [{
    path: '/',
    name: 'Home',
    component: HomePage,
  }, {
    path: '/build',
    name: 'Build',
    component: RobotBuilder,
  }, {
    path: '/parts/:partType/:id',
    name: 'Parts',
    component: PartInfo,
    props: true,
  }],
});
