import Vue from 'vue';
import Router from 'vue-router';
import Game from '@/components/Game';
import Menu from '@/components/Menu';
import Detail from '@/components/Detail';
import Characters from '@/components/Characters';
import Leaderboard from '@/components/Leaderboard';
import Help from '@/components/Help';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/game',
      name: 'Game',
      component: Game,
    },
    {
      path: '/',
      name: 'Menu',
      component: Menu,
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail,
    },
    {
      path: '/characters',
      name: 'Characters',
      component: Characters,
    },
    {
      path: '/leaderboard',
      name: 'Leaderboard',
      component: Leaderboard,
    },
    {
      path: '/help',
      name: 'Help',
      component: Help,
    },
  ],
});
