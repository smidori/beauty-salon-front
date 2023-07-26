import { Book } from "src/app/book/model/book.interface";
import { Treatment } from "src/app/treatment/models/treatment.interface";
import { User } from "src/app/user/models/user.interface"

export interface Invoice{
  id: number;
  client: User;
  observation : string;
  total: number;
  date: Date;
  items: InvoiceItem[];
}

export interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    itemType: string;
  }

export interface Product extends Item{
    stock: number;
}

export interface InvoiceItem {
    id: number;
    description: string;
    observation: string;
    worker: User;
    amount: number;
    subtotal: number;
    extra: number;
    discount: number;
    total: number;
    book: Book;
    item: Product | Treatment;
    invoice: Invoice;
  }
  