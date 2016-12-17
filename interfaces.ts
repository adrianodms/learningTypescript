import { Category } from './enums';

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?:number;
    markDamaged?:(reason:string) => void;
}

interface DamagedLogger{
    (reason: string): void;
}

interface Person{
    name:'string';
    email:'string';
}

interface Author extends Person{
    numBooksPublished: number;
}

interface Librarian extends Person{
    
}

export { Book, DamagedLogger };
