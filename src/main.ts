import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@/scss/style.scss';

import vuetify from './plugins/vuetify';
import { router } from './router';
import App from './App.vue';

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(vuetify).mount('#app');
