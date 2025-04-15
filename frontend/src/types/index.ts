// import { MenuItem } from '../data/menuData'; // 이 줄을 주석 처리하거나 삭제합니다.
export { MenuItem } from '../data/menuData';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedOptions: {
    name: string;
    price: number;
  }[];
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  orderDate: Date;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
}

export interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onCheckout: () => void;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  businessHours: {
    open: string;
    close: string;
  };
  status: 'open' | 'closed';
  tables: number;
  employees: number;
  createdAt: string;
  updatedAt: string;
}

export interface Employee {
  id: string;
  storeId: string;
  name: string;
  email: string;
  role: 'OWNER' | 'MANAGER' | 'STAFF';
  phoneNumber?: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface StoreSection {
  id: string;
  storeId: string;
  name: string;
  capacity: number;
  tables: Table[];
}

export interface Table {
  id: string;
  sectionId: string;
  number: number;
  capacity: number;
  status: 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'CLEANING';
  position: {
    x: number;
    y: number;
  };
} 