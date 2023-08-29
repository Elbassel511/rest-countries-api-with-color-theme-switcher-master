export interface Country {
  name: {
    common: string;
  };
  region: string;
  population: number;
  capital: string;
  flags: {
    png: string;
    alt: string;
  };
}
