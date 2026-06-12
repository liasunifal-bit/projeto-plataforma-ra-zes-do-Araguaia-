export const brejoGrandeCoordinates = {
  latitude: -5.7032,
  longitude: -48.4048,
} as const;

// Zoom mínimo e máximo conforme exportação do MOBAC
export const MAP_ZOOM = {
  min: 12,
  max: 19,
  default: 14,
} as const;

// Limites geográficos (Bounds) calculados para ~15km x 15km ao redor do centro (-5.7032, -48.4048)
// 1 grau lat ~111km -> 7.5km ~ 0.0676 graus
// 1 grau lng ~110.5km -> 7.5km ~ 0.0679 graus
export const brejoGrandeBounds: [[number, number], [number, number]] = [
  [-5.7708, -48.4727], // Canto Sudoeste (SW)
  [-5.6358, -48.3369], // Canto Nordeste (NE)
];
