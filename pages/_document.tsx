import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document"

const iubendaImplementation = `
<script type="text/javascript">
var _iub = _iub || [];
_iub.csConfiguration = {"consentOnContinuedBrowsing":false,"countryDetection":true,"floatingPreferencesButtonDisplay":"anchored-center-right","gdprAppliesGlobally":false,"invalidateConsentWithoutLog":true,"perPurposeConsent":true,"siteId":2622561,"whitelabel":false,"cookiePolicyId":76997417,"lang":"it", "banner":{ "acceptButtonCaptionColor":"#FFFFFF","acceptButtonColor":"#0073CE","acceptButtonDisplay":true,"backgroundColor":"#FFFFFF","closeButtonRejects":true,"customizeButtonCaptionColor":"#4D4D4D","customizeButtonColor":"#DADADA","customizeButtonDisplay":true,"explicitWithdrawal":true,"listPurposes":true,"position":"float-bottom-center","textColor":"#000000" }};
</script>
<script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" charset="UTF-8" async></script>`

class MainDocument extends Document {
  render() {
    return (
      <Html lang="it" className="scroll-smooth">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png" />
          <meta name="theme-color" content="#EF4444" />



          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div dangerouslySetInnerHTML={{ __html: iubendaImplementation }} />
        </body>
      </Html>
    )
  }

  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }
}

export default MainDocument
