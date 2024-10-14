type HeaderImageType = {
  guid: string;
  offsetPercentageX: number;
  offsetPercentageY: number;
  width: number;
  height: number;
  url: string;
};

type WebImageType = {
  guid: string;
  offsetPercentageX: number;
  offsetPercentageY: number;
  width: number;
  height: number;
  url: string;
};

type LinksType = {
  self: string;
  web: string;
};

export type IllustrationRawType = {
  links: LinksType;
  id: string;
  objectNumber: string;
  title: string;
  hasImage: boolean;
  principalOrFirstMaker: string;
  longTitle: string;
  showImage: boolean;
  permitDownload: boolean;
  webImage: WebImageType;
  headerImage: HeaderImageType;
  productionPlaces: Array<string>;
};

export type IllustrationType = {
  id: string;
  objectNumber: string;
  title: string;
  hasImage: boolean;
  principalOrFirstMaker: string;
  longTitle: string;
  url: string;
  headerUrl: string;
  width: number;
  height: number;
  description?: string;
};
