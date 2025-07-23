  <template>
    <input
      type="text"
      :value="modelValue"
      @input="onInput"
      @keypress="onKeyPress"
      class="amount-input"
      placeholder="0.00"
      autocomplete="off"
      inputmode="decimal"
    />
  </template>

  <script>
  export default {
    name: 'AmountInput',
    props: {
      modelValue: {
        type: [String, Number],
        default: ''
      }
    },
    emits: ['update:modelValue'],
    methods: {
      onInput(e) {
        // Remove tudo exceto dígitos e ponto
        let val = e.target.value.replace(/[^\d.]/g, '')

        // Permite apenas um ponto decimal
        const parts = val.split('.')
        if (parts.length > 2) {
          val = parts.shift() + '.' + parts.join('')
        }

        // Remove zeros à esquerda exceto se for '0' ou começar com '0.'
        val = val.replace(/^0+(?!\.|$)/, '')

        this.$emit('update:modelValue', val)
      },
      onKeyPress(e) {
        // Permite números, ponto, e controlo (backspace, arrows)
        const allowedKeys = ['0','1','2','3','4','5','6','7','8','9','.']
        if (
          !allowedKeys.includes(e.key) &&
          !e.ctrlKey &&
          !e.metaKey &&
          !['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(e.key)
        ) {
          e.preventDefault()
        }
      }
    }
  }
  </script>

  <style scoped>
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

  .amount-input::placeholder {
    color: rgba(255, 255, 255, 0.6); /* Exemplo: branco semi-transparente */
  }
  </style>
