import React from "react";

const Mission = () => {
    
    return (
        <div style={{ display: "flex", justifyContent: "center", paddingTop: 60 }}>
          <div
            className="mx-auto max-w-7xl text-center"
            style={{
              width: "100%",
              background: "black",
              height: 380,
              maxWidth: "85rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
              <p
                style={{
                  color: "white",
                  fontSize: 40,
                  paddingTop: 50,
                  paddingBottom: 10,
                }}> MISSION </p>
              <p
                className="infoGray"
                style={{
                  width: "80%",
                  textAlign: "justify",
                  fontFamily: "Inter",
                  fontSize: 22,
                  fontStyle: "italic",
                }}>“Guardare l'Italia con gli occhi dell'Artista, e trovare in ogni
                angolo del Bel Paese un luogo Meraviglioso. Guarda l'Italia con
                occhi nuovi con Italia Meravigliosa in Tour. ”</p>
              <p
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "700",
                  fontFamily: "Lato",
                }}>Paolo Artista</p>
              <p
                className="infoGray"
                style={{ fontSize: 16, fontWeight: "500", fontFamily: "Inter" }}>CEO & Founder Italia Meravigliosa
              </p>
        </div>
      </div>
    )

}

export default Mission