import { useMutation, useQuery } from "@tanstack/react-query";
import { type MutationCallBack, type QueryCallBack } from "./helpers";
import ApiService from "./ApiService";
import { type Banks } from "@/lib/types/Transanctions";
import axios from "axios";

// api service initiliazer
const transferService = new ApiService("/transfers/banks/NG");

interface IExchangeRate {
  base_code: string;
  target_code: string;
  conversion_rate: number;
}

// mutation utility
function useTransferMutation<T>(
  mutationCallback: MutationCallBack<T>,
  params: string
) {
  return useMutation({
    mutationFn: (payload: T) => mutationCallback(payload, params),
  });
}

// query utility
function useTransferQuery<B>(
  queryCallback: QueryCallBack<B>,
  queryKey: string[],
  slug: string,
  isEnabled: boolean
) {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => queryCallback(slug),
    enabled: isEnabled,
  });
}

const TransferAdapter = {
  getBanks: async function () {
    const res = transferService.getAll<Banks>("");
    return res;
  },
  resolveAccount: async function (params: string) {
    const res = transferService.getAll<{ data: { accountName: string } }>(
      `/${params}`
    );
    return res;
  },
  sendToBank: async function (payload: {
    bankCode: string;
    accountNumber: string;
    amount: string;
    narration: string;
  }) {
    const res = await transferService.mutate("", payload, "JSON", "POST");
    return res;
  },
  getConversionRate: async function (currency: string) {
    const res = await axios.get(
      `https://v6.exchangerate-api.com/v6/79dcd56d12d5bdd95dbab89f/pair/${currency}/NGN`
    );
    return res.data as IExchangeRate;
  },
};

export { TransferAdapter, useTransferMutation, useTransferQuery };
