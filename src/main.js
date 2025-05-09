import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/styles/main.css';

// Create app instance
const app = createApp(App);

// Use plugins
app.use(createPinia());
app.use(router);

// Mount app
app.mount('#app');
