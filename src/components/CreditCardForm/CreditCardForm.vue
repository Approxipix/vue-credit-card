<template>
  <div class="CreditCardForm__wrapper">
    <CreditCard
      :card="card"
      :cardPlaceholder="cardPlaceholder"
      :cardName="cardName"
      :cardNumber="cardNumber"
      :cardMonth="cardMonth"
      :cardYear="cardYear"
      :cardCode="cardCode"
      :isCardNumberMasked="isCardNumberMasked"
      :isCardCodeMasked="isCardCodeMasked"
    />
    <div class="Form">
      <div class="CreditCardForm__input-wrapper">
        <label for="v-card-number" class="CreditCardForm__input-label">
          Card Number
        </label>
        <input
          id="v-card-number"
          class="CreditCardForm__input"
          placeholder="Enter number"
          :maxlength="cardNumberMaxLength"
          :value="cardNumberMask || cardNumber"
          @input="updateCardNumber"
          @focus="unmaskCardNumber"
          @blur="maskCardNumber"
          autocomplete="off"
          v-number-only
          data-card-field
        />
        <button
          class="CreditCardForm__input-button"
          :title="isCardNumberMasked ? 'Show card number' : 'Hide card number'"
          @mousedown="toggleCardNumberMask"
        >
          <img v-if="isCardNumberMasked" src="../../assets/images/icon/eye-hide-icon.svg" alt="Show card number">
          <img v-else src="../../assets/images/icon/eye-show-icon.svg" alt="Hide card number">
        </button>
      </div>
      <div class="CreditCardForm__input-wrapper">
        <label for="v-card-name" class="CreditCardForm__input-label">
          Card Name
        </label>
        <input
          id="v-card-name"
          class="CreditCardForm__input"
          placeholder="Enter name"
          :value="cardName"
          @input="updateCardName"
          autocomplete="off"
          v-letter-only
          data-card-field
        />
      </div>
      <div class="CreditCardForm__row">
        <div class="CreditCardForm__col">
          <div class="CreditCardForm__input-wrapper">
            <label for="v-card-month" class="CreditCardForm__input-label">
              Expiration Date
            </label>
            <select
              id="v-card-month"
              class="CreditCardForm__input CreditCardForm__input--select"
              :value="cardMonth"
              @change="updateCardMonth"
              data-card-field
            >
              <option value disabled selected>Month</option>
              <option v-for="n in 12" :value="formatMonth(n)" :disabled="n < minCardMonth" :key="n" >
                {{ formatMonth(n) }}
              </option>
            </select>
          </div>
          <div class="CreditCardForm__input-wrapper">
            <select
              id="v-card-year"
              class="CreditCardForm__input CreditCardForm__input--select"
              :value="cardYear"
              @change="updateCardYear"
              data-card-field
            >
              <option value disabled selected>Year</option>
              <option v-for="(n, $index) in 12" :value="$index + minCardYear" :key="n">
                {{ $index + minCardYear }}
              </option>
            </select>
          </div>
        </div>
        <div class="CreditCardForm__col">
          <div class="CreditCardForm__input-wrapper">
            <label for="v-card-code" class="CreditCardForm__input-label">
              {{ card ? card.code.name : 'CVV' }}
            </label>
            <input
              id="v-card-code"
              class="CreditCardForm__input"
              placeholder="Enter code"
              maxlength="4"
              :type="isCardCodeMasked ? 'password' : 'text'"
              :value="cardCode"
              @input="updateCardCode"
              autocomplete="off"
              v-number-only
              data-card-field
            />
            <button
              class="CreditCardForm__input-button"
              :title="isCardCodeMasked ? 'Show card code' : 'Hide card code'"
              @mousedown="toggleCardCodeMask"
            >
              <img v-if="isCardCodeMasked" src="../../assets/images/icon/eye-hide-icon.svg" alt="Show card code">
              <img v-else src="../../assets/images/icon/eye-show-icon.svg" alt="Hide card code">
            </button>
          </div>
        </div>
      </div>
      <button class="CreditCardForm__button" :disabled="!isFormValid">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
  import CreditCard from '../CreditCard/CreditCard';
  import numberOnly from '../../directives/numberOnly';
  import letterOnly from '../../directives/letterOnly';
  import formatCreditCardNumber from '../../helpers/formatCreditCardNumber';
  import maskCreditCardNumber from '../../helpers/maskCreditCardNumber';
  import findCreditCardPlaceholder from '../../helpers/findCreditCardPlaceholder';
  import { findCreditCardType, regularCreditCardPlaceholder } from '../../helpers/creditCardTypes';

  export default {
    name: 'CreditCardForm',
    props: {
      cardName: String,
      cardNumber: String,
      cardMonth: String,
      cardYear: String,
      cardCode: String,
    },
    directives: {
      numberOnly,
      letterOnly,
    },
    components: {
      CreditCard,
    },
    data() {
      return {
        card: null,
        isCardCodeMasked: true,
        isCardNumberMasked: true,
        cardNumberMask: '',
      }
    },
    computed: {
      cardPlaceholder() {
        return findCreditCardPlaceholder(this.card, this.cardNumber);
      },
      cardNumberMaxLength() {
        if (!this.card) return regularCreditCardPlaceholder.length;
        const placeholdersLength = this.card.placeholders.map(placeholder => placeholder.length);
        return placeholdersLength.reduce((acc, cur) => acc > cur ? acc : cur);
      },
      minCardYear() {
        return new Date().getFullYear();
      },
      minCardMonth() {
        if (+this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
        return 1;
      },
      isFormValid() {
        return this.cardNumber && this.cardName && this.cardMonth && this.cardYear && this.cardCode;
      },
    },
    watch: {
      cardYear() {
        if (this.cardMonth < this.minCardMonth) {
          this.$emit('update:cardMonth', '');
        }
      },
    },
    methods: {
      updateCardNumber(e) {
        const value = e.target.value;
        const card = findCreditCardType(value);
        const cardPlaceholder = findCreditCardPlaceholder(card, value);

        this.card = card;
        this.$emit('update:cardNumber', formatCreditCardNumber(value, cardPlaceholder));
      },
      maskCardNumber() {
        if (this.isCardNumberMasked) {
          this.cardNumberMask = maskCreditCardNumber(this.cardNumber, this.cardPlaceholder);
        }
      },
      unmaskCardNumber() {
        this.cardNumberMask = '';
      },
      toggleCardNumberMask() {
        this.isCardNumberMasked = !this.isCardNumberMasked;
        if (this.isCardNumberMasked) this.maskCardNumber();
        else this.unmaskCardNumber();
      },
      updateCardName(e) {
        this.$emit('update:cardName', e.target.value.toUpperCase());
      },
      updateCardMonth(e) {
        this.$emit('update:cardMonth', e.target.value)
      },
      formatMonth(value) {
        return value < 10 ? `0${value}` : value;
      },
      updateCardYear(e) {
        this.$emit('update:cardYear', e.target.value)
      },
      updateCardCode(e) {
        this.$emit('update:cardCode', e.target.value)
      },
      toggleCardCodeMask() {
        this.isCardCodeMasked = !this.isCardCodeMasked;
      },
    },
  }
</script>

<style lang="scss">
  @import "./CreditCardForm.scss";
</style>
