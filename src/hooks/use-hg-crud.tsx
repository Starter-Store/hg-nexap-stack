import { axios } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

type ApiResponse<T> = {
  data: T;
  message: string;
};

export const useCrud = <T extends unknown>(endpoint: string) => {
  const queryClient = useQueryClient();

  const useFetchAll = (queryKey: string[]) => {
    return useQuery<ApiResponse<T[]>, AxiosError<ApiResponse<null>>>({
      queryKey, // ✅ Correctly passing queryKey inside an object
      queryFn: async () => {
        const { data } = await axios.get<ApiResponse<T[]>>(endpoint);
        return data;
      },
    });
  };

  const useCreate = () => {
    return useMutation<
      ApiResponse<T>,
      AxiosError<ApiResponse<null>>,
      Partial<T>
    >({
      mutationFn: async (newData: Partial<T>) => {
        // Explicitly define the mutation function
        const { data } = await axios.post<ApiResponse<T>>(endpoint, newData);
        return data;
      },
      onSuccess: (response) => {
        toast.success(response.message || "Créé avec succès !");
        queryClient.invalidateQueries({ queryKey: [endpoint] });
      },
      onError: (error) => {
        const axiosError = error as AxiosError<ApiResponse<null>>;
        console.log(axiosError);
        toast.error(
          axiosError.response?.data?.message || "Échec de la création."
        );
      },
    });
  };

  const useUpdate = () => {
    return useMutation<
      ApiResponse<T>,
      AxiosError<ApiResponse<null>>,
      { id: string | number; updatedData: Partial<T> }
    >({
      mutationFn: async ({ id, updatedData }) => {
        const { data } = await axios.put<ApiResponse<T>>(
          `${endpoint}/${id}`,
          updatedData
        );
        return data;
      },
      onSuccess: (response) => {
        toast.success(response.message || "Mis à jour avec succès !");
        queryClient.invalidateQueries({ queryKey: [endpoint] });
      },
      onError: (error) => {
        const axiosError = error as AxiosError<ApiResponse<null>>;
        toast.error(
          axiosError.response?.data?.message || "Échec de la mise à jour."
        );
      },
    });
  };

  const useDelete = () => {
    return useMutation<
      ApiResponse<T>,
      AxiosError<ApiResponse<null>>,
      string | number
    >({
      mutationFn: async (id) => {
        const { data } = await axios.delete<ApiResponse<T>>(
          `${endpoint}/${id}`
        );
        return data;
      },
      onSuccess: (response) => {
        toast.success(response.message || "Supprimé avec succès !");
        queryClient.invalidateQueries({ queryKey: [endpoint] });
      },
      onError: (error) => {
        const axiosError = error as AxiosError<ApiResponse<null>>;
        toast.error(
          axiosError.response?.data?.message || "Échec de la suppression."
        );
      },
    });
  };

  return {
    useFetchAll,
    useCreate,
    useUpdate,
    useDelete,
  };
};
