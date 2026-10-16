// Titles are text-only accessories. The names live here so a card can show one without fetching the catalogue;
// they match the title items of the server's catalogue.
const TITLES: Record<string, string> = {
  't-newbie': 'Pemula Antusias',
  't-enjoyer': 'Penikmat Anime',
  't-watcher': 'Tukang Nonton',
  't-opening': 'Pecinta Opening',
  't-subtitle': 'Maniak Subtitle',
  't-hunter': 'Pemburu Episode',
  't-marathon': 'Raja Maraton',
  't-isekai': 'Dewa Isekai',
  't-legend': 'Sang Legenda',
}

export function titleName(code?: string): string {
  return code ? (TITLES[code] ?? '') : ''
}
