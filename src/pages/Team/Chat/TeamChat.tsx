import { Button } from "@components/custom/Button";
import { FC, useEffect, useRef, useState } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import { Textarea } from "@nextui-org/react";
import { useSocket } from "@/context/useSocket";

interface MessageInterface {
  chat_text: string;
  sended_at: Date;
  chatter: {
    user_id: string;
    user_name: string;
    user_profile: string;
  };
}

export const TeamChat: FC = () => {
  const { team_id } = useParams();
  const messageInput = useRef<HTMLInputElement>(null);

  const user_id = useUserStore((state) => state.user?.user_id);
  const { socket } = useSocket();
  const [messages, setMessages] = useState<MessageInterface[]>([]);


  useEffect(() => {
    socket.on("team:message:receive", (message: MessageInterface) => {
      console.log(`team:message:receive`);
      setMessages((prev) => [...prev, message]);
    });

    socket.on("team:chats", (messages: MessageInterface[]) => {
      console.log(`Team chats`);
      setMessages(messages);
    });
  }, [socket]);

  useEffect(() => {
    socket.emit("team:chat:join", { team_id });
  }, []);


  const sendButtonClickHandler = () => {
    const message_text = messageInput.current!.value;
    if (!message_text) return;
    const newMessage: MessageInterface = {
      chat_text: message_text,
      sended_at: new Date(),
      chatter: {
        user_id: user_id!,
        user_name: "",
        user_profile: "",
      },
    };
    setMessages((prev) => [...prev, newMessage]);
    socket.emit("team:message:send", { team_id, message: message_text });
    messageInput.current!.value = "";
  };

  return (
    <div className="text-white px-16 py-6 flex flex-col justify-between min-h-screen">
      <div className="flex-1 flex flex-col gap-3 py-10 h-full">
        <div>
          <h2 className="font-medium text-2xl">Team Chat</h2>
        </div>
        {messages.map((message) => (
          <div
            className={`font-poppins bg-dark_hash px-4 py-2 w-[45%] rounded-xl ${
              message.chatter.user_id === user_id ? "self-end" : ""
            }`}
          >
            <div className="flex gap-3 items-center">
              <span className="font-medium text-medium ">
                {message.chatter.user_id === user_id
                  ? "You"
                  : message.chatter.user_name}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="pt-2 text-lg">{message.chat_text}</span>
              <span className="self-end text-gray-400">
                {moment(message.sended_at).format("hh.mm A")}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <Textarea
          classNames={{
            inputWrapper: [
              "bg-opacity-30",
              "bg-light_hash",
              "group-data-[focus=true]:bg-opacity-20",
              "group-data-[hover=true]:bg-opacity-30",
              "pe-14",
            ],
            label: ["font-[500]", "font-poppins"],
            input: ["text-white", "text-lg", "font-poppins"],
          }}
          ref={messageInput}
        />
        <div className="flex flex-col gap-2">
          <Button className="w-full" onClick={sendButtonClickHandler}>
            send
          </Button>
        </div>
      </div>
    </div>
  );
};
