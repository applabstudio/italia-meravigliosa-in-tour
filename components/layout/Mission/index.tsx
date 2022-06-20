import React from "react";

const Mission = () => {
    
    const style_MissionContainer = {
      display: "flex", 
      justifyContent: "center", 
      paddingTop: 60 
    }

    const style_MissionWrapper = {
      width: "100%",
      background: "black",
      height: 380,
      maxWidth: "85rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }

    const style_infoGray = {
      fontSize: 16, 
      fontWeight: "500", 
      fontFamily: "Inter"
    }

    const style_headingMission = {
      color: "white",
      fontSize: 40,
      paddingTop: 50,
      paddingBottom: 10
    }

    const style_ParagraphMission = {
      width: "80%",
      textAlign: "justify",
      fontFamily: "Inter",
      fontSize: 22,
      fontStyle: "italic"
    }

    const style_CeoParagraph = {
      color: "white",
      fontSize: 20,
      fontWeight: "700",
      fontFamily: "Lato"
    }

    return (
        <div style={style_MissionContainer}>
          <div className="mx-auto max-w-7xl" style={style_MissionWrapper} className="text-center">
              <p style={style_headingMission}> MISSION </p>
              <p className="infoGray" style={style_ParagraphMission}>“Guardare l'Italia con gli occhi dell'Artista, e trovare in ogni
                angolo del Bel Paese un luogo Meraviglioso. Guarda l'Italia con
                occhi nuovi con Italia Meravigliosa in Tour. ”</p>
              <p style={style_CeoParagraph}>Paolo Artista</p>
              <p className="infoGray" style={style_infoGray}>CEO & Founder Italia Meravigliosa</p>
        </div>
      </div>
    )

}

export default Mission