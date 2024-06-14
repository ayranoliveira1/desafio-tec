export function sortearCodigo(listaDeCodigos: string[]): string {
   const indiceSorteado = Math.floor(Math.random() * listaDeCodigos.length);
   return listaDeCodigos[indiceSorteado];
}

export const listaDeCodigos = [
   "LXGIWYL",
   "KJKSZPJ",
   "UZUMYMW",
   "NCSGDAG",
   "WANRLTW",
   "JYSDSOD",
   "OGXSDAG",
   "EHIBXQS",
   "BTCDBCB",
   "KVGYZQK",
   "LFGMHAL",
   "IAVENJQ",
   "BEKKNQV",
   "MUNASEF",
   "BAGUVIX",
];
