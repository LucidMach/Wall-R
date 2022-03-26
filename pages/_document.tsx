import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/png" href="./LoGo.png" />
          <meta
            name="description"
            content="IoT Smart Dustbin - Custom Built from Scratch"
          />
          <link rel="apple-touch-icon" href="./LoGo.png" />
          <link rel="manifest" href="./manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
