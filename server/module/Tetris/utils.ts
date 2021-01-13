
export const createRandomTetrimonioes = (): string => {
  const tetriminoes = 'ZSTOLIJ';
  const characters = tetriminoes;
  return randomStrins(1000, characters);
};

export const randomGameCode = (): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return randomStrins(10, characters);
};

function randomStrins (length: number, characters: string): string {
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
