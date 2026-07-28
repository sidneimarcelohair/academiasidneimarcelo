import { Easing, interpolate, useCurrentFrame } from "remotion";

// Monograma ASM em traço vetorial — cada path é desenhado na tela
// via pathLength normalizado (dasharray 1 → dashoffset 1..0).

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
      strokeWidth={7}
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
      height={size * 1.1}
      viewBox="0 0 400 440"
      style={{ overflow: "visible" }}
    >
      {/* A — duas pernas e a barra */}
      <DrawnPath d="M 200 30 L 118 210 M 104 210 L 132 210" from={0} duration={16} />
      <DrawnPath d="M 200 30 L 282 210 M 268 210 L 296 210" from={8} duration={16} />
      <DrawnPath d="M 152 146 L 248 146" from={18} duration={10} />
      {/* S — curva grande atravessando o monograma */}
      <DrawnPath
        d="M 262 128 C 262 96, 224 82, 196 92 C 158 105, 148 150, 176 180 C 206 212, 250 228, 256 268 C 262 312, 216 338, 176 324 C 150 315, 138 292, 142 272"
        from={24}
        duration={34}
      />
      {/* M — base do monograma */}
      <DrawnPath
        d="M 118 404 L 132 404 L 132 316 L 200 396 L 268 316 L 268 404 M 254 404 L 282 404"
        from={52}
        duration={26}
      />
    </svg>
  );
};
