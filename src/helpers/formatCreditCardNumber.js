const formatCreditCardNumber = (cardNumber, cardPlaceholder) => {
  if (!cardNumber) return '';
  let creditCardNumber = cardNumber.replace(/\s/g, '');
  const creditCardNumberGaps = [...cardPlaceholder.matchAll(/\s/g)].map(item => item.index);

  creditCardNumberGaps.forEach(index => {
    if (creditCardNumber.length <= index) return;
    creditCardNumber = creditCardNumber.substring(0, index) + ' ' + creditCardNumber.substring(index, creditCardNumber.length);
  })

  return creditCardNumber;
};

export default formatCreditCardNumber;