export interface Store {
  _id: string;
  merchantId: string;
  name: string;
  currency: string;
  status: string;
  openingTime: string | null;
  closeTime: string | null;
  location: string;
  category: string;
  subCategory: string;
}

export interface Product {
  storeId: string;
  name: string;
  description: string;
  currency: string;
  price: number;
  quantity: number;
  imgUrl: string;
  id: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface SingleStore {
  message: string;
  status: boolean;
  data: Store;
}

export interface IOngoingOrders {
  _id: {
    orderId: string;
    order: string;
    transactionRef: string;
    productId: string;
  };
  productName: string;
  quantity: number;
  price: number;
}

export interface ICart {
  cart: {
    products: Product[];
  };
}
