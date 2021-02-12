<template>
  <section class="App">
    <CreditCardForm
      v-model:cardName="creditCardData.cardName"
      v-model:cardNumber="creditCardData.cardNumber"
      v-model:cardMonth="creditCardData.cardMonth"
      v-model:cardYear="creditCardData.cardYear"
      v-model:cardCode="creditCardData.cardCode"
    />
  </section>
</template>

<script>
  import CreditCardForm from './components/CreditCardForm/CreditCardForm.vue';

  export default {
    name: 'App',
    components: {
      CreditCardForm,
    },
    data() {
      return {
        creditCardData: {
          cardName: '',
          cardNumber: '',
          cardMonth: '',
          cardYear: '',
          cardCode: ''
        }
      };
    },
  }
</script>

<style lang="scss">
  @import "./assets/scss/index.scss";
  @import "./App.scss";
</style>
