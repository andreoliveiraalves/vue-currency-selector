<template>
    <button @click="toggleLang" type="button" class="lang-toggle-btn"
        :aria-label="`Switch to ${currentLang === 'pt' ? 'English' : 'Portuguese'}`">
        <div class="lang-toggle-content">
            <span class="lang-icon">🌐</span>
            <span class="lang-text">{{ currentLang === 'pt' ? 'PT' : 'EN' }}</span>
        </div>
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

<style scoped>
.lang-toggle-btn {
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 1000;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 50px;
    padding: 0.75rem 1.25rem;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.lang-toggle-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    background: linear-gradient(135deg, #7c8fee 0%, #8a5cb8 100%);
}

.lang-toggle-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
}

.lang-toggle-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    font-weight: 600;
    font-size: 0.875rem;
    letter-spacing: 0.5px;
}

.lang-icon {
    font-size: 1rem;
    animation: pulse 2s infinite;
}

.lang-text {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.8;
    }
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    .lang-toggle-btn {
        top: 0.75rem;
        right: 0.75rem;
        padding: 0.625rem 1rem;
    }

    .lang-toggle-content {
        font-size: 0.8rem;
        gap: 0.375rem;
    }

    .lang-icon {
        font-size: 0.875rem;
    }
}

@media (max-width: 480px) {
    .lang-toggle-btn {
        top: 0.5rem;
        right: 0.5rem;
        padding: 0.5rem 0.875rem;
    }

    .lang-toggle-content {
        font-size: 0.75rem;
        gap: 0.25rem;
    }
}

/* Ensure it doesn't interfere with scroll bars */
@media (max-width: 320px) {
    .lang-toggle-btn {
        right: 0.25rem;
    }
}

/* High DPI displays */
@media (-webkit-min-device-pixel-ratio: 2),
(min-resolution: 192dpi) {
    .lang-toggle-btn {
        border-width: 0.5px;
    }
}
</style>