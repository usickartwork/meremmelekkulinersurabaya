/**
 * Commercial Banner Advertisement Inventory for Merem Kuliner Surabaya
 * Authentic Indonesian portal digital ads (inspired by detik.com, kompas.com)
 */

export interface CommercialAd {
  id: string;
  brandName: string;
  campaignTitle: string;
  imageSrc: string;
  altText: string;
  targetUrl: string;
  supportedPlacements: Array<'header' | 'sidebar' | 'in-article' | 'feed'>;
  aspectRatio: 'banner-wide' | 'square' | 'standard';
}

export const COMMERCIAL_ADS: CommercialAd[] = [
  {
    id: 'ad-netshort-exclusive',
    brandName: 'NetShort',
    campaignTitle: 'Exclusive on NetShort: Bankrupt My Cheating Husband',
    imageSrc: '/ads/netshort-banner.jpg',
    altText: 'NetShort App - Bankrupt My Cheating Husband Drama Series Promo',
    targetUrl: '#',
    supportedPlacements: ['header', 'in-article', 'feed'],
    aspectRatio: 'banner-wide',
  },
  {
    id: 'ad-tolak-linu-sleep',
    brandName: 'Sido Muncul Tolak Linu Sleep',
    campaignTitle: 'Tolak Linu Sleep - Membantu Meredakan Pegal Linu & Mempermudah Tidur',
    imageSrc: '/ads/tolak-linu-sleep.jpg',
    altText: 'Sido Muncul Tolak Linu Sleep Herbal Alami dengan Valerian & Passion Flower',
    targetUrl: '#',
    supportedPlacements: ['sidebar', 'feed', 'in-article'],
    aspectRatio: 'square',
  },
  {
    id: 'ad-traveloka-surabaya',
    brandName: 'Traveloka',
    campaignTitle: 'Staycation Akhir Pekan Surabaya - Diskon s/d 50% + Cashback',
    imageSrc: '/ads/traveloka-staycation.jpg',
    altText: 'Traveloka Promo Hotel & Staycation Surabaya',
    targetUrl: '#',
    supportedPlacements: ['header', 'in-article', 'feed'],
    aspectRatio: 'banner-wide',
  },
  {
    id: 'ad-pesta-kuliner-surabaya',
    brandName: 'Pesta Kuliner Surabaya',
    campaignTitle: 'Pesta Kuliner Surabaya - Diskon s/d 70% + Gratis Ongkir',
    imageSrc: '/ads/promo-kuliner-surabaya.jpg',
    altText: 'Pesta Kuliner Surabaya Diskon 70% Rawon Bebek Sate Klopo',
    targetUrl: '#',
    supportedPlacements: ['sidebar', 'feed', 'in-article'],
    aspectRatio: 'square',
  },
];
