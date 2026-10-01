import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { COR, MONTSERRAT } from "./tema";

// Etiqueta transparente de preço: valor na moeda local e o equivalente em reais.

export const etiquetaPrecoSchema = z.object({
  item: z.string(),
  precoLocal: z.string(),
  precoReais: z.string(),
});

export const EtiquetaPreco: React.FC<z.infer<typeof etiquetaPrecoSchema>> = ({ item, precoLocal, precoReais }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const saida = interpolate(frame, [durationInFrames - 12, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.7, 0, 0.84, 0),
  });

  return (
    <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "flex-end", padding: "110px 120px 0 0" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 6,
          padding: "22px 30px",
          borderRadius: 14,
          backgroundColor: "rgba(10,26,56,0.82)",
          border: "1.5px solid rgba(210,174,108,0.55)",
          opacity: interpolate(frame, [0, 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }) * (1 - saida),
          scale: interpolate(frame, [0, 16], [0.82, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 11 }),
            output: "perceptual-scale",
          }),
          transformOrigin: "100% 0%",
        }}
      >
        <div
          style={{
            fontFamily: MONTSERRAT,
            fontWeight: 500,
            fontSize: 22,
            letterSpacing: "0.2em",
            color: COR.azulClaro,
          }}
        >
          {item.toUpperCase()}
        </div>
        <div
          style={{
            fontFamily: MONTSERRAT,
            fontWeight: 600,
            fontSize: 64,
            lineHeight: 1.05,
            color: COR.branco,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {precoLocal}
        </div>
        <div
          style={{
            fontFamily: MONTSERRAT,
            fontWeight: 600,
            fontSize: 30,
            color: COR.dourado,
            fontVariantNumeric: "tabular-nums",
            opacity: interpolate(frame, [10, 20], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          ≈ {precoReais}
        </div>
      </div>
    </AbsoluteFill>
  );
};
