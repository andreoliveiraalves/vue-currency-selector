<template>
    <select v-model="selectedCurrency" class="form-select" aria-label="Select currency">
        <option v-for="code in rates" :key="code" :value="code">
            {{ code }} - {{ $t(`currencies.${code}`) }}
        </option>
    </select>
</template>

<script>
export default {
    name: 'CurrencySelect',
    data() {
        return {
            selectedCurrency: 'EUR',
            rates: [
                "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP",
                "HKD", "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "MXN", "MYR",
                "NOK", "NZD", "PHP", "PLN", "RON", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"
            ]
        }
    }
}
</script>
