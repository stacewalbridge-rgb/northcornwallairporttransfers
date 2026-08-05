# North Cornwall Airport Transfers V2

Main domain: `northcornwallairporttransfers.co.uk`

Edit `site-config.js` first and add the dedicated phone number, WhatsApp number, booking email, Facebook URL and operator licence number.

Deploy as **Cloudflare Pages**, not a Worker:
1. Upload and replace the files in the existing GitHub repository.
2. In Cloudflare choose Workers & Pages > Create application > Pages/Get started > Connect to Git.
3. Framework preset: None. Build command: blank. Build output directory: `/`.
4. Deploy and add `northcornwallairporttransfers.co.uk` as the custom domain.

The quote form opens the visitor's email app unless a Formspree endpoint is placed in `formEndpoint`. Complete the legal pages with the real operator details and policies before launch.
