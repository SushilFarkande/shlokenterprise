/**
 * SHLOK ENTERPRISES - OFFERS CONFIGURATION
 * 
 * Use this file to add or remove discounts on your products and services.
 * 
 * Instructions:
 * 1. Find the exact name of the product or service as it appears on the website (e.g., "Detergent Liquid").
 * 2. Add it to the list below.
 * 3. Provide the 'discountText' (e.g., "20% OFF").
 * 4. For products, you can optionally provide 'oldPrice' and 'newPrice' to show a strikethrough price.
 * 
 * To remove an offer, simply delete or comment out the lines for that item.
 */

const activeOffers = {
    // --- PRODUCT OFFERS ---
   // products: {
        "Detergent Liquid": {
            discountText: "20% OFF",
            oldPrice: "₹199.00 / 1L",
            newPrice: "₹79.00 / 1L"
        },
        "Premium Detergent Powder": {
            discountText: "10% OFF",
            oldPrice: "₹114 / 1kg",
            newPrice: "₹102.00 / 1kg"
        }
    },

    // --- SERVICE OFFERS ---
   // services: {
        "Washing Machine Repair": {
            discountText: "Flat ₹500 OFF"
        },
        "Annual Maintenance (AMC)": {
            discountText: "1 Month Free"
        }
    }
};