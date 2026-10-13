# Focus Flooring website: rules for Claude

This is the website for **Focus Flooring**, a commercial flooring company in Tampa.
Many different people edit this site, and they may not be technical. Follow every rule below in every session, for every person.

## 1. This is Focus Flooring, not Envision

- Never use Envision's name, brand rules, colors, or voice here.
- Use Focus Flooring's own look and voice, taken from the current site:
  - **Colors** (defined in `app/assets/css/tokens.css` and `tailwind.config.js`):
    - Midnight (dark green-black background): `#171d1a`
    - Focus yellow (accent, buttons, highlights): `#cce70b`
    - Light yellow (hover): `#e1f555`
    - Focus white (text on dark): `#eceded`
    - Greys: `#808080`, `#b3b3b3`, `#e6e6e6`
  - **Font:** Inter, used everywhere. Do not add new fonts.
  - **Headline style:** big, bold, all caps, often ending with a yellow square "period" (for example "PORTFOLIO." and "ELIMINATING YOUR RISK THROUGH OUR PROCESS.").
  - **Voice:** direct, confident, and practical. Talk about results for the client: cost certainty, staying on schedule, quality ("Zero Punch" philosophy). Keep the warm, value-driven tone of the core values ("Be the solution", "Find a better way", "Be humbly confident").
- Never make up facts, numbers, client names, quotes, or photos. If something is missing, ask.

## 2. Explain things simply

- Use plain, everyday words. No jargon. If a technical word is needed, explain it in one short sentence.
- Go one step at a time. Say what you are about to do, do it, then say what happened.
- Lead with the answer. Keep messages short.
- When you need a decision, ask one clear question.

## 3. One change at a time

- Make only one change per request (for example, one headline or one photo).
- If a request contains several changes, list them and do them one by one, with approval between each.
- Do not "tidy up" or fix other things along the way. If you notice a problem, mention it and ask.

## 4. Always show before-and-after screenshots

- Before changing anything, start the private preview and take a screenshot of the affected page ("before").
- After the change, take a screenshot of the same spot ("after").
- Show both side by side and say in one sentence what changed.
- Include a phone-size screenshot too when the change affects layout or long text.
- How to preview: run `pnpm install`, then `npx nuxt dev --port 3000`, then screenshot `http://localhost:3000` with Playwright. Do not download a new browser; one is already installed.

## 5. Never publish until the person says "go"

- Do not save (commit), upload (push), or publish anything until the person types **"go"** for that specific change.
- Approval for one change does not cover the next one.
- Any update to the `main` branch publishes the live site automatically through Vercel, so never push to `main` directly.
- When the person says "go", do exactly what was approved and nothing else, then confirm what was saved and where.

## 6. Keep every change small and easy to undo

- Change as few lines as possible.
- One change = one save (commit), with a plain-English description such as "Change About Us headline".
- Before saving, show the exact words that changed (old and new).
- If the person wants to undo, revert that one save. Never rewrite or delete history.

## 7. Where content lives

- **Page text** is written directly in the page files in `app/pages/` and the sections in `app/components/`.
  - Example: the home page headline is in `app/components/HomeHero.vue`; the About Us core values are in `app/pages/about-us.vue`.
- **Page photos** are in `public/`. New photos go there; resize them first so each file is small (2 MB or less).
- **Google search titles and descriptions** are set at the top of each page file (`useSeoMeta`) and in `nuxt.config.ts`.
- **Portfolio projects and team members come from Airtable, not the code.**
  - Projects show on the site when their Airtable row is marked "live". Project photos come from ImageKit.
  - To add, remove, or edit a project or team member, the person should update Airtable. Do not try to change these in the code.
  - The private preview cannot reach Airtable, so the Portfolio and Meet the Team pages look empty there. That is expected; say so when showing screenshots of those pages.

## Good to know

- As of October 2026, recent updates show a red X on GitHub. It comes from a Vercel project called "nuxt-focus-flooring", which failed. The other project, "focus-flooring-website", succeeded. A red X from that project is not caused by content edits. Check with the website's developer before relying on either one.
- Forms (Contact, Project Consultation, Join Our Team, team member contact) send to Airtable. Do not change them unless the person working with you clearly says it's okay. Remind them first that the forms send real messages to the Focus team.
