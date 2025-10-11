import { useMutation } from "@tanstack/react-query";
import axiosSecure from "./useAxiosSecure";
import { toast } from "sonner";

type SignupData = {
  name: string;
  email: string;
  password: string;
};

const useSignup = () => {
  return useMutation({
    mutationFn: async (data: SignupData) => {
      const res = await axiosSecure.post("/auth/signup", data);
      return res.data;
    },
    onSuccess: () => {
      // console.log('Signup successful');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Email already registered");
    },
  });
};

export default useSignup;
