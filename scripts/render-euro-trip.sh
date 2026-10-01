#!/bin/bash
# Renderiza o pacote gráfico da série Euro Trip em 4K para o Premiere.
#   ./scripts/render-euro-trip.sh            -> vinhetas e cartelas das 7 cidades + exemplos
#   ./scripts/render-euro-trip.sh lugar "Ponte Carlos" "Praga · República Tcheca"
#   ./scripts/render-euro-trip.sh preco "Trdelník" "120 Kč" "R\$ 30"
# Vinhetas saem em MP4 (H.264). Elementos transparentes saem em MOV com codec PNG
# (canal alfa, leve e aceito pelo Premiere).
set -e
cd "$(dirname "$0")/.."
OUT=out/euro-trip
mkdir -p "$OUT"/vinhetas "$OUT"/cartelas "$OUT"/lugares "$OUT"/precos

slug() { echo "$1" | iconv -f utf8 -t ascii//TRANSLIT | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]\+/-/g; s/^-//; s/-$//'; }

transparente() { # composição, props json, arquivo final
  local tmp="$OUT/tmp-frames-$RANDOM"
  npx remotion render "$1" "$tmp" --sequence --image-format=png --scale=2 --props="$2" --log=error
  ffmpeg -loglevel error -y -framerate 30 -i "$tmp/element-%03d.png" -c:v png -pix_fmt rgba "$3"
  rm -rf "$tmp"
  echo "ok $3"
}

vinheta() { # cidade, número do episódio
  npx remotion render EuroTripVinheta "$OUT/vinhetas/EP$2-$1-vinheta.mp4" --scale=2 --codec=h264 --crf=16 \
    --props="{\"cidade\":\"$1\"}" --log=error
  echo "ok vinheta $1"
}

case "$1" in
  lugar) transparente EuroTripLugar "{\"lugar\":\"$2\",\"detalhe\":\"$3\"}" "$OUT/lugares/$(slug "$2").mov" ;;
  preco) transparente EuroTripPreco "{\"item\":\"$2\",\"precoLocal\":\"$3\",\"precoReais\":\"$4\"}" "$OUT/precos/$(slug "$2").mov" ;;
  *)
    n=1
    for c in madri toledo praga pilsen viena bratislava budapeste; do
      ep=$(printf "%02d" $n)
      vinheta "$c" "$ep"
      transparente EuroTripCartela "{\"cidade\":\"$c\"}" "$OUT/cartelas/EP$ep-$c-cartela.mov"
      n=$((n+1))
    done
    transparente EuroTripLugar '{"lugar":"Ponte Carlos","detalhe":"Praga · República Tcheca"}' "$OUT/lugares/EXEMPLO-ponte-carlos.mov"
    transparente EuroTripPreco '{"item":"Churros com chocolate","precoLocal":"€ 4,50","precoReais":"R$ 28"}' "$OUT/precos/EXEMPLO-churros.mov"
    ;;
esac
