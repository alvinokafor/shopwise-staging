import { useMutation, useQuery } from "@tanstack/react-query";
import { type MutationCallBack, type QueryCallBack } from "./helpers";
import ApiService from "./ApiService";
import { type Wallet } from "@/lib/types/Transanctions";

// api service initiliazer
const walletService = new ApiService("/wallets");
const transferService = new ApiService("/transfers/wallet");

// mutation utility
function useWalletMutation<T>(
  mutationCallback: MutationCallBack<T>,
  params: string
) {
  return useMutation({
    mutationFn: (payload: T) => mutationCallback(payload, params),
  });
}

// query utility
function useWalletQuery<B>(
  queryCallback: QueryCallBack<B>,
  queryKey: string[],
  slug: string
) {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => queryCallback(slug),
  });
}

const WalletAdapter = {
  getWalletBalance: async function () {
    const res = walletService.getAll<Wallet>("");
    return res;
  },
  transferToWallet: async function (payload: {
    recipientId: string;
    amount: number;
  }) {
    const res = transferService.mutate("", payload, "JSON", "POST");
    return res;
  },
  fundWallet: async function (payload: {
    amount: string;
    redirectUrl: string;
  }) {
    const res = await walletService.mutate("fund", payload, "JSON", "POST");
    return res;
  },
  verifyWalletFunding: async function (payload: { reference: string | null }) {
    const res = await walletService.mutate(
      "fund/verify",
      payload,
      "JSON",
      "POST"
    );
    return res;
  },
};

export { WalletAdapter, useWalletMutation, useWalletQuery };
