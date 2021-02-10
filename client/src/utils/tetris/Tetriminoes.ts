export const TETROMINOS: any = {
  0: { shape: [[0]], color: '0, 0, 0' },
  I: {
    shape: [[0, 'I', 0, 0], [0, 'I', 0, 0], [0, 'I', 0, 0], [0, 'I', 0, 0]],
    color: 'bg-red-300',
  },
  J: { shape: [[0, 'J', 0], [0, 'J', 0], ['J', 'J', 0]],
  color: 'bg-yellow-600', },
  L: {
    shape: [[0, 'L', 0], [0, 'L', 0], [0, 'L', 'L']],
    color: 'bg-yellow-300',
  },
  O: { shape: [['O', 'O'], ['O', 'O']],
  color: 'bg-green-300', },
  S: { shape: [[0, 'S', 'S'], ['S', 'S', 0], [0, 0, 0]],
  color: 'bg-blue-500',
 },
  T: {
    shape: [['T', 'T', 'T'], [0, 'T', 0], [0, 0, 0],],
    color: 'bg-indigo-600',
  },
  Z: { shape: [['Z', 'Z', 0], [0, 'Z', 'Z'], [0, 0, 0]],
  color: 'bg-purple-600',
 },
};

export const randomTetromino = (letter?: string) => {
  const tetrominos = 'IJLOSTZ';
  const randTetromino = letter ??
    tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randTetromino];
};

export const randomStrings = (length: number, characters: string = 'IJLOSTZ'): string => {
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
