// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

//importação dos componentes do PrimeVue
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Dialog from 'primevue/dialog';
import FloatLabel from 'primevue/floatlabel';
import ColorPicker from 'primevue/colorpicker';
import 'primeicons/primeicons.css';
import Card from 'primevue/card';
import RadioButton from 'primevue/radiobutton';
import RadioButtonGroup from 'primevue/radiobuttongroup';



import App from './App.vue'
import router from './router'

const app = createApp(App)


app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.component('Button', Button);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('InputText', InputText);
app.component('Select', Select);
app.component('Dialog', Dialog);
app.component('FloatLabel', FloatLabel);
app.component('ColorPicker', ColorPicker);
app.component('Card', Card);
app.component('RadioButton', RadioButton);
app.component('RadioButtonGroup', RadioButtonGroup);

app.mount('#app')
