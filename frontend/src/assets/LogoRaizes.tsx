type LogoRaizesProps = {
  size?: number
  variant?: 'light' | 'dark'
  className?: string
}

/**
 * Logo Raízes do Araguaia — v4 (frontend-design skill aplicada)
 *
 * Estratégia:
 *  - Copa: 5 círculos sobrepostos → bumps visíveis em qualquer tamanho
 *  - Tronco: rect exposto entre copa e zona do rio
 *  - Raízes: 5 paths com espalhamento largo
 *  - Ondas: curvas cúbicas sinusoidais reais
 *  - Fruto: círculo laranja no canto superior direito da copa
 *  - variant='light' → branco sobre verde (header)
 *  - variant='dark'  → verde + azul sobre branco
 */
export function LogoRaizes({ size = 44, variant = 'light', className = '' }: LogoRaizesProps) {
  const isLight = variant === 'light'

  const border    = isLight ? '#FFFFFF' : '#2D5A27'
  const treeFill  = isLight ? '#FFFFFF' : '#2D5A27'
  const waveFill  = isLight ? '#FFFFFF' : '#1E5F8B'
  const riverZone = isLight ? 'rgba(255,255,255,0.18)' : 'rgba(30,95,139,0.20)'
  const fruit     = '#E8732E'

  const clipId = `rz-clip-${variant}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Logo Raízes do Araguaia"
      role="img"
      className={className}
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="100" cy="100" r="92" />
        </clipPath>
      </defs>

      {/* ── Borda do círculo externo ── */}
      <circle cx="100" cy="100" r="92" stroke={border} strokeWidth="9" fill="none" />

      <g clipPath={`url(#${clipId})`}>

        {/* ════════════════════════════════════════
            COPA — 5 círculos sobrepostos
            Cada um forma um lóbulo visível
        ════════════════════════════════════════ */}
        {/* lóbulo superior central */}
        <circle cx="100" cy="42"  r="40" fill={treeFill} />
        {/* lóbulo superior esquerdo */}
        <circle cx="62"  cy="60"  r="34" fill={treeFill} />
        {/* lóbulo superior direito */}
        <circle cx="138" cy="60"  r="34" fill={treeFill} />
        {/* lóbulo inferior esquerdo */}
        <circle cx="52"  cy="90"  r="28" fill={treeFill} />
        {/* lóbulo inferior direito */}
        <circle cx="148" cy="90"  r="28" fill={treeFill} />

        {/* ════════════════════════════════════════
            TRONCO — visível entre copa e rio
        ════════════════════════════════════════ */}
        <rect x="89" y="108" width="22" height="28" rx="9" fill={treeFill} />

        {/* ════════════════════════════════════════
            RAÍZES — amplo espalhamento
        ════════════════════════════════════════ */}
        {/* central */}
        <path d="M100 134 Q100 160 100 180" stroke={treeFill} strokeWidth="7" strokeLinecap="round" />
        {/* esquerda longa */}
        <path d="M94 138 Q62 158 30 174"   stroke={treeFill} strokeWidth="7" strokeLinecap="round" />
        {/* esquerda curta */}
        <path d="M92 148 Q70 163 52 174"   stroke={treeFill} strokeWidth="6" strokeLinecap="round" />
        {/* direita longa */}
        <path d="M106 138 Q138 158 170 174" stroke={treeFill} strokeWidth="7" strokeLinecap="round" />
        {/* direita curta */}
        <path d="M108 148 Q130 163 148 174" stroke={treeFill} strokeWidth="6" strokeLinecap="round" />

        {/* ════════════════════════════════════════
            RIO ARAGUAIA — fundo + ondas cúbicas
        ════════════════════════════════════════ */}
        <rect x="0" y="128" width="200" height="48" fill={riverZone} />

        {/* onda 1 */}
        <path
          d="M0,138 C25,126 50,150 75,138 C100,126 125,150 150,138 C175,126 200,150 200,138"
          stroke={waveFill}
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        {/* onda 2 */}
        <path
          d="M0,155 C25,143 50,167 75,155 C100,143 125,167 150,155 C175,143 200,167 200,155"
          stroke={waveFill}
          strokeWidth="5.5"
          strokeLinecap="round"
          fill="none"
        />

      </g>

      {/* ── Fruto laranja — renderizado sobre o clip ── */}
      <circle cx="142" cy="38" r="12" fill={fruit} />

    </svg>
  )
}
