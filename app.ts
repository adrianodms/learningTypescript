import { Category } from './enums';
import { Book , DamagedLogger} from './interfaces';

function GetAllBooks(): Book[] {
    let books = [
        { id: 1, title: "Ulysses", author: "James Joyce", available: true, category: Category.Fiction },
        { id: 2, title: "A Farewell to Arms", author: "Ernest Hemingway", available: false, category: Category.Fiction },
        { id: 3, title: "I Know Why the Caged Bird Sings", author: "Maya Angelou", available: true, category: Category.Poetry },
        { id: 4, title: "Moby Dick", author: "Herman Melville", available: true, category: Category.Fiction }
    ];
    return books;
}

function LogFirstAvailable(books = GetAllBooks()): void {
    let numberOfBooks: number = books.length;
    let firstAvailable: string = '';
    for (let currentBook of books) {
        if (currentBook.available) {
            firstAvailable = currentBook.title;
            break;
        }
    }
    console.log('Total Books: ' + numberOfBooks);
    console.log('firstAvailable: ' + firstAvailable);
}

function GetBookTitlesByCategory(categoryFilter: Category = Category.Fiction): Array<string> {
    console.log('Getting books in category: ' + Category[categoryFilter]);

    const allBooks = GetAllBooks();
    const filteredTitles: string[] = [];

    for (let currentBook of allBooks) {
        if (currentBook.category == categoryFilter) {
            filteredTitles.push(currentBook.title)
        }
    }

    return filteredTitles;
}


function LogBookTitles(titles: string[]): void {
    for (let title of titles) {
        console.log(title);
    }
}

function GetBookById(id: number): Book {
    const allBooks = GetAllBooks();
    return allBooks.filter((book) => book.id === id)[0];
}

function CreateCustomerID(name: string, id: number): string {
    return name + id;
}

function CreateCustomer(name: string, age?: number, city?: string): void {
    console.log('Creating custormer ' + name);
    if (age) {
        console.log('Age: ' + age);
    }
    if (city) {
        console.log('City: ' + city);
    }
}

function CheckoutBooks(customer: string, ...booksIds: number[]): string[] {
    console.log('Checking out books for ' + customer);
    let booksCheckedOut: string[] = [];
    for (let id of booksIds) {
        let book = GetBookById(id);
        if (book.available) {
            booksCheckedOut.push(book.title)
        }
    }
    return booksCheckedOut;
}

function GetTitles(author: string): string[];
function GetTitles(available: boolean): string[];
function GetTitles(bookProperty: any): string[] {
    const allBooks = GetAllBooks();
    const foundTitles: string[] = [];

    if (typeof bookProperty == 'string') {
        // get all books by a particular author
        for (let book of allBooks) {
            if (book.author == bookProperty) {
                foundTitles.push(book.title);
            }
        }

    } else if (typeof bookProperty == 'boolean') {
        // get all books baset on specified availability
        for (let book of allBooks) {
            if (book.available == bookProperty) {
                foundTitles.push(book.title);
            }
        }
    }
    return foundTitles;
}

function PrintBook(book: Book) {
    console.log(book.title + ' by ' + book.author);
}

//**************************

let mybook: Book = {
    id: 5,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    available: true,
    category: Category.Fiction,
    pages: 250,
    markDamaged: (reason: string) => console.log('Damaged:' + reason)
};

// PrintBook(mybook);

// mybook.markDamaged('missing cover')

let logDamage: DamagedLogger;
logDamage = (damage: string) => console.log('Damage report: '+ damage);
logDamage('teste Adriano');

// let checkedBooks = GetTitles(true);
// checkedBooks.forEach(title => console.log(title));

// let myBooks: string[] = CheckoutBooks('Adriano', 1, 3, 4);
// myBooks.forEach(title => console.log(title));

//LogFirstAvailable();

// let poetryBooks = GetBookTitlesByCategory();
// poetryBooks.forEach(title => console.log(title));

//CreateCustomer('Michele',6, 'Atlanta');

// let x: number;

// x = 5;

// let IdGenerator: (chars: string, nums: number) => string;

// IdGenerator = (name: string, id: number) => name + id;

// let myID: string = IdGenerator('Adriano ', 10);

// console.log(myID);

// const fictionBooks = GetBookTitlesByCategory(Category.Fiction);
// fictionBooks.forEach((val, idx, arr)=> console.log(++ idx + ' - ' + val))
