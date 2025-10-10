import { useQuery } from "@tanstack/react-query";
import axiosSecure from "./useAxiosSecure";

export const useUserJobs = (email?: string) => {
  return useQuery({
    queryKey: ["userJobs", email],
    queryFn: async () => {
      if (!email) return [];
      const { data } = await axiosSecure.get(`/jobs?email=${email}`);
      return data?.data?.jobs || [];
    },
    enabled: !!email, 
    staleTime: 1000 * 60,
  });
};
