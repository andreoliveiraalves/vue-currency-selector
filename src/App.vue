<template>
  <div class="container py-3">
    <LangToggler />
    <div class="mt-3">
      <CurrencySelect />
    </div>
  </div>
</template>

<script>
import LangToggler from './components/LangToggler.vue'
import CurrencySelect from './components/CurrencySelect.vue'

export default {
  components: { LangToggler, CurrencySelect }
}
</script>