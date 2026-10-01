import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { COR, MONTSERRAT } from "./tema";

// Lower third transparente: nome do lugar quando você chega nele.

export const nomeLugarSchema = z.object({
  lugar: z.string(),
  detalhe: z.string(),
});

export const NomeLugar: React.FC<z.infer<typeof nomeLugarSchema>> = ({ lugar, detalhe }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const saida = interpolate(frame, [durationInFrames - 14, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.7, 0, 0.84, 0),
  });

  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "flex-start", padding: "0 0 110px 120px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          gap: 24,
          opacity: 1 - saida,
          translate: `${-40 * saida}px 0px`,
        }}
      >
        <div
          style={{
            width: 5,
            backgroundColor: COR.dourado,
            scale: interpolate(frame, [0, 14], ["1 0", "1 1"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: "18px 34px 18px 0",
            clipPath: `inset(0 ${interpolate(frame, [6, 26], [100, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            })}% 0 0)`,
          }}
        >
          <div
            style={{
              fontFamily: MONTSERRAT,
              fontWeight: 600,
              fontSize: 54,
              lineHeight: 1.05,
              color: COR.branco,
              textShadow: "0 2px 16px rgba(10,26,56,0.75)",
            }}
          >
            {lugar}
          </div>
          <div
            style={{
              fontFamily: MONTSERRAT,
              fontWeight: 500,
              fontSize: 24,
              letterSpacing: "0.22em",
              color: COR.azulClaro,
              textShadow: "0 2px 12px rgba(10,26,56,0.85)",
            }}
          >
            {detalhe.toUpperCase()}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
