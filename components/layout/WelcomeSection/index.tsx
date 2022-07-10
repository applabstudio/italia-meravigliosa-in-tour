import React from "react"

const WelcomeSection = () => {
  return (
    <section
      id="who-we-are-section"
      className="col-span-12 !mt-4 box-border flex flex-col px-4 xl:col-span-12"
    >
      <p className="welcome-subtitle !mt-14 text-center text-4xl font-semibold first-title">
        Guida alla scoperta del Bel Paese
      </p>
      <h1 className="mt-4 text-center text-5xl font-semibold uppercase lg:text-7xl">
        Italia Meravigliosa
      </h1>

      <p className="mt-8 text-center font-medium">
        Siamo partiti dalla nostra pagina Facebook a Gennaio del 2020, con
        l’intenzione di mostrarvi le meraviglie nascoste del nostro paese Oggi
        con oltre 250 mila follower e tante foto di località pubblicate e
        milioni di visualizzazioni, abbiamo deciso di creare una redazione di
        “Italia Meravigliosa” e di creare questo portale, perchè possa guidarvi
        in luoghi meravigliosi da esplorare, buon viaggio a tutti voi.
      </p>
    </section>
  )
}

export default WelcomeSection