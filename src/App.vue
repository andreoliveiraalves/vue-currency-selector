<template>
  <div class="main-container">
    <Background />
    <LangToggler />

    <div class="content-wrapper">
      <h2 class="title">{{ $t('convert.title') }}</h2>

      <div class="converter-row">
        <div class="converter-group">
          <div class="input-block">
            <AmountInput v-model="amount" id="amount" />
            <CurrencySelect v-model="fromCurrency" />
          </div>
          <div class="flag-wrapper">
            <img class="flag" :src="getFlagUrl(fromCurrency)" :alt="`${fromCurrency} flag`" />
          </div>
        </div>

        <button class="switch-btn" @click="switchCurrencies">⇄</button>

        <div class="converter-group">
          <div class="input-block">
            <AmountInput v-model="convertedAmountInput" />
            <CurrencySelect v-model="toCurrency" />
          </div>
          <div class="flag-wrapper">
            <img class="flag" :src="getFlagUrl(toCurrency)" :alt="`${toCurrency} flag`" />
          </div>
        </div>
      </div>
    </div>
    <a href="https://github.com/andreoliveiraalves/vue-currency-selector" target="_blank" rel="noopener"
      class="github-link" aria-label="Ver repositório no GitHub">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="white"
        class="github-icon">
        <path
          d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.95c.58.1.79-.25.79-.56v-2.03c-3.2.7-3.87-1.54-3.87-1.54a3.05 3.05 0 0 0-1.28-1.69c-1.05-.72.08-.71.08-.71a2.43 2.43 0 0 1 1.77 1.19 2.46 2.46 0 0 0 3.36.96 2.47 2.47 0 0 1 .73-1.54c-2.55-.29-5.23-1.27-5.23-5.63a4.41 4.41 0 0 1 1.17-3.05 4.1 4.1 0 0 1 .11-3.01s.96-.31 3.14 1.17a10.9 10.9 0 0 1 5.72 0C17.9 5.09 18.86 5.4 18.86 5.4a4.1 4.1 0 0 1 .11 3.01 4.41 4.41 0 0 1 1.17 3.05c0 4.37-2.69 5.34-5.25 5.62a2.77 2.77 0 0 1 .79 2.15v3.18c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
      </svg>
    </a>

  </div>
</template>

<script>
import Background from './components/Background.vue'
import LangToggler from './components/LangToggler.vue'
import CurrencySelect from './components/CurrencySelect.vue'
import AmountInput from './components/AmountInput.vue'

export default {
  components: { Background, LangToggler, CurrencySelect, AmountInput },
  data() {
    return {
      amount: '',
      fromCurrency: 'EUR',
      toCurrency: 'USD',
      conversionRate: null,
      convertedAmountInput: ''
    }
  },
  computed: {
    numericAmount() {
      const val = parseFloat(this.amount)
      return isNaN(val) ? 0 : val
    },
    numericConvertedAmount() {
      const val = parseFloat(this.convertedAmountInput)
      return isNaN(val) ? 0 : val
    },
    formattedResult() {
      if (!this.conversionRate || this.numericAmount === 0) return ''
      return `${this.numericAmount} ${this.fromCurrency} = ${this.numericConvertedAmount.toFixed(2)} ${this.toCurrency}`
    }
  },
  watch: {
    fromCurrency: 'fetchRate',
    toCurrency: 'fetchRate',
    amount(newVal) {
      if (!this.conversionRate) return
      const val = parseFloat(newVal)
      this.convertedAmountInput = isNaN(val) ? '' : (val * this.conversionRate).toFixed(2)
    },
    convertedAmountInput(newVal) {
      if (!this.conversionRate) return
      const val = parseFloat(newVal)
      this.amount = isNaN(val) ? '' : (val / this.conversionRate).toFixed(2)
    }
  },
  methods: {
    async fetchRate() {
      if (this.fromCurrency === this.toCurrency) {
        this.conversionRate = 1
        this.convertedAmountInput = this.numericAmount
          ? this.numericAmount.toFixed(2)
          : ''
        return
      }
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=1&from=${this.fromCurrency}&to=${this.toCurrency}`
        )
        const data = await res.json()
        this.conversionRate = data.rates[this.toCurrency] || null
        this.convertedAmountInput = this.numericAmount
          ? (this.numericAmount * this.conversionRate).toFixed(2)
          : ''
      } catch (err) {
        console.error('Error fetching rate:', err)
        this.conversionRate = null
        this.convertedAmountInput = ''
      }
    },
    switchCurrencies() {
      const oldFrom = this.fromCurrency
      this.fromCurrency = this.toCurrency
      this.toCurrency = oldFrom

      const oldAmount = this.amount
      this.amount = this.convertedAmountInput
      this.convertedAmountInput = oldAmount
    },
    getFlagUrl(code) {
      const map = {
        EUR: 'eu', USD: 'us', GBP: 'gb', JPY: 'jp', AUD: 'au',
        CAD: 'ca', CHF: 'ch', CNY: 'cn', BRL: 'br', BGN: 'bg',
        CZK: 'cz', DKK: 'dk', HUF: 'hu', IDR: 'id', ILS: 'il',
        INR: 'in', ISK: 'is', KRW: 'kr', MXN: 'mx', MYR: 'my',
        NOK: 'no', NZD: 'nz', PHP: 'ph', PLN: 'pl', RON: 'ro',
        SEK: 'se', SGD: 'sg', THB: 'th', TRY: 'tr', ZAR: 'za',
        HKD: 'hk'
      }
      const cc = map[code] || code.slice(0, 2).toLowerCase()
      return `https://flagcdn.com/h120/${cc}.png`
    }
  },
  mounted() {
    this.fetchRate()
  }
}
</script>

<style scoped>
@media (max-width: 640px) {
  .converter-row {
    flex-direction: column;
    align-items: stretch;
    gap: 2rem;
  }

  .input-block {
    width: 100%;
  }

  .switch-btn {
    transform: rotate(90deg);
    align-self: center;
  }
}

.main-container {
  position: relative;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content-wrapper {
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  width: 100%;
  z-index: 1;
  text-align: center;
}

.title {
  font-size: 1.75rem;
  font-weight: 600;
  color: white;
  margin-bottom: 5rem;
}

.converter-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: nowrap;
}

.input-block {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 200px;
}

.flag {
  width: 24px;
  height: 18px;
  margin-top: 0.25rem;
  align-self: flex-start;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

/* Ajustes para os componentes filhos */
.amount-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
  font-size: 1rem;
}

.amount-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

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

.switch-btn {
  font-size: 2rem;
  color: #667eea;
  background: transparent;
  border: none;
  cursor: pointer;
  user-select: none;
  padding: 0 0.5rem;
  margin: 0;
  line-height: 1;
  transition: color 0.3s ease;
}

.switch-btn:hover {
  color: #aab8ff;
}

.flag-wrapper {
  text-align: center;
  margin-top: 1rem;
}

.flag {
  scale: 1.5;
  border-radius: 1px;

}

.converter-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 50px;
  border-radius: 15px;
  gap: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.github-link {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 999;
  opacity: 0.8;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.github-link:hover {
  opacity: 1;
  transform: scale(1.1);
}

.github-icon {
  width: 32px;
  height: 32px;
  fill: #ffffff;
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.5));
}
</style>
