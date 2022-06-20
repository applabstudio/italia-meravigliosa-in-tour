import React from "react";

const Mission = () => {
    
  const styles = {
    missionContainer: {
      display: "flex", 
      justifyContent: "center", 
      paddingTop: 60 ,
    },

    missionWrapper: {
      width: "100%",
      background: "black",
      height: 380,
      maxWidth: "85rem",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
    },
  
    infoGray: {
      fontSize: 16, 
      fontWeight: "500", 
      fontFamily: "Inter",
      color: "#718176",
    },

    headingMission: {
      color: "white",
      fontSize: 40,
      paddingTop: 50,
      paddingBottom: 10,
    },

    paragraphMission: {
      width: "85%",
      textAlign: "center" as const,
      fontSize: 22,
      fontStyle: "italic",
      color: "white",
      padding: "22px 0"
   },

   ceoParagraph: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Lato"
  }
}

    return (
        <div style={styles.missionContainer}>
          <div className="mx-auto max-w-7xl text-center" style={styles.missionWrapper}>
              <p style={styles.headingMission}> MISSION </p>
              <p style={styles.paragraphMission}>“Guardare l'Italia con gli occhi dell'Artista, e trovare in ogni
                angolo del Bel Paese un luogo Meraviglioso. Guarda l'Italia con
                occhi nuovi con Italia Meravigliosa in Tour. ”</p>
              <p style={styles.infoGray}>Paolo Artista</p>
              <p style={styles.ceoParagraph}>CEO & Founder Italia Meravigliosa</p>
        </div>
      </div>
    )
}

export default Mission