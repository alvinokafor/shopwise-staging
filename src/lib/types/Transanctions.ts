export interface Wallet {
  data: {
    wallet: {
      balance: number;
      currency: string;
    };
  };
}

export interface Banks {
  data: {
    banks: {
      name: string;
      code: string;
    }[];
  };
}
