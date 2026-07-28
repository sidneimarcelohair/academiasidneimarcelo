import { Easing, interpolate, useCurrentFrame } from "remotion";

// Monograma ASM em traço vetorial — cada path é desenhado na tela
// via pathLength normalizado (dasharray 1 → dashoffset 1..0).

export const ASM_PATHS = {
  aEsquerda: "M 200 26 L 106 236 M 90 236 L 122 236",
  aDireita: "M 200 26 L 294 236 M 278 236 L 310 236",
  aBarra: "M 152 148 L 248 148",
  s: "M 264 118 C 264 82, 224 66, 194 78 C 156 94, 146 142, 176 174 C 208 209, 254 226, 260 268 C 266 314, 218 340, 176 326 C 150 317, 138 294, 142 274",
  m: "M 112 382 L 128 382 L 128 262 L 200 366 L 272 262 L 272 382 M 256 382 L 288 382",
} as const;

type StrokeProps = {
  d: string;
  from: number;
  duration: number;
};

const DrawnPath: React.FC<StrokeProps> = ({ d, from, duration }) => {
  const frame = useCurrentFrame();

  return (
    <path
      d={d}
      pathLength={1}
      fill="none"
      stroke="#FFFFFF"
      strokeWidth={6}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={1}
      strokeDashoffset={interpolate(frame, [from, from + duration], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.45, 0, 0.25, 1),
      })}
    />
  );
};

export const LogoASM: React.FC<{ size: number }> = ({ size }) => {
  return (
    <svg
      width={size}
      height={size * 1.05}
      viewBox="0 0 400 420"
      style={{ overflow: "visible" }}
    >
      {/* A — duas pernas e a barra */}
      <DrawnPath d={ASM_PATHS.aEsquerda} from={0} duration={16} />
      <DrawnPath d={ASM_PATHS.aDireita} from={8} duration={16} />
      <DrawnPath d={ASM_PATHS.aBarra} from={18} duration={10} />
      {/* S — curva grande atravessando o monograma */}
      <DrawnPath d={ASM_PATHS.s} from={24} duration={34} />
      {/* M — base do monograma */}
      <DrawnPath d={ASM_PATHS.m} from={52} duration={26} />
    </svg>
  );
};
