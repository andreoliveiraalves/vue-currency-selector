<template>
    <button @click="toggleLang" type="button" class="btn btn-primary">
        {{ currentLang === 'pt' ? 'Português' : 'English' }}
    </button>
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
    name: 'LangToggler',
    setup() {
        const { locale } = useI18n()

        function toggleLang() {
            locale.value = locale.value === 'pt' ? 'en' : 'pt'
        }

        return { currentLang: locale, toggleLang }
    }
}
</script>
