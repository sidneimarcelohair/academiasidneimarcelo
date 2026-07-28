import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";
import { LogoASM } from "./LogoASM";

loadFont({
  family: "Cinzel",
  url: staticFile("fonts/Cinzel-500.woff2"),
  weight: "500",
});
loadFont({
  family: "Montserrat",
  url: staticFile("fonts/Montserrat-300.woff2"),
  weight: "300",
});
const cinzel = { fontFamily: "Cinzel" };
const montserrat = { fontFamily: "Montserrat" };

const AZUL_MARINHO = "#0A1A38";

const Titulo: React.FC = () => {
  const frame = useCurrentFrame();
  const texto = "ACADEMIA SIDNEI MARCELO";

  return (
    <div
      style={{
        fontFamily: cinzel.fontFamily,
        fontWeight: 500,
        fontSize: 88,
        color: "#FFFFFF",
        letterSpacing: "0.14em",
        whiteSpace: "pre",
        display: "flex",
      }}
    >
      {texto.split("").map((letra, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: interpolate(frame, [i * 1.6, i * 1.6 + 22], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            translate: `0px ${interpolate(
              frame,
              [i * 1.6, i * 1.6 + 26],
              [34, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            )}px`,
            filter: `blur(${interpolate(
              frame,
              [i * 1.6, i * 1.6 + 20],
              [8, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            )}px)`,
          }}
        >
          {letra}
        </span>
      ))}
    </div>
  );
};

const Frase: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        fontFamily: montserrat.fontFamily,
        fontWeight: 300,
        fontSize: 34,
        color: "#C9D4E8",
        textTransform: "lowercase",
        opacity: interpolate(frame, [0, 34], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        letterSpacing: `${interpolate(frame, [0, 40], [0.55, 0.28], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        })}em`,
      }}
    >
      dividindo conhecimentos para multiplicar experiências
    </div>
  );
};

export const Abertura: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: AZUL_MARINHO }}>
      {/* vinheta sutil para dar profundidade ao fundo */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(30,58,110,0.55) 0%, rgba(10,26,56,0) 65%)",
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 56,
        }}
      >
        <div
          style={{
            scale: String(
              interpolate(frame, [78, 110], [1, 0.92], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              }),
            ),
          }}
        >
          <LogoASM size={330} />
        </div>
        <Sequence from={80} layout="none" name="Titulo">
          <Titulo />
        </Sequence>
        <Sequence from={118} layout="none" name="Frase">
          <Frase />
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
