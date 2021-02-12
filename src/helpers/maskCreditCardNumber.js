const maskCreditCardNumber = (cardNumber, cardPlaceholder) => {
  const creditCardGaps = [...cardPlaceholder.matchAll(/\s/g)].map(item => item.index);
  const firstGapIndex = creditCardGaps[0];
  const lastGapIndex = creditCardGaps[creditCardGaps.length - 1];

  return cardNumber.slice(0, firstGapIndex) +
    cardNumber.slice(firstGapIndex, lastGapIndex).replace(/\d/g, 'x') +
    cardNumber.slice(lastGapIndex);
};

export default maskCreditCardNumber;