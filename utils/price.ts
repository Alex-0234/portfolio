
const NBSP = ' '

export const formatPrice = (value: number) =>
    `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, NBSP)}${NBSP}Kč`
