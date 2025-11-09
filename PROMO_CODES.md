# Siva Jewellery - Promo Codes

This document lists all available promo codes for the jewelry e-commerce website.

## Available Promo Codes

### 1. **WELCOME10**
- **Discount:** 10% off
- **Type:** Percentage
- **Description:** 10% off on your order
- **Best for:** First-time customers

### 2. **SAVE500**
- **Discount:** ₹500 off
- **Type:** Fixed Amount
- **Description:** ₹500 off on your order
- **Best for:** Orders above ₹5,000

### 3. **FESTIVE20**
- **Discount:** 20% off
- **Type:** Percentage
- **Description:** 20% off festive special
- **Best for:** Festival season purchases

### 4. **GOLD15**
- **Discount:** 15% off
- **Type:** Percentage
- **Description:** 15% off on gold jewelry
- **Best for:** Gold jewelry collections

### 5. **FIRST25**
- **Discount:** 25% off
- **Type:** Percentage
- **Description:** 25% off for first-time buyers
- **Best for:** New customers making their first purchase

## How to Use Promo Codes

1. **Add items to your cart** from the Collections page
2. **Open the cart** by clicking the cart icon in the navigation bar or the WhatsApp button
3. **Enter the promo code** in the "Have a promo code?" field
4. **Click "Apply"** to validate and apply the discount
5. **Review your savings** - the discount will be displayed in the cart summary
6. **Send your order** via WhatsApp with the applied discount

## Features

- ✅ **Real-time validation** - Invalid codes show error messages immediately
- ✅ **Visual feedback** - Applied promo codes display with a green badge
- ✅ **Easy removal** - Remove promo codes with one click
- ✅ **WhatsApp integration** - Promo code details are included in WhatsApp order messages
- ✅ **Automatic calculation** - Discount is automatically applied to your total
- ✅ **Case insensitive** - Enter promo codes in any case (e.g., welcome10 or WELCOME10)

## Adding New Promo Codes

To add new promo codes, edit the `promoCodes` object in `src/App.jsx`:

```javascript
const promoCodes = {
  'CODE_NAME': { 
    discount: 10,           // Amount or percentage
    type: 'percentage',     // 'percentage' or 'fixed'
    description: 'Description text'
  }
};
```

## Technical Details

- Promo codes are validated on the client side
- Discounts are calculated in real-time
- Maximum discount cannot exceed the cart subtotal
- Promo codes are case-insensitive (automatically converted to uppercase)
- Only one promo code can be applied at a time
