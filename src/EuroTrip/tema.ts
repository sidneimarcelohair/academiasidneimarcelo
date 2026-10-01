import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
import { z } from "zod";
import { CIDADES } from "./mapa-europa";

// Fontes locais (Fontsource, licença OFL) para renderizar sem depender da internet.
const LATIN =
  "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD";
const LATIN_EXT =
  "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF";

export const CINZEL = "Cinzel EuroTrip";
export const MONTSERRAT = "Montserrat EuroTrip";

const fontes: [string, string, string[]][] = [
  [CINZEL, "cinzel", ["500", "600"]],
  [MONTSERRAT, "montserrat", ["400", "500", "600"]],
];
for (const [family, arquivo, pesos] of fontes) {
  for (const weight of pesos) {
    loadFont({ family, weight, unicodeRange: LATIN, url: staticFile(`fonts/eurotrip/${arquivo}-latin-${weight}-normal.woff2`) });
    loadFont({ family, weight, unicodeRange: LATIN_EXT, url: staticFile(`fonts/eurotrip/${arquivo}-latin-ext-${weight}-normal.woff2`) });
  }
}

// Mesma base da vinheta da Academia: azul-marinho, branco e azul-claro.
// O dourado é o fio condutor da série Euro Trip (a linha da rota).
export const COR = {
  marinho: "#0A1A38",
  marinhoClaro: "#13284F",
  borda: "#2B4373",
  branco: "#FFFFFF",
  azulClaro: "#C9D4E8",
  dourado: "#D2AE6C",
} as const;

export const cidadeSchema = z.enum([
  "madri",
  "toledo",
  "praga",
  "pilsen",
  "viena",
  "bratislava",
  "budapeste",
]);
export type CidadeId = z.infer<typeof cidadeSchema>;

export const dadosCidade = (id: CidadeId) => {
  const indice = CIDADES.findIndex((c) => c.id === id);
  return { ...CIDADES[indice], indice, episodio: String(indice + 1).padStart(2, "0") };
};
