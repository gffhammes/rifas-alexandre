import React from 'react'
import { currencyBRLMask } from './utils';


function isGreaterThan(number, reference) {
  return number > reference;
}

function isGreaterThanOrEqual(number, reference) {
  return number >= reference;
}

export const getTotalPrice = (ticketPrice, cumulativeDiscount, quantity) => {
  let index;

  cumulativeDiscount.some((discount, key) => {
    switch (discount.rule) {
      case 'gt':
        if (discount.ticketPrice === null) {
          index = -1;
          return;
        }
        if (isGreaterThan(quantity, discount.trigger)) {
          index = key;
        } else {
          return true;
        }
        break;
      case 'gte':
        if (discount.ticketPrice === null) {
          index = -1;
          return;
        }
        if (isGreaterThanOrEqual(quantity, discount.trigger)) {
          index = key;
        } else {
          return true;
        }
        break;
      default:
        return true;
    }
  });

  const price = index >= 0 ? cumulativeDiscount[index].ticketPrice : ticketPrice;

  return price * quantity;
}

export const getPricesString = (ticketPrice, cumulativeDiscount) => {
  let price;

  const basePrice = currencyBRLMask(ticketPrice);
  price = basePrice;

  cumulativeDiscount.forEach((discount) => {
    if (discount.ticketPrice === null) return;
    price = price + ' / ' + discount.trigger + ' por ' + currencyBRLMask(discount.trigger * discount.ticketPrice) 
  })

  return price;
}
