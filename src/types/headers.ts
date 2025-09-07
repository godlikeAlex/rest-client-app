export interface Header {
  key: string;
  value: string;
}

export interface HeaderClient extends Header {
  enabled: boolean;
}
