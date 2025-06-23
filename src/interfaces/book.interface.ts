export type BookGenre = 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY';

export interface IBook {
  title: string;
  author: string;
  genre: BookGenre;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
}