import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { z } from "zod";
import { CIDADES, PAISES } from "./mapa-europa";
import { CINZEL, COR, MONTSERRAT, cidadeSchema, dadosCidade } from "./tema";

// Vinheta de 4 s que entra logo depois do gancho de cada episódio:
// o mapa mostra a rota até aqui, desenha o trecho novo e aproxima na cidade.

export const vinhetaSchema = z.object({ cidade: cidadeSchema });

const CENTRO_ROTA = { x: 991, y: 405 };
const ESCALA_GERAL = 1.15;
const ESCALA_CIDADE = 2.6;

const curva = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  // Ponto de controle deslocado para cima, como uma rota de voo.
  const sinal = dx >= 0 ? 1 : -1;
  const cx = mx + dy * 0.12 * sinal;
  const cy = my - Math.abs(dx) * 0.12 - Math.abs(dy) * 0.05;
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
};

export const Vinheta: React.FC<z.infer<typeof vinhetaSchema>> = ({ cidade }) => {
  const frame = useCurrentFrame();
  const atual = dadosCidade(cidade);

  const zoom = interpolate(frame, [38, 92], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });
  const escala = ESCALA_GERAL * Math.pow(ESCALA_CIDADE / ESCALA_GERAL, zoom);
  const fx = CENTRO_ROTA.x + (atual.x - CENTRO_ROTA.x) * zoom;
  const fy = CENTRO_ROTA.y + (atual.y - CENTRO_ROTA.y) * zoom;
  const r = (px: number) => px / escala;

  const trechoNovo = interpolate(frame, [8, 46], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.25, 1),
  });
  const pulso = interpolate(frame, [44, 74], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const pontoAtual = interpolate(frame, [42, 54], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.spring({ damping: 12 }),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COR.marinho }}>
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{
          position: "absolute",
          opacity: interpolate(frame, [0, 12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <g transform={`translate(960 410) scale(${escala}) translate(${-fx} ${-fy})`}>
          {PAISES.map((d, i) => (
            <path
              key={i}
              d={d}
              fill={COR.marinhoClaro}
              stroke={COR.borda}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {CIDADES.slice(1).map((c, i) => {
            const trecho = i + 1;
            const d = curva(CIDADES[i], c);
            if (trecho > atual.indice) {
              return (
                <path
                  key={c.id}
                  d={d}
                  fill="none"
                  stroke={COR.azulClaro}
                  strokeOpacity={0.35}
                  strokeWidth={r(2)}
                  strokeDasharray={`${r(2)} ${r(9)}`}
                  strokeLinecap="round"
                />
              );
            }
            return (
              <path
                key={c.id}
                d={d}
                pathLength={1}
                fill="none"
                stroke={COR.dourado}
                strokeWidth={4}
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeDasharray={1}
                strokeDashoffset={trecho === atual.indice ? trechoNovo : 0}
              />
            );
          })}

          {CIDADES.map((c, i) => {
            if (i === atual.indice) {
              return (
                <g key={c.id}>
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={r(10 + 34 * pulso)}
                    fill="none"
                    stroke={COR.dourado}
                    strokeWidth={2}
                    vectorEffect="non-scaling-stroke"
                    opacity={1 - pulso}
                  />
                  <circle cx={c.x} cy={c.y} r={r(9 * pontoAtual)} fill={COR.dourado} />
                  <circle cx={c.x} cy={c.y} r={r(3.5 * pontoAtual)} fill={COR.marinho} />
                </g>
              );
            }
            return (
              <circle
                key={c.id}
                cx={c.x}
                cy={c.y}
                r={r(5)}
                fill={i < atual.indice ? COR.dourado : COR.marinho}
                stroke={i < atual.indice ? COR.dourado : COR.azulClaro}
                strokeOpacity={i < atual.indice ? 1 : 0.5}
                strokeWidth={1.5}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </g>
      </svg>

      <AbsoluteFill
        style={{
          background: "linear-gradient(180deg, rgba(10,26,56,0) 52%, rgba(10,26,56,0.92) 78%, #0A1A38 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 92,
          gap: 18,
        }}
      >
        <div
          style={{
            fontFamily: MONTSERRAT,
            fontWeight: 600,
            fontSize: 26,
            letterSpacing: "0.42em",
            color: COR.dourado,
            opacity: interpolate(frame, [52, 66], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [52, 70], ["0px 16px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          EURO TRIP · EP {atual.episodio}
        </div>
        <div
          style={{
            fontFamily: CINZEL,
            fontWeight: 600,
            fontSize: 132,
            lineHeight: 1,
            letterSpacing: "0.08em",
            color: COR.branco,
            opacity: interpolate(frame, [58, 76], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [58, 84], ["0px 30px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          {atual.nome.toUpperCase()}
        </div>
        <div
          style={{
            fontFamily: MONTSERRAT,
            fontWeight: 400,
            fontSize: 28,
            letterSpacing: "0.3em",
            color: COR.azulClaro,
            opacity: interpolate(frame, [68, 84], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {atual.pais.toUpperCase()}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
