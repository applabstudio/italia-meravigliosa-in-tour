import React from "react"
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import {WelcomeSectionContainer, ParagraphWelcome, HeadingWelcome} from './styles'

const WelcomeSection = () => {
  return (
    <WelcomeSectionContainer className="col-span-12 box-border flex flex-col px-4 xl:col-span-12" id="who-we-are-section">
      <HeadingWelcome className="welcome-section text-center text-gray-800">ITALIA MERAVIGLIOSA</HeadingWelcome>
      <ParagraphWelcome className="text-center">
        Siamo partiti dalla nostra pagina Facebook a Gennaio del 2020, con
        l’intenzione di mostrarvi le meraviglie nascoste del nostro paese
      </ParagraphWelcome>
      <ParagraphWelcome className="text-center">
        Oggi con oltre 250 mila follower e tante foto di località
        pubblicate e milioni di visualizzazioni, abbiamo deciso di creare
        una redazione di “Italia Meravigliosa” e di creare questo portale,
        perchè possa guidarvi in luoghi meravigliosi da esplorare, buon
        viaggio a tutti voi.
      </ParagraphWelcome>
  </WelcomeSectionContainer>
  )
}

export default WelcomeSection
