import { useMutation, useQuery } from "@tanstack/react-query";
import { type MutationCallBack, type QueryCallBack } from "./helpers";
import {
  Store,
  Product,
  SingleStore,
  IOngoingOrders,
  ICart,
} from "@/lib/types/Stores";
import ApiService from "./ApiService";

interface Stores {
  data: {
    page: number;
    pageSize: number;
    totalCount: number;
    data: Store[];
  };
}
interface Products {
  data: {
    page: number;
    pageSize: number;
    totalCount: number;
    data: Product[];
  };
}

// api service initiliazer
const allstoresService = new ApiService("/users/stores?page=1&pageSize=10");
const storesService = new ApiService("/users/stores");
const productsService = new ApiService("/users/products?page=1&pageSize=10");
const checkoutService = new ApiService("/users/checkout");
const orderService = new ApiService(
  "/users/orders?page=1&pageSize=20&status=paid"
);
const cartService = new ApiService("/cart");
const healthStoresService = new ApiService(
  "/users/stores?page=1&pageSize=10&category=Health"
);

// mutation utility
function useStoreMutation<T>(
  mutationCallback: MutationCallBack<T>,
  params: string
) {
  return useMutation({
    mutationFn: (payload: T) => mutationCallback(payload, params),
  });
}

// query utility
function useStoreQuery<B>(
  queryCallback: QueryCallBack<B>,
  queryKey: string[],
  slug: string
) {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => queryCallback(slug),
  });
}

const StoreAdapter = {
  getAllStores: async function (params: string) {
    const res = allstoresService.getAll<Stores>(params);
    return res;
  },
  getStores: async function (params: string) {
    const res = healthStoresService.getAll<Stores>(params);
    return res;
  },
  getProductsFromStore: async function (params: string) {
    const res = productsService.getAll<Products>(`&storeId=${params}`);
    return res;
  },
  getStore: async function (params: string) {
    const res = storesService.getByID<SingleStore>(`${params}`);
    return res;
  },
  checkOutWithWallet: async function (payload: {
    orders: {
      storeId: string;
      productId: string;
      price: number;
      currency: string;
    }[];
  }) {
    const res = await checkoutService.mutate(
      "wallet",
      { country: "NG", address: "Test", orders: [...payload.orders] },
      "JSON",
      "POST"
    );
    return res;
  },
  checkOutWithCard: async function (payload: {
    orders:
      | {
          storeId: string;
          productId: string;
          price: number;
          currency: string;
        }[]
      | undefined;
  }) {
    const res = await checkoutService.mutate(
      "card",
      {
        redirectUrl: "/order-confirmation",
        country: "NG",
        address: "Test",
        orders: [...payload.orders!],
      },
      "JSON",
      "POST"
    );
    return res;
  },
  verifycheckOutWithCard: async function (payload: {
    reference: string | null;
  }) {
    const res = await checkoutService.mutate("verify", payload, "JSON", "POST");
    return res;
  },
  getOngoingOrders: async function () {
    const res = await orderService.getAll<IOngoingOrders[]>("");
    //@ts-expect-error no types
    return res.data;
  },
  getCart: async function () {
    const res = await cartService.getAll<ICart>("");
    //@ts-expect-error no types
    return res.data;
  },
  addToCart: async function (payload: { productId: string }) {
    const res = await cartService.mutate("", payload, "JSON", "POST");
    return res;
  },
  removeFromCart: async function (payload: { productId: string }) {
    const res = await cartService.mutate("", payload, "JSON", "DELETE");
    return res;
  },
  clearCart: async function (payload: {}) {
    const res = await cartService.mutate("all", payload, "JSON", "DELETE");
    return res;
  },
};

export { StoreAdapter, useStoreMutation, useStoreQuery };
