/**
 * Composição original do hero: um visor (viewfinder) com três painéis —
 * interface web, quadro de vídeo e sistema de marca — ligados por linhas finas.
 * Decorativa: o conteúdo textual relevante está no HTML ao lado.
 */
export function HeroVisual() {
  const ticks = Array.from({ length: 72 }, (_, i) => i);
  return (
    <svg viewBox="0 0 600 600" className="h-auto w-full" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="hv-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#087EFF" />
          <stop offset="1" stopColor="#20C4FF" />
        </linearGradient>
        <radialGradient id="hv-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#087EFF" stopOpacity="0.22" />
          <stop offset="1" stopColor="#087EFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="300" cy="300" r="290" fill="url(#hv-glow)" className="fade-in" />

      {/* escala de marcações */}
      <g className="orbit" style={{ "--t": "240s" } as React.CSSProperties}>
        {ticks.map((i) => {
          const a = (i / 72) * Math.PI * 2;
          const major = i % 6 === 0;
          const r1 = 262;
          const r2 = major ? 248 : 255;
          return (
            <line
              key={i}
              x1={300 + Math.cos(a) * r1}
              y1={300 + Math.sin(a) * r1}
              x2={300 + Math.cos(a) * r2}
              y2={300 + Math.sin(a) * r2}
              stroke="#F5F7FA"
              strokeOpacity={major ? 0.5 : 0.18}
            />
          );
        })}
      </g>

      <circle cx="300" cy="300" r="226" fill="none" stroke="#F5F7FA" strokeOpacity="0.16" />
      <circle cx="300" cy="300" r="226" fill="none" stroke="url(#hv-g)" strokeWidth="2" className="draw" style={{ "--len": 1420, "--d": "300ms" } as React.CSSProperties} strokeDasharray="1420" strokeLinecap="round" pathLength={undefined} />
      <circle cx="300" cy="300" r="150" fill="none" stroke="#F5F7FA" strokeOpacity="0.14" strokeDasharray="2 8" />

      {/* mira */}
      <path d="M300 20V120M300 480V580M20 300H120M480 300H580" stroke="#F5F7FA" strokeOpacity="0.2" />
      <path d="M300 276 L306 294 L324 300 L306 306 L300 324 L294 306 L276 300 L294 294 Z" fill="url(#hv-g)" />

      {/* conexões */}
      <path d="M205 170 L284 288 M420 238 L316 296 M205 438 L286 312" stroke="#20C4FF" strokeOpacity="0.45" strokeDasharray="3 5" fill="none" />

      {/* painel web */}
      <g className="fade-in" style={{ "--d": "700ms" } as React.CSSProperties}>
        <rect x="70" y="110" width="150" height="104" rx="8" fill="#0B0D12" stroke="#F5F7FA" strokeOpacity="0.3" />
        <path d="M70 130H220" stroke="#F5F7FA" strokeOpacity="0.2" />
        <circle cx="82" cy="120" r="2.5" fill="#F5F7FA" opacity="0.4" />
        <circle cx="92" cy="120" r="2.5" fill="#F5F7FA" opacity="0.4" />
        <rect x="84" y="146" width="62" height="7" rx="3.5" fill="#F5F7FA" />
        <rect x="84" y="160" width="46" height="7" rx="3.5" fill="#F5F7FA" opacity="0.6" />
        <rect x="84" y="182" width="34" height="14" rx="7" fill="url(#hv-g)" />
        <rect x="164" y="146" width="40" height="50" rx="4" fill="url(#hv-g)" opacity="0.8" />
        <text x="70" y="236" fontSize="20" fill="#A1A8B3" fontFamily="ui-sans-serif, system-ui, sans-serif">Tecnologia</text>
      </g>

      {/* painel vídeo */}
      <g className="fade-in" style={{ "--d": "900ms" } as React.CSSProperties}>
        <rect x="410" y="188" width="150" height="92" rx="8" fill="#0B0D12" stroke="#F5F7FA" strokeOpacity="0.3" />
        <circle cx="485" cy="226" r="17" fill="none" stroke="#F5F7FA" strokeWidth="1.5" />
        <path d="M480 217 L494 226 L480 235 Z" fill="#F5F7FA" />
        <rect x="422" y="258" width="60" height="8" rx="2" fill="#087EFF" />
        <rect x="486" y="258" width="62" height="8" rx="2" fill="#20C4FF" opacity="0.6" />
        <text x="410" y="304" fontSize="20" fill="#A1A8B3" fontFamily="ui-sans-serif, system-ui, sans-serif">Audiovisual</text>
      </g>

      {/* painel marca */}
      <g className="fade-in" style={{ "--d": "1100ms" } as React.CSSProperties}>
        <rect x="70" y="410" width="150" height="92" rx="8" fill="#0B0D12" stroke="#F5F7FA" strokeOpacity="0.3" />
        <path d="M92 436 L112 436 L124 462 L136 436 L146 436 L126 480 L112 480 Z" fill="url(#hv-g)" />
        <rect x="160" y="432" width="14" height="48" rx="2" fill="#087EFF" />
        <rect x="178" y="432" width="14" height="48" rx="2" fill="#20C4FF" />
        <rect x="196" y="432" width="14" height="48" rx="2" fill="#F5F7FA" />
        <text x="70" y="528" fontSize="20" fill="#A1A8B3" fontFamily="ui-sans-serif, system-ui, sans-serif">Design</text>
      </g>
    </svg>
  );
}
