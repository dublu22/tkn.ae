HIBAH CROCHET SHOP WEBSITE — QUICK START

FILES
- index.html  : website sections and content
- style.css   : colours, layout, fonts, mobile styling
- script.js   : flower prices, product catalogue, bouquet calculator, WhatsApp order
- images/     : put your own product photos here

HOW TO OPEN
1. Extract the ZIP file.
2. Open the extracted folder in VS Code.
3. Open index.html in a browser. You can double-click index.html to preview it.
4. Optional: use the VS Code extension "Live Server" and choose "Open with Live Server".

CHANGE FLOWER PRICES
1. Open script.js.
2. Find the FLOWERS array near the top.
3. Change each flower's name and price. Prices are in AED.
   Example: { id: "tulip", name: "Crochet tulip", price: 15, emoji: "🌷", colour: "#f0d9d6" }
4. Keep each id unique and simple (no spaces). You can add/remove flower entries by following the same format.

CHANGE OTHER PRODUCTS
- READY_MADE controls the premade bouquets.
- SHOP_PRODUCTS controls keychains, scrunchies, gajray, and bags.
Edit name, description, price, emoji and colour.

ADD WHATSAPP ORDERING
In script.js, set:
const WHATSAPP_NUMBER = "9715XXXXXXXX";
Use your UAE number with country code 971, without +, spaces or dashes.
Until you add it, the site shows the order text so you can copy it.

ADD PRODUCT PHOTOS
The current cards use emoji placeholders so the site works immediately.
To add photos:
1. Put image files in the images folder, e.g. images/tulip-bouquet.jpg.
2. Edit the relevant product object in script.js to include an image property, e.g. image: "images/tulip-bouquet.jpg".
3. In renderProducts(), replace the placeholder-art span with:
   ${product.image ? `<img src="${product.image}" alt="${product.name}">` : `<span class="placeholder-art">${product.emoji}</span>`}
4. Add this CSS:
   .product-image img { width: 100%; height: 100%; object-fit: cover; display: block; }

CUSTOMISE BRANDING
- Change "Hibah" / "hibah." in index.html to your chosen shop name.
- Colours and fonts are at the top of style.css under :root.
- The website uses Google Fonts when online, with fallback fonts if offline.

IMPORTANT
- Prices are sample placeholders. Replace them with your real prices before sharing the site.
- This is a front-end website only. It does not process payments or save customer orders to a database.
- WhatsApp order links need your number configured in script.js.
