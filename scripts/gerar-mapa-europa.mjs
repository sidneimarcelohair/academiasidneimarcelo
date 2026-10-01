// Gera src/EuroTrip/mapa-europa.ts: contornos dos países e posição das cidades
// já projetados para um quadro 1920x1080. Rode com: node scripts/gerar-mapa-europa.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { geoConicConformal, geoPath, geoBounds } from "d3-geo";
import { feature } from "topojson-client";

const topo = JSON.parse(readFileSync("node_modules/world-atlas/countries-50m.json", "utf8"));
const countries = feature(topo, topo.objects.countries).features;

const CIDADES = [
  { id: "madri", nome: "Madri", pais: "Espanha", lonLat: [-3.7038, 40.4168] },
  { id: "toledo", nome: "Toledo", pais: "Espanha", lonLat: [-4.0273, 39.8628] },
  { id: "praga", nome: "Praga", pais: "República Tcheca", lonLat: [14.4378, 50.0755] },
  { id: "pilsen", nome: "Pilsen", pais: "República Tcheca", lonLat: [13.3776, 49.7384] },
  { id: "viena", nome: "Viena", pais: "Áustria", lonLat: [16.3738, 48.2082] },
  { id: "bratislava", nome: "Bratislava", pais: "Eslováquia", lonLat: [17.1077, 48.1486] },
  { id: "budapeste", nome: "Budapeste", pais: "Hungria", lonLat: [19.0402, 47.4979] },
];

const projection = geoConicConformal().parallels([40, 52]).rotate([-8, 0]);
// Enquadra a rota no terço de cima do quadro, deixando a faixa de baixo para o texto.
projection.fitExtent(
  [[220, 110], [1700, 660]],
  { type: "MultiPoint", coordinates: [[-6.5, 38.8], [21, 51.2]] },
);
const path = geoPath(projection);
const round = (d) => d.replace(/(\d+\.\d)\d+/g, "$1");

const paises = countries
  .filter((f) => {
    const [[x0, y0], [x1, y1]] = geoBounds(f);
    return x1 > -30 && x0 < 50 && y1 > 25 && y0 < 72;
  })
  .map((f) => round(path(f) ?? ""))
  .filter(Boolean);

const cidades = CIDADES.map((c) => {
  const [x, y] = projection(c.lonLat);
  return { ...c, x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
});

const out = `// Arquivo gerado por scripts/gerar-mapa-europa.mjs. Não editar à mão.
// Contornos: Natural Earth via world-atlas (domínio público).

export const PAISES: string[] = ${JSON.stringify(paises)};

export const CIDADES = ${JSON.stringify(cidades, null, 2)} as const;
`;
writeFileSync("src/EuroTrip/mapa-europa.ts", out);
console.log(paises.length, "países;", (out.length / 1024).toFixed(0), "KB");
console.log(cidades.map((c) => `${c.nome} ${c.x},${c.y}`).join("\n"));
