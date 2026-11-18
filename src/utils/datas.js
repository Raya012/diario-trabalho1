const p = (n) => String(n).padStart(2, '0');
export const fmt = (d) => `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
export const hoje = () => fmt(new Date());
export const addDias = (iso, n) => {
  const [y, m, d] = iso.split('-').map(Number);
  return fmt(new Date(y, m - 1, d + n));
};
export const rotulo = (iso) => {
  if (iso === hoje()) return 'Hoje';
  if (iso === addDias(hoje(), -1)) return 'Ontem';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};
