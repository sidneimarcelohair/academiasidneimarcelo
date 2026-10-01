import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { CINZEL, COR, MONTSERRAT, cidadeSchema, dadosCidade } from "./tema";

// Cartela transparente com o nome da cidade, para pôr sobre o primeiro
// plano aberto do episódio (a revelação do cartão-postal).

export const cartelaSchema = z.object({ cidade: cidadeSchema });

export const CartelaCidade: React.FC<z.infer<typeof cartelaSchema>> = ({ cidade }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const c = dadosCidade(cidade);
  const letras = c.nome.toUpperCase().split("");
  const saida = interpolate(frame, [durationInFrames - 16, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.7, 0, 0.84, 0),
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: saida }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26 }}>
        <div
          style={{
            fontFamily: MONTSERRAT,
            fontWeight: 600,
            fontSize: 24,
            letterSpacing: "0.42em",
            color: COR.dourado,
            textShadow: "0 2px 12px rgba(10,26,56,0.6)",
            opacity: interpolate(frame, [4, 18], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          EURO TRIP · EP {c.episodio}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: CINZEL,
            fontWeight: 600,
            fontSize: 168,
            lineHeight: 1,
            letterSpacing: "0.1em",
            color: COR.branco,
            textShadow: "0 4px 30px rgba(10,26,56,0.55)",
            whiteSpace: "pre",
          }}
        >
          {letras.map((letra, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                opacity: interpolate(frame, [8 + i * 2, 8 + i * 2 + 18], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                }),
                translate: interpolate(frame, [8 + i * 2, 8 + i * 2 + 24], ["0px 40px", "0px 0px"], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                }),
              }}
            >
              {letra}
            </span>
          ))}
        </div>
        <div
          style={{
            height: 2,
            width: 420,
            backgroundColor: COR.dourado,
            scale: interpolate(frame, [20, 46], ["0 1", "1 1"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.65, 0, 0.35, 1),
            }),
          }}
        />
        <div
          style={{
            fontFamily: MONTSERRAT,
            fontWeight: 500,
            fontSize: 30,
            letterSpacing: "0.32em",
            color: COR.branco,
            textShadow: "0 2px 12px rgba(10,26,56,0.7)",
            opacity: interpolate(frame, [34, 50], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {c.pais.toUpperCase()}
        </div>
      </div>
    </AbsoluteFill>
  );
};
