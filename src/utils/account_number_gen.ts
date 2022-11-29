/**
 * @description Generates a random bank account number
 * @description The bank account number is a 8 digit number
 *
 * @returns random bank account number
 */
export const generateAccountNumber = () => {
  return Math.floor(10000000 + Math.random() * 90000000);
};
