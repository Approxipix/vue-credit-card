export const regularCreditCardPlaceholder = '#### #### #### ####';

export const regularCreditCard = {
  id: 'regular',
  name: 'Regular',
  regex: /^[0-9]{16}$/,
  regexStart: /^[0-9]/,
  placeholders: [regularCreditCardPlaceholder],
  code: {
    name: 'CVV',
    length: 3,
  },
};

export const creditCardTypes = {
  visa: {
    id: 'visa',
    name: 'Visa',
    regex: /^4[0-9]{12}(?:[0-9]{3})?$/,
    regexStart: /^4/,
    placeholders: ['#### ##### ####', '#### #### #### ####'],
    code: {
      name: 'CVV',
      length: 3,
    },
  },
  mastercard: {
    id: 'mastercard',
    name: 'Mastercard',
    regex: /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
    regexStart: /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)/,
    placeholders: ['#### #### #### ####'],
    code: {
      name: 'CVC',
      length: 3,
    },
  },
  americanExpress: {
    id: 'americanExpress',
    name: 'American Express',
    regex: /^3[47][0-9]{13}$/,
    regexStart: /^3[47]/,
    placeholders: ['#### ###### #####'],
    code: {
      name: 'CID',
      length: 4,
    },
  },
  dinersClub: {
    id: 'dinersClub',
    name: 'Diners Club',
    regex: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    regexStart: /^3(?:0[0-5]|[68][0-9])/,
    placeholders: ['#### ###### ####'],
    code: {
      name: 'CVV',
      length: 3,
    },
  },
  discover: {
    id: 'discover',
    name: 'Discover',
    regex: /^6(?:011|5[0-9]{2})(?:[0-9]{12})$/,
    regexStart: /^6(?:011|5[0-9]{2})$/,
    placeholders: ['#### #### #### ####'],
    code: {
      name: 'CID',
      length: 3,
    },
  },
  jcb: {
    id: 'jcb',
    name: 'JCB',
    regex: /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/,
    regexStart: /^(?:2131|1800|35[0-9]{3})/,
    placeholders: ['#### #### #### ###', '#### #### #### ####'],
    code: {
      name: 'CVV',
      length: 3,
    },
  },
  unionPay: {
    id: 'unionPay',
    name: 'UnionPay',
    regex: /^(62[0-9]{14,17})$/,
    regexStart: /^62/,
    placeholders: ['#### #### #### ####', '###### ###########', '###### ############', '###### #############'],
    code: {
      name: 'CVN',
      length: 3,
    },
  },
  maestro: {
    id: 'maestro',
    name: 'Maestro',
    regex: /^(5018|5020|5038|5893|6304|6759|6761|6762|6763)[0-9]{8,15}$/,
    regexStart: /^(5018|5020|5038|5893|6304|6759|6761|6762|6763)/,
    placeholders: [
      '#### #### ####',
      '#### #### #####',
      '#### #### ######',
      '#### ###### #####',
      '#### #### #### ####',
      '#### #### #### #####',
      '#### #### #### ######',
      '#### #### #### #### ###',
    ],
    code: {
      name: 'CVC',
      length: 3,
    },
  },
  regular: regularCreditCard,
};

export const findCreditCardType = cardNumber => (
  Object.values(creditCardTypes).find(card => card.regexStart.test(cardNumber))
);
