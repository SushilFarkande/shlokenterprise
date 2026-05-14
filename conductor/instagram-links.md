# Implementation Plan: Update Instagram Links

## Objective
Update the Instagram icon links across all HTML pages to direct users to the provided Instagram profile.

## Key Files & Context
- `index.html`
- `contact.html`
- `products.html`
- `services.html`

## Implementation Steps
1. In all HTML files listed above, search for the placeholder Instagram link: `<a href="#"><i class="fa-brands fa-instagram"></i></a>`
2. Replace it with the new link: `<a href="https://www.instagram.com/_sushil_0807?igsh=Ym15aHZ6Z2V1dHZs" target="_blank"><i class="fa-brands fa-instagram"></i></a>`

## Verification
- Verify the website on `localhost:3000` to ensure clicking the Instagram link on any page opens the correct profile in a new tab.