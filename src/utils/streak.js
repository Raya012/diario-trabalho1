import { hoje, addDias } from './datas';

// Dias seguidos. Se hoje ainda não foi marcado, a sequência segue viva a partir de ontem.
export function sequencia(datas) {
  const s = new Set(datas);
  let d = hoje();
  if (!s.has(d)) d = addDias(d, -1);
  let n = 0;
  while (s.has(d)) { n++; d = addDias(d, -1); }
  return n;
}
