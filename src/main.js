import { createApp } from 'vue'
import App from './App.vue'

// importa o i18n e os ficheiros de tradução
import { createI18n } from 'vue-i18n'
import pt from './translations/pt.json'
import en from './translations/en.json'


const i18n = createI18n({
    locale: 'pt',          // língua padrão
    fallbackLocale: 'en',  // caso não encontre, usa inglês
    messages: {
        pt,
        en
    }
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')