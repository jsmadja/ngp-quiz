// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import moment from 'moment';

import App from './App';
import router from './router';
import store from './store';

Vue.use(Vuetify);
Vue.config.productionTip = false;

Vue.filter('formatDate', (value) => {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY');
  }
  return value;
});

Vue.filter('formatNumber', value => value.toLocaleString('de'));

Vue.filter('percent', value => `${value}%`);

Vue.filter('formatRank', (index) => {
  const rank = index + 1;
  const hundredRemainder = rank % 100;
  const tenRemainder = rank % 10;
  if (hundredRemainder - tenRemainder === 10) {
    return `${rank}th`;
  }
  switch (tenRemainder) {
    case 1:
      return `${rank}st`;
    case 2:
      return `${rank}nd`;
    case 3:
      return `${rank}rd`;
    default:
      return `${rank}th`;
  }
});

Vue.filter('time', value => moment(value * 1000).format('mm:ss'));

Vue.filter('completion', completion => `${Math.round(completion, 2)}%`);

Vue.filter('accuracy', accuracy => `${Math.round(accuracy, 2)}%`);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
