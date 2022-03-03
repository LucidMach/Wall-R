import { gql, useMutation } from "@apollo/client";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import UserContext from "./UserContext";

interface Props {
  setShowForm: Dispatch<SetStateAction<boolean>>;
}

const AddBotForm: React.FC<Props> = ({ setShowForm }) => {
  const [botId, setBotId] = useState<string>("bot#_");
  const { prismaUser: user, setPrismaUser: setUser } = useContext(UserContext);

  const MUTATE_USER_BOTS = gql`
    mutation LinkBotWithUser($botId: Int, $userId: Int) {
      linkBotWithUser(bot_id: $botId, user_id: $userId) {
        msg
      }
    }
  `;

  const [mutateUserBots] = useMutation(MUTATE_USER_BOTS);

  return (
    <form
      onClick={(e) => e.stopPropagation()}
      onSubmit={async (e) => {
        e.preventDefault();
        setShowForm(false);
        const data = await mutateUserBots({
          variables: {
            botId: parseInt(botId),
            userId: user.id,
          },
        });
        console.log(data.data.linkBotWithUser);
        location.reload();
      }}
      className="flex flex-col gap-2 w-2/3 shadow-md px-2 py-3 absolute top-1/2 transform -translate-y-1/2 bg-slate-300"
    >
      <h1 className="text-slate-500">enter bot id</h1>
      <input
        value={botId}
        onChange={(e) => {
          setBotId(e.currentTarget.value);
        }}
        type="number"
        className="rounded-sm bg-slate-200 px-2"
        placeholder="bot#_"
      />
    </form>
  );
};

export default AddBotForm;
