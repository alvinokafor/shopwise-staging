import { useMutation, useQuery } from "@tanstack/react-query";
import { type MutationCallBack, type QueryCallBack } from "./helpers";
import ApiService from "./ApiService";

// api service initiliazer
const usersService = new ApiService("/users");

// mutation utility
function useUserMutation<T>(
  mutationCallback: MutationCallBack<T>,
  params: string
) {
  return useMutation({
    mutationFn: (payload: T) => mutationCallback(payload, params),
  });
}

// query utility
function useUserQuery<B>(
  queryCallback: QueryCallBack<B>,
  queryKey: string[],
  slug: string
) {
  return useQuery({
    queryKey: queryKey,
    queryFn: () => queryCallback(slug),
  });
}

const UserAdapter = {
  getUser: async function (payload: { email: string }) {
    const res = usersService.mutate("", payload, "JSON", "POST");
    return res;
  },
};

export { UserAdapter, useUserMutation, useUserQuery };
