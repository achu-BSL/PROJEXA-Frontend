import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useFetch } from "./useFetch";

interface GETMyProfileResponse {
  user_email: string;
  user_full_name: string;
  user_name: string;
  user_profile: string;
  summary?: string;
  birthday?: string;
}

const useUser = () => {
  const queryClient = useQueryClient();
  const  { getRequest, patchRequest }  = useFetch();

  const getUser = useQuery({
    queryKey: ["user", "profile"],
    queryFn: async () => {
      const res = await getRequest("user/myprofile");
      return (await res.json()) as GETMyProfileResponse;
    },
  });

  const editUserMutation = useMutation({
    mutationFn: async (updatedData: Partial<GETMyProfileResponse>) => {
      const res = await patchRequest("user", updatedData);
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user", "profile"], data);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const updateUserProfileMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}user`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });
      return await res.json();
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.setQueryData(["user", "profile"], data);
    },
  });

  return {
    getUser,

    editUserMutation,
    updateUserProfileMutation,
  };
};

export default useUser;
