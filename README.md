# North Cornwall Airport Transfers Website

A fast, mobile-first static website ready for GitHub and Cloudflare Pages.

## 1. Edit your details first

Open `site-config.js` and replace:

- `YOUR-DOMAIN.co.uk`
- `YOUR AIRPORT TRANSFER NUMBER`
- `44XXXXXXXXXX` (international digits only, no +)
- `bookings@YOUR-DOMAIN.co.uk`
- Facebook page URL
- operator licence number

Then use Find and Replace across all files:

- Replace every `YOUR-DOMAIN.co.uk` with the real domain.
- Replace `+44XXXXXXXXXX` in `schema.json` with the real number.

## 2. Form delivery

The form works immediately as a mailto fallback, opening the visitor's email app.

For reliable web-form delivery, create a Formspree form or another JSON-compatible endpoint and paste its URL into:

`formEndpoint: "https://formspree.io/f/YOUR-ID"`

inside `site-config.js`.

Test it completely before advertising. Never treat a form submission as a confirmed booking until you reply.

## 3. Upload to GitHub

1. Sign in to GitHub.
2. Create a new repository called `north-cornwall-airport-transfers`.
3. Choose **Add file > Upload files**.
4. Extract this ZIP on your computer.
5. Select every item inside the extracted folder and upload them.
6. Commit the files.

## 4. Publish with Cloudflare Pages from GitHub

1. Sign in to Cloudflare.
2. Open **Workers & Pages**.
3. Choose **Create application**, then **Pages** and import an existing Git repository.
4. Connect GitHub and select the repository.
5. Framework preset: **None**.
6. Build command: leave blank.
7. Build output directory: `/` or leave at the repository root as Cloudflare allows.
8. Deploy.
9. Open the project, choose **Custom domains**, and add your domain.
10. Follow Cloudflare's DNS prompt.

Cloudflare will deploy again automatically whenever you commit changes to GitHub.

## 5. Before launch

- Add the true legal business/operator name and contact address to Privacy and Terms.
- Add real cancellation, waiting-time, parking, payment and no-show rules.
- Display the correct private-hire operator licence details.
- Confirm all drivers and vehicles used are correctly licensed and insured.
- Create a domain email address.
- Test every page and form on phone and desktop.
- Add genuine photographs only when you have permission.
- Do not publish fake reviews, fake fleet claims or invented service guarantees.

## 6. Google setup

1. Add the site in Google Search Console using the Domain property.
2. Verify via the DNS TXT record.
3. Submit `https://YOUR-DOMAIN.co.uk/sitemap.xml`.
4. Create a genuine Google Business Profile only if eligible under Google's current rules.
5. Keep the displayed business name consistent with real-world branding and paperwork.
6. Ask real customers for honest Google reviews.
7. Build genuine local citations and relationships rather than buying spam links.

## 7. Facebook page setup

Page name: **North Cornwall Airport Transfers**

Suggested username: `@NorthCornwallAirportTransfers`

Category: choose the most accurate available category, such as Airport Shuttle Service, Taxi Service or Transportation Service.

Bio:
`Private pre-booked airport transfers across North Cornwall and nearby North Devon. Door-to-door journeys to all UK airports. Call or request a fixed quote online.`

First pinned post:
`Welcome to North Cornwall Airport Transfers — a specialist private transfer service for airport journeys from Bude, Launceston, Wadebridge, Camelford, Boscastle, Tintagel, Holsworthy and surrounding areas. We provide pre-booked door-to-door travel to Newquay, Exeter, Bristol, Heathrow, Gatwick and airports throughout the UK. For availability and a fixed quotation, call us or use the website enquiry form. A journey is confirmed only when we reply directly.`

## SEO warning

No company can guarantee the top Google position. This site gives you strong technical foundations and relevant local pages, but rankings also depend on competition, reviews, useful original content, local prominence, links, consistency, site age and user engagement. Do not create dozens of near-identical doorway pages with no local value; improve each area page over time using genuine local pickup information, original photos and useful travel guidance.
