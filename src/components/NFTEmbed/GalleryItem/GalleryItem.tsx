import React, { CSSProperties} from 'react';
import { OpenseaAsset } from '../types/OpenseaAsset';
import { getAssetTitle, joinClassNames } from '../utils';
import { Lightbox } from '../Lightbox/Lightbox';

import './gallery-item.css';

interface NftGalleryProps {
  /**
   * Ethereum address (`0x...`) or ENS domain (`vitalik.eth`) for which the gallery should contain associated NFTs.
   * Required.
   */
  ownerAddress: string;

  /**
   * Display asset metadata underneath the NFT.
   * Defaults to `true`.
   */
  metadataIsVisible?: boolean;

  /**
   * Display gallery in dark mode.
   * Defaults to `false`.
   */
  darkMode?: boolean;

  /**
   * Display gallery in showcase mode. Only NFTs specified in `showcaseItemIds` will be rendered.
   * Defaults to `false`.
   */
  showcaseMode?: boolean;

  /**
   * An array of IDs for assets that should be displayed when `showcaseMode` is active.
   * Each ID is formed by combining the asset's contract address and the asset's own tokenId: `{:assetContractAddress}/{:tokenId}`
   *
   * For example:
   *
   * ```jsx
   * showcaseItemIds={["0xabcdef.../123", "0xa1b2c3.../789"]}
   * ```
   */
  showcaseItemIds?: string[];

  /**
   * Enables/disables the lightbox being shown when a gallery item is clicked/tapped.
   * Defaults to `true`.
   */
  hasLightbox?: boolean;

  /**
   * Enables/disables a gallery item's title and collection name linking to the asset and collection on OpenSea, respectively.
   * Defaults to `true`.
   */
  hasExternalLinks?: boolean;

  /**
   * Renders the gallery as a single row with horizontal scrolling. Useful when rendering the gallery between other content.
   * Defaults to `false`.
   */
  isInline?: boolean;

  /**
   * Overrides the default styling of the gallery's container.
   */
  galleryContainerStyle?: CSSProperties;

  /**
   * Overrides the default styling of all gallery item containers.
   */
  itemContainerStyle?: CSSProperties;

  /**
   * Overrides the default styling of all gallery item image containers.
   */
  imgContainerStyle?: CSSProperties;
}

const ExternalLink: React.FC<{ href: string }> = ({ href, children }) => (
  <a
    className="rnftg-no-underline rnftg-text-black dark:rnftg-text-gray-200"
    href={href}
    target="_blank"
    rel="noopener"
  >
    {children}
  </a>
);

export interface GalleryItemProps {
  asset: OpenseaAsset;
  index: number;
  metadataIsVisible: NftGalleryProps['metadataIsVisible'];
  hasLightbox: NftGalleryProps['hasLightbox'];
  setLightboxIndex: (nextIndex: number) => void;
  hasExternalLinks: NftGalleryProps['hasExternalLinks'];
  itemContainerStyle: NftGalleryProps['itemContainerStyle'];
  imgContainerStyle: NftGalleryProps['imgContainerStyle'];
}

export const GalleryItem: React.FC<GalleryItemProps> = ({
  asset,
  index,
  metadataIsVisible,
  hasLightbox,
  setLightboxIndex,
  hasExternalLinks,
  itemContainerStyle,
  imgContainerStyle,
}) => {
  const assetTitle = getAssetTitle(asset);

  const renderAssetMedia = () => {
    // No media present -> render the name/tokenId as a placeholder.
    if (!asset.image_preview_url) {
      return (
        <div
          className={joinClassNames(
            'rnftg-flex rnftg-flex-col rnftg-justify-center rnftg-items-center rnftg-w-full rnftg-h-full rnftg-cursor-pointer',
            'rnftg-break-words rnftg-truncate rnftg-text-lg rnftg-font-semibold dark:rnftg-text-gray-200'
          )}
        >
          {assetTitle}
        </div>
      );
    }

    const assetMediaExt = asset.image_preview_url.split('.').pop();
    if (assetMediaExt === 'mp4') {
      return (
        <video
          className={joinClassNames(
            'rnftg-w-full rnftg-h-full rnftg-object-cover rnftg-cursor-pointer',
            metadataIsVisible ? 'rnftg-rounded-t-2xl' : 'rnftg-rounded-2xl'
          )}
          src={asset.image_preview_url}
          preload="auto"
          controlsList="nodownload"
          autoPlay
          loop
          playsInline
        ></video>
      );
    }

    return (
      <img
        className={joinClassNames(
          'rnftg-w-full rnftg-h-full rnftg-object-cover rnftg-cursor-pointer',
          metadataIsVisible ? 'rnftg-rounded-t-2xl' : 'rnftg-rounded-2xl'
        )}
        src={asset.image_preview_url}
        alt={asset.name}
        loading="lazy"
      />
    );
  };

  return (
    <article
      style={itemContainerStyle}
      className="rnftg-item rnftg-rounded-2xl rnftg-bg-white dark:rnftg-bg-gray-800 rnftg-shadow-lg hover:rnftg-shadow-xl rnftg-transition rnftg-duration-300"
    >
      <div style={imgContainerStyle} className="rnftg-item__img-wrapper">
        <a
          className="rnftg-no-underline rnftg-text-black dark:rnftg-text-gray-200"
          onClick={() => setLightboxIndex(index)}
          href={`#lightbox-${index}`}
        >
          {renderAssetMedia()}
        </a>
      </div>
      {metadataIsVisible && (
        <div className="rnftg-p-4">
          <div className="rnftg-break-words rnftg-truncate rnftg-text-lg rnftg-font-semibold dark:rnftg-text-gray-200">
            {hasExternalLinks ? (
              <ExternalLink href={asset.permalink}>{assetTitle}</ExternalLink>
            ) : (
              assetTitle
            )}
          </div>
          <hr className="rnftg-mx-2 rnftg-my-4 rnftg-border-gray-100 dark:rnftg-border-gray-900" />
          <div className="rnftg-flex rnftg-items-center">
            {asset.collection.image_url && (
              <img
                src={asset.collection.image_url}
                alt={asset.collection.name}
                className="rnftg-w-8 rnftg-h-8 rnftg-mr-2 rnftg-rounded-full"
              />
            )}
            <div className="rnftg-text-sm rnftg-font-semibold rnftg-truncate dark:rnftg-text-gray-200">
              {hasExternalLinks ? (
                <ExternalLink
                  href={`https://opensea.io/collection/${asset.collection.slug}`}
                >
                  {asset.collection.name}
                </ExternalLink>
              ) : (
                asset.collection.name
              )}
            </div>
          </div>
        </div>
      )}
      {hasLightbox && (
        <Lightbox
          index={index}
          asset={asset}
          setLightboxIndex={setLightboxIndex}
        />
      )}
    </article>
  );
};
