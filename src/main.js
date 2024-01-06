import { createApp } from 'vue';
import App from './App.vue';
import VueSignaturePad from 'vue-signature-pad';
import '@fontsource-variable/inter';
import router from './router';

const app = createApp(App);
app.use(VueSignaturePad);
app.use(router);
app.mount('#app');
app.component('vue-signature-pad', VueSignaturePad);

