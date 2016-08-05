export interface City {
  cityNameLN: string;
  countryNameEN: string;
  type: string;
  cityNameEN: string;
  countryCode: string;
  countryNameLN: string;
  stateCode: string;
  relatedItems: RelatedItem[],
  value: string;
  cityCode: string;
}

export interface RelatedItem {
  type: string;
  value: string;
  airportNameEN: string;
}
