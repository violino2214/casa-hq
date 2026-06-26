// ─── Constants ────────────────────────────────────────────────
export const CATEGORIE = ['Spesa', 'Casa', 'Commissione', 'Menu', 'Famiglia', 'Altro']
export const PERSONE   = ['Viola', 'Nonna', 'Mamma', 'Papà', 'Tutti']
export const PRIORITA  = ['Bassa', 'Media', 'Alta']
export const GIORNI    = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica']

// ─── Category meta ────────────────────────────────────────────
export const CATEGORIA_META = {
  Spesa:       { emoji: '🛒', bg: '#e8f4ea', color: '#4a8a50' },
  Casa:        { emoji: '🏠', bg: '#fdf0e0', color: '#b07a30' },
  Commissione: { emoji: '📋', bg: '#e8eef8', color: '#4a68aa' },
  Menu:        { emoji: '🍽️', bg: '#fce8f0', color: '#b04878' },
  Famiglia:    { emoji: '👨‍👩‍👧', bg: '#f0ece8', color: '#7a5a40' },
  Altro:       { emoji: '✨', bg: '#ece8f4', color: '#6a58a0' },
}

// ─── Priority meta ────────────────────────────────────────────
export const PRIORITA_META = {
  Alta:  { emoji: '🔴', bg: '#fde8e8', color: '#c03030' },
  Media: { emoji: '🟡', bg: '#fdf6e0', color: '#a07030' },
  Bassa: { emoji: '🟢', bg: '#e8f4ea', color: '#4a8a50' },
}

// ─── Persona meta ─────────────────────────────────────────────
export const PERSONA_META = {
  Viola: { emoji: '👧', color: '#b04878' },
  Nonna: { emoji: '👵', color: '#7a5a40' },
  Mamma: { emoji: '👩', color: '#4a68aa' },
  Papà:  { emoji: '👨', color: '#4a8a50' },
  Tutti: { emoji: '👨‍👩‍👧', color: '#6a58a0' },
}

// ─── Demo tasks ───────────────────────────────────────────────
export const DEMO_TASKS = [
  {
    id: 1,
    titolo: 'Comprare verdure e frutta',
    categoria: 'Spesa',
    persona: 'Mamma',
    priorita: 'Media',
    giorno: 'Lunedì',
    note: 'Spinaci, carote, mele, banane. Meglio al mercato.',
    completata: false,
    creatoIl: new Date('2024-01-15').toISOString(),
  },
  {
    id: 2,
    titolo: 'Fare lavatrice chiara',
    categoria: 'Casa',
    persona: 'Viola',
    priorita: 'Bassa',
    giorno: 'Martedì',
    note: '',
    completata: false,
    creatoIl: new Date('2024-01-15').toISOString(),
  },
  {
    id: 3,
    titolo: 'Ritirare medicine per la nonna',
    categoria: 'Commissione',
    persona: 'Papà',
    priorita: 'Alta',
    giorno: 'Lunedì',
    note: 'Farmacia centrale, ricetta già pronta.',
    completata: false,
    creatoIl: new Date('2024-01-15').toISOString(),
  },
  {
    id: 4,
    titolo: 'Pulire e riordinare cucina',
    categoria: 'Casa',
    persona: 'Tutti',
    priorita: 'Media',
    giorno: 'Mercoledì',
    note: '',
    completata: true,
    creatoIl: new Date('2024-01-14').toISOString(),
  },
  {
    id: 5,
    titolo: 'Decidere menu della settimana',
    categoria: 'Menu',
    persona: 'Mamma',
    priorita: 'Bassa',
    giorno: 'Domenica',
    note: 'Controllare cosa c\'è in frigo prima di pianificare.',
    completata: false,
    creatoIl: new Date('2024-01-15').toISOString(),
  },
  {
    id: 6,
    titolo: 'Pagare bolletta luce',
    categoria: 'Commissione',
    persona: 'Papà',
    priorita: 'Alta',
    giorno: 'Venerdì',
    note: 'Scadenza fine mese!',
    completata: false,
    creatoIl: new Date('2024-01-15').toISOString(),
  },
]

// ─── Demo grocery ─────────────────────────────────────────────
export const DEMO_SPESA = [
  { id: 1, nome: 'Pane integrale', spuntato: false },
  { id: 2, nome: 'Latte intero', spuntato: true },
  { id: 3, nome: 'Uova fresche (6)', spuntato: false },
  { id: 4, nome: 'Yogurt greco', spuntato: false },
  { id: 5, nome: 'Pasta (spaghetti)', spuntato: true },
]

// ─── Demo weekly menu ─────────────────────────────────────────
export const DEMO_MENU = [
  { giorno: 'Lunedì',    pranzo: 'Pasta al pomodoro', cena: 'Insalata di pollo', note: '' },
  { giorno: 'Martedì',   pranzo: 'Riso e verdure',    cena: 'Minestra di lenticchie', note: 'Nonna preferisce senza cipolla' },
  { giorno: 'Mercoledì', pranzo: 'Focaccia e formaggi', cena: 'Pesce al forno', note: '' },
  { giorno: 'Giovedì',   pranzo: 'Panzanella',         cena: 'Frittata di zucchine', note: '' },
  { giorno: 'Venerdì',   pranzo: 'Pasta al pesto',     cena: 'Pizza fatta in casa 🍕', note: 'Serata pizza!' },
  { giorno: 'Sabato',    pranzo: 'Pranzo in famiglia', cena: 'Avanzi + insalata', note: '' },
  { giorno: 'Domenica',  pranzo: 'Arrosto domenicale', cena: 'Leggero — yogurt e frutta', note: 'Pranzo dalla nonna' },
]
