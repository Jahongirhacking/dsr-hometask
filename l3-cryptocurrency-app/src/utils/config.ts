export const api_key =
  "0c7b4055f59aa902dd25cb4b897302c67b108c83beedca78330d57d8fdbfa822";

export const getBaseUrl = (coin: string) =>
  `https://min-api.cryptocompare.com/data/price?fsym=${coin}&tsyms=USD&api_key=${api_key}`;
