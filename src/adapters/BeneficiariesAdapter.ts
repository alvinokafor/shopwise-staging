import { useMutation, useQuery } from "@tanstack/react-query";
import { type MutationCallBack, type QueryCallBack } from "./helpers";
import ApiService from "./ApiService";
import { type CreateBeneficiarySchema } from "@/lib/validations/beneficiaryValidator";
import { type Beneficiaries } from "@/lib/types/Beneficiaries";

// api service initiliazer
const benficiariesService = new ApiService("/beneficiaries");

// mutation utility
function useBeneficiariesMutation<T>(
  mutationCallback: MutationCallBack<T>,
  params: string
) {
  return useMutation({
    mutationFn: (payload: T) => mutationCallback(payload, params),
  });
}

// query utility
function useBeneficiariesQuery<B>(
  queryCallback: QueryCallBack<B>,
  queryKey: string[],
  slug: string
) {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => queryCallback(slug),
  });
}

const BeneficiariesAdapter = {
  createBeneficiary: async function (
    payload: CreateBeneficiarySchema & { phoneNumber: string }
  ) {
    const res = benficiariesService.mutate("", payload, "JSON", "POST");
    return res;
  },
  getAllBeneficiaries: async function () {
    const res = benficiariesService.getAll<Beneficiaries>("");
    return res;
  },
};

export {
  BeneficiariesAdapter,
  useBeneficiariesMutation,
  useBeneficiariesQuery,
};
