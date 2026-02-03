// Product categories enum
export const PRODUCT_CATEGORIES = {
  FEATURED: 'featured',
  CAROUSEL: 'carousel',
  HERO: 'hero',
  COLLECTION: 'collection',
};

// Order statuses enum
export const ORDER_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};

//product types enum
export const PRODUCT_TYPES = {
  CANDLES: 'candles',
  DIFFUSERS: 'diffusers',
  GIFT_CARDS: 'gift-cards',
};

export const PRODUCT_TYPE_OPTIONS = [
  { value: PRODUCT_TYPES.CANDLES, label: 'Candles' },
  { value: PRODUCT_TYPES.DIFFUSERS, label: 'Diffusers' },
  { value: PRODUCT_TYPES.GIFT_CARDS, label: 'Gift Cards' },
];
