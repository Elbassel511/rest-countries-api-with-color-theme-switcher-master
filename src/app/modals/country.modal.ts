export interface Country {
  name: string;

  nativeName: string;
  region: string;
  subregion: string;
  topLevelDomain: string;
  population: number;
  capital: string;
  flags: {
    png: string;
    alt?: string;
  };
  currencies: { code: string; name: string; symbol: string }[];
  languages: { name: string; code: string }[];
  borders: 'string'[];
}
