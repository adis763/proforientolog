# Профориентолог — Landing Page

React + Vite projekt za landing stranicu proforijentatora.

## Pokretanje

```bash
npm install
npm run dev
```

Otvori http://localhost:5173

## Build za produkciju

```bash
npm run build
npm run preview
```

## Struktura projekta

```
src/
├── data.js              ← SVE mijenjaj ovdje (ime, usluge, kontakti...)
├── index.css            ← Globalni stilovi i CSS varijable
├── main.jsx             ← Entry point
├── App.jsx              ← Kompozicija sekcija
└── components/
    ├── Navbar.jsx / .module.css
    ├── Hero.jsx / .module.css
    ├── Expert.jsx / .module.css
    ├── Method.jsx / .module.css
    ├── Services.jsx / .module.css
    ├── Testimonials.jsx / .module.css
    ├── Materials.jsx / .module.css
    └── Contacts.jsx / .module.css
```

## Kako promijeniti sadržaj

Otvori `src/data.js` i uredi:

### Promjena imena eksperta
```js
export const EXPERT = {
  name:     'Ольга Воробьёва',   // ← Ime
  initials: 'ОВ',                // ← Inicijali za avatar
  title:    '...',
  telegram: 'https://t.me/username',   // ← Tvoj Telegram
  whatsapp: 'https://wa.me/79001234567', // ← Tvoj WhatsApp
  phone:    '+7 (900) 123-45-67',
  ...
}
```

### Dodavanje/uklanjanje usluge
Uredi niz `SERVICES` u `data.js` — svaka usluga je jedan objekat.

### Dodavanje recenzija
Uredi niz `TESTIMONIALS` u `data.js`.

## Boje (CSS varijable)

Sve boje su u `src/index.css` kao CSS varijable:
- `--clr-teal-*` — glavna brand boja (zelena)
- `--clr-purple-*` — sekundarna boja
- `--clr-coral-*` — tercijarno
- `--clr-amber-*` — akcent

Za promjenu brand boje, zamijeni `--clr-teal-*` vrijednosti.
