import { AxiosError } from "axios";
import { api } from "../api";
import { HttpClient } from "../config/api";
import { useQuery } from "react-query";
// import { toastFail, toastSuccess } from "../service-toast";
// import { AxiosError } from "axios";
interface IDashboard {
  tier?: string;
  property: string;
}
const getTopReward = (duration: string) => () => {
  return HttpClient.get(`${api.dashboard.fetch}${duration}`);
};

const useGetTopReward = (duration: string) => {
  return useQuery(
    [`${api.dashboard.fetch}${duration}`],
    getTopReward(duration),
    {
      select: (data: { data: { data: any } }) => data?.data?.data || {},
      onError: (error: AxiosError) => {
        console.error(error);
      },
    }
  );
};
export const getTopRewardUsers = () => {
  return HttpClient.get(api.dashboard.fetchBlock);
};

const getTopTier =
  ({ tier, property }: IDashboard) =>
  () => {
    return HttpClient.get(
      `${api.dashboard.fetchreward.replace("{propertyID}", property)}${tier}`
    );
  };
const useGetTopTier = ({ tier, property }: IDashboard) => {
  return useQuery(
    [`${(api.dashboard.fetchreward, property)}${tier}`],
    getTopTier({ tier, property }),
    {
      enabled: !!tier && !!property,
      select: (data: { data: { data: any } }) => data?.data?.data || {},
      onError: (error: AxiosError) => {
        console.error(error);
      },
    }
  );
};
// totalReward
const getTotalReward = (duration: string) => () => {
  return HttpClient.get(`${api.dashboard.fetchTotal}${duration}`);
};

const useGetTotalReward = (duration: string) => {
  return useQuery(
    [`${api.dashboard.fetchTotal}${duration}`],
    getTotalReward(duration),
    {
      select: (data: { data: { data: any } }) => data?.data?.data || {},
      onError: (error: AxiosError) => {
        console.error(error);
      },
    }
  );
};
const getTotalTier =
  ({ tier, property }: IDashboard) =>
  () => {
    return HttpClient.get(
      `${api.dashboard.fetchTier.replace("{propertyID}", property)}${tier}`
    );
  };

const useGetTotalTier = ({ tier, property }: IDashboard) => {
  return useQuery(
    [`${(api.dashboard.fetchTier, property)}${tier}`],
    getTotalTier({ tier, property }),
    {
      enabled: !!tier && !!property,
      select: (data: { data: { data: any } }) => data?.data?.data || {},
      onError: (error: AxiosError) => {
        console.error(error);
      },
    }
  );
};
const fetchRecentActivity =
  ({ property }: IDashboard) =>
  () => {
    return HttpClient.get(
      `${api.dashboard.fetchRecentActivity.replace("{propertyID}", property)}`
    );
  };

export const useGetRecentActivity = ({ property }: IDashboard) => {
  return useQuery(
    [`${(api.dashboard.fetchRecentActivity, property)}`],
    fetchRecentActivity({ property }),
    {
      enabled: !!property,
      select: (data: { data: { data: any } }) => data?.data?.data || {},
      onError: (error: AxiosError) => {
        console.error(error);
      },
    }
  );
};
// export const CreateTierPoint = (data) => {
//   return HttpClient.post(`${api.dashboard.add}`, data);
// };

// export const userCreateTierpoint = () => {
//   const queryClient = useQueryClient();
//   return useMutation(CreateTierPoint, {
//     onSuccess: (response) => {
//       queryClient.invalidateQueries("tier_point");
//       toastSuccess(response?.data?.message);
//     },
//     onError: (error: AxiosError<{ message: string }>) => {
//       toastFail(error?.response?.data?.message) || "Something is Wrong";
//     },
//   });
// };

// export const updateTierPoint = (data, id) => {
//   return HttpClient.post(api.dashboard.update);
// };

export { useGetTopReward, useGetTotalReward, useGetTotalTier, useGetTopTier };
