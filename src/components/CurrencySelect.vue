<template>
    <select v-model="internalValue" class="currency-select" aria-label="Select currency">
        <option v-for="code in rates" :key="code" :value="code">
            {{ code }} - {{ $t(`currencies.${code}`) }}
        </option>
    </select>
</template>

<script>
export default {
    name: 'CurrencySelect',
    props: {
        modelValue: {
            type: String,
            default: 'EUR'
        }
    },
    emits: ['update:modelValue'],
    data() {
        return {
            rates: [
                "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP",
                "HKD", "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "MXN", "MYR",
                "NOK", "NZD", "PHP", "PLN", "RON", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"
            ],
            internalValue: this.modelValue
        }
    },
    watch: {
        modelValue(newVal) {
            this.internalValue = newVal
        },
        internalValue(newVal) {
            this.$emit('update:modelValue', newVal)
        }
    }
}
</script>

<style scoped>
.currency-select {
    width: 100%;
    padding: 0.75rem 1.25rem;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    font-weight: 500;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
    transition: all 0.3s ease;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg fill='%23ffffff' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.646 6.646a.5.5 0 0 1 .708 0L8 9.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1rem;
    cursor: pointer;
}

.currency-select:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.currency-select option {
    background: #2f2f4f;
    color: white;
}
</style>
