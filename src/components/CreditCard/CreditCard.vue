<template>
  <div class="Card" :class="{ 'Card--active': isCardFlipped }">
    <div class="Card__container Card__container--front">
      <div
        ref="focusElement"
        :class="['Card__focus', {'Card__focus--active' : focusElementStyle }]"
        :style="focusElementStyle"
      />
      <div class="Card__background-wrapper">
        <img class="Card__background" :src="cardBackgroundImage" alt="Background"  />
      </div>
      <div class="Card__wrapper">
        <div class="Card__header">
          <img class="Card__chip" src="../../assets/images/logo/chip.png" alt="Chip" />
          <div class="Card__type">
            <transition name="slide-fade-up">
              <img
                :key="cardTypeImage"
                :src="cardTypeImage"
                :alt="card?.name"
                v-if="cardTypeImage"
                class="Card__type-image"
              />
            </transition>
          </div>
        </div>
        <label for="v-card-number" ref="v-card-number" class="Card__placeholder">
          <span
            v-for="(n, index) in cardPlaceholderCharArray"
            :key="index"
            :class="{ 'Card__placeholder-space': n === ' '}"
          >
            <transition name="slide-fade-up">
              <span v-if="Number.isInteger(+n)">{{ n }}</span>
              <span v-else-if="cardNumber.length <= index">#</span>
              <span v-else>*</span>
            </transition>
          </span>
        </label>
        <div class="Card__footer">
          <label for="v-card-name" ref="v-card-name" class="Card__name">
            <span class="Card__title">Card Holder</span>
            <transition name="slide-fade-up">
              <div v-if="cardName.length" class="Card__name-text">
                <transition-group name="slide-fade-right">
                  <span v-for="(n, $index) in cardName" :key="$index">{{ n }}</span>
                </transition-group>
              </div>
              <div v-else class="Card__name-text">FULL NAME</div>
            </transition>
          </label>
          <div class="Card__date" ref="v-card-month">
            <label for="v-card-month" class="Card__title">Expires</label>
            <label for="v-card-month" class="Card__date-label">
              <transition name="slide-fade-up">
                <span v-if="cardMonth" :key="cardMonth">{{ cardMonth }}</span>
                <span v-else>MM</span>
              </transition>
            </label>
            <span class="Card__date-delimiter">/</span>
            <label for="v-card-year" class="Card__date-label">
              <transition name="slide-fade-up">
                <span v-if="cardYear" :key="cardYear">{{ cardYear.slice(2,4) }}</span>
                <span v-else>YY</span>
              </transition>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="Card__container Card__container--back">
      <div class="Card__background-wrapper">
        <img class="Card__background" :src="cardBackgroundImage" alt="Background" />
      </div>
      <div class="Card__band" />
      <div class="Card__code">
        <div class="Card__code-title">{{ card ? card.code.name : 'CVV' }}</div>
        <div class="Card__code-band">
          <span v-for="(n, $index) in cardCode" :key="$index">
            {{ isCardCodeMasked ? '*' : n }}
          </span>
        </div>
        <div class="Card__type">
          <transition name="slide-fade-up">
            <img
              :key="cardTypeImage"
              :src="cardTypeImage"
              :alt="card?.name"
              v-if="cardTypeImage"
              class="Card__type-image"
            />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import maskCreditCardNumber from '../../helpers/maskCreditCardNumber';

  export default {
    name: 'CreditCard',
    props: {
      card: Object,
      cardPlaceholder: String,
      cardName: String,
      cardNumber: String,
      cardMonth: String,
      cardYear: String,
      cardCode: String,
      isCardNumberMasked: Boolean,
      isCardCodeMasked: Boolean,
    },
    data() {
      return {
        isFocused: false,
        currentFocus: null,
        focusElementStyle: null,
        isCardFlipped: false,
      }
    },
    computed: {
      cardPlaceholderCharArray() {
        const cardPlaceholderArray = this.cardPlaceholder.split('');
        const cardNumberArray = this.isCardNumberMasked
          ? maskCreditCardNumber(this.cardNumber, this.cardPlaceholder).split('')
          : this.cardNumber.split('');

        return cardPlaceholderArray.map((char, index) => cardNumberArray[index] || char);
      },
      cardTypeImage() {
        if (!this.card || this.card.id === 'regular') return '';
        return require(`../../assets/images/logo/${this.card.id}.png`);
      },
      cardBackgroundImage() {
        const randomImageNumber = Math.floor(Math.random() * 25) + 1;
        return require(`../../assets/images/background/card-bg-${randomImageNumber}.jpeg`);
      },
    },
    watch: {
      currentFocus () {
        if (this.currentFocus) this.changeFocus();
        else this.focusElementStyle = null;
      },
    },
    methods: {
      changeFocus () {
        const target = this.$refs[this.currentFocus];

        if (target) {
          this.focusElementStyle = {
            width: `${target.offsetWidth}px`,
            height: `${target.offsetHeight}px`,
            transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
          }
        } else {
          this.focusElementStyle = null;
        }
      },
    },
    mounted() {
      const self = this;
      const fields = document.querySelectorAll('[data-card-field]');

      fields.forEach(element => {
        element.addEventListener('focus', () => {
          const { id } = element;
          this.isFocused = true;

          if (id === 'v-card-month' || id === 'v-card-year') this.currentFocus = 'v-card-month';
          else this.currentFocus = id;

          this.isCardFlipped = id === 'v-card-code';
        });

        element.addEventListener('blur', () => {
          this.isCardFlipped = false;
          self.isFocused = false;

          setTimeout(() => {
            if (!self.isFocused) self.currentFocus = null;
          }, 200)
        })
      });
    },
  }
</script>

<style lang="scss">
  @import "./CreditCard.scss";
</style>
