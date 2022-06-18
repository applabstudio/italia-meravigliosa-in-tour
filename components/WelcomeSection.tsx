import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import React from "react"

const WelcomeSection = () => {
  return (
    <div className="col-span-12 box-border flex flex-col px-4 xl:col-span-12" id="who-we-are-section">
    <h1
      className="welcome-section text-center"
      style={{ fontWeight: "700", fontSize: 80 }}>
      ITALIA MERAVIGLIOSA
    </h1>
    <p
      className="text-center"
      style={{
        textAlign: "center",
        fontSize: 22,
        fontFamily: "roboto",
      }}>
      Siamo partiti dalla nostra pagina Facebook a Gennaio del 2020, con
      l’intenzione di mostrarvi le meraviglie nascoste del nostro paese
    </p>
    <p
      className="text-center"
      style={{
        textAlign: "center",
        fontSize: 22,
        fontFamily: "roboto",
      }}>
      Oggi con oltre 250 mila follower e tante foto di località
      pubblicate e milioni di visualizzazioni, abbiamo deciso di creare
      una redazione di “Italia Meravigliosa” e di creare questo portale,
      perchè possa guidarvi in luoghi meravigliosi da esplorare, buon
      viaggio a tutti voi.
    </p>
  </div>
  )
}

export default WelcomeSection
