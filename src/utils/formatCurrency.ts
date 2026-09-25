/**
 * Utility functions for Indian currency (INR / ₹) formatting
 * Formats numbers according to Indian numbering system with standard ₹ symbol
 * Examples:
 *   formatINR(499) -> "₹499"
 *   formatINR(1299) -> "₹1,299"
 *   formatINR(14999) -> "₹14,999"
 */

export const formatINR = (amount: number | string | undefined | null): string => {
  if (amount === undefined || amount === null || isNaN(Number(amount))) {
    return '₹0';
  }
  const numericVal = Math.round(Number(amount));
  return `₹${numericVal.toLocaleString('en-IN')}`;
};

export const formatINRSigned = (amount: number | string | undefined | null): string => {
  if (amount === undefined || amount === null || isNaN(Number(amount))) {
    return '-₹0';
  }
  const numericVal = Math.round(Math.abs(Number(amount)));
  return `-₹${numericVal.toLocaleString('en-IN')}`;
};
