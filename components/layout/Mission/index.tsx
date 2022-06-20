import React from "react";
import { ParagraphMission, MissionContainer, MissionWrapper, InfoGray, HeadingMission, CeoParagraph} from "./styles";

const Mission = () => {
    
    return (
        <MissionContainer>
          <MissionWrapper className="mx-auto max-w-7xl text-center">
              <HeadingMission>MISSION</HeadingMission>
              <ParagraphMission>“Guardare l'Italia con gli occhi dell'Artista, e trovare in ogni
                angolo del Bel Paese un luogo Meraviglioso. Guarda l'Italia con
                occhi nuovi con Italia Meravigliosa in Tour. ”</ParagraphMission>
              <InfoGray>Paolo Artista</InfoGray>
              <CeoParagraph>CEO & Founder Italia Meravigliosa</CeoParagraph>
        </MissionWrapper>
      </MissionContainer>
    )
}

export default Mission