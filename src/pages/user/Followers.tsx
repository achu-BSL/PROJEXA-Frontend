import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { UserCard } from "./Connections";
import { useFetch } from "@hooks/useFetch";

export const Followers: FC = () => {
  const { user_name } = useParams();
  const {getRequest} = useFetch();
  const { data } = useQuery({
    queryKey: ["user", "profile", `${user_name}`, 'followers'],
    queryFn: async () => {
      const response = await getRequest(`user/${user_name}/followers`);
      return (await response.json()) as { user_name: string; user_profile: string }[];
    },
  });

  return (
    <div className="px-8 py-6 font-poppins">
      <div className="mb-10">
        <h2 className="font-semibold text-xl">Followers</h2>
      </div>
      <div className="flex gap-3 flex-wrap">
        {data &&
          data.map((user) => (
            <UserCard
              user_name={user.user_name}
              user_profile={user.user_profile}
            />
          ))}
      </div>
    </div>
  );
};
