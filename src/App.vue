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
    <GithubLink link="https://github.com/andreoliveiraalves/vue-currency-selector" />
  </div>
</template>

<script>
import Background from './components/Background.vue'
import LangToggler from './components/LangToggler.vue'
import CurrencySelect from './components/CurrencySelect.vue'
import AmountInput from './components/AmountInput.vue'
import GithubLink from './components/GithubLink.vue'

export default {
  components: { Background, LangToggler, CurrencySelect, AmountInput, GithubLink },
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
      // Round the output to avoid long decimals
      this.convertedAmountInput = isNaN(val) ? '' : String(Math.round((val * this.conversionRate) * 100) / 100)
    },
    convertedAmountInput(newVal) {
      if (!this.conversionRate) return
      const val = parseFloat(newVal)
      // Round the output to avoid long decimals
      this.amount = isNaN(val) ? '' : String(Math.round((val / this.conversionRate) * 100) / 100)
    }
  },
  methods: {
    async fetchRate() {
      if (this.fromCurrency === this.toCurrency) {
        this.conversionRate = 1
        this.convertedAmountInput = this.numericAmount
          ? String(this.numericAmount) // Remove .toFixed(2)
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
          ? String(this.numericAmount * this.conversionRate) // Remove .toFixed(2)
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

@media (max-width: 640px) {
  .title {
    margin-top: 2vh;
    margin-bottom: 4vh;
  }

  .converter-row {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .input-block {
    width: 100%;
  }

  .switch-btn {
    transform: rotate(90deg);
    align-self: center;
  }

  .converter-group {
    padding: 20px 10px !important
  }

  .flag-wrapper {
    margin-top: 0;
  }
}
</style>