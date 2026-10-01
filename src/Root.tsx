import "./index.css";
import { Composition, Folder } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { Abertura } from "./Abertura";
import { Vinheta, vinhetaSchema } from "./EuroTrip/Vinheta";
import { CartelaCidade, cartelaSchema } from "./EuroTrip/CartelaCidade";
import { NomeLugar, nomeLugarSchema } from "./EuroTrip/NomeLugar";
import { EtiquetaPreco, etiquetaPrecoSchema } from "./EuroTrip/EtiquetaPreco";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Abertura"
        component={Abertura}
        durationInFrames={210}
        fps={30}
        width={1920}
        height={1080}
      />

      <Folder name="EuroTrip">
        <Composition
          id="EuroTripVinheta"
          component={Vinheta}
          durationInFrames={120}
          fps={30}
          width={1920}
          height={1080}
          schema={vinhetaSchema}
          defaultProps={{ cidade: "praga" as const }}
        />
        <Composition
          id="EuroTripCartela"
          component={CartelaCidade}
          durationInFrames={120}
          fps={30}
          width={1920}
          height={1080}
          schema={cartelaSchema}
          defaultProps={{ cidade: "praga" as const }}
        />
        <Composition
          id="EuroTripLugar"
          component={NomeLugar}
          durationInFrames={120}
          fps={30}
          width={1920}
          height={1080}
          schema={nomeLugarSchema}
          defaultProps={{ lugar: "Ponte Carlos", detalhe: "Praga · República Tcheca" }}
        />
        <Composition
          id="EuroTripPreco"
          component={EtiquetaPreco}
          durationInFrames={105}
          fps={30}
          width={1920}
          height={1080}
          schema={etiquetaPrecoSchema}
          defaultProps={{ item: "Churros com chocolate", precoLocal: "€ 4,50", precoReais: "R$ 28" }}
        />
      </Folder>

      <Composition
        // You can take the "id" to render a video:
        // npx remotion render HelloWorld
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />

      {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />
    </>
  );
};
