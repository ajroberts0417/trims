import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { GalleryItem } from '../components/NFTEmbed/GalleryItem/GalleryItem'
import exampleAsset from '../components/NFTEmbed/example-asset.json'

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div class="frame">
    <GalleryItem
      key={exampleAsset.id}
      index={1}
      asset={exampleAsset}
      metadataIsVisible={false}
      hasLightbox={false}
      setLightboxIndex={() => {}}
      hasExternalLinks={false}
      itemContainerStyle={{ width: '100%', height: '100%' }}
      imgContainerStyle={{ width: '100%', height: '100%' }}
    />
    </div>
    <StaticImage
      src="../images/gatsby-astronaut.png"
      width={300}
      quality={95}
      formats={["auto", "webp", "avif"]}
      alt="A Gatsby astronaut"
      style={{ marginBottom: `1.45rem` }}
    />
    <p>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </p>
  </Layout>
)

export default IndexPage
