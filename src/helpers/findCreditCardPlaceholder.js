import { regularCreditCardPlaceholder } from './creditCardTypes';

const findCreditCardPlaceholder = (card, cardNumber) => {
  if (!cardNumber || !card || !card.placeholders.length) return regularCreditCardPlaceholder;

  const maxCardPlaceholder = card.placeholders.reduce((acc, cur) => acc.length > cur.length ? acc : cur);
  const cardPlaceholder = card.placeholders.find(item => {
    return item.replace(/\s/g, '').length === cardNumber.replace(/\s/g, '').length;
  });

  return cardPlaceholder || maxCardPlaceholder;
};

export default findCreditCardPlaceholder;