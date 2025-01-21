import { useState, useEffect } from "react";
import * as C from "./styles";
import { Item } from "@/types/item";
import {
  BellRing,
  CheckCircle,
  Circle,
  Edit,
  GripVerticalIcon,
  X,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

type Props = {
  item: Item;
  onRemove: (id: number) => void;
  onEdit: (id: number, newName: string) => void;
  onToggle: (id: number) => void; // Adicionando a função de toggle como prop
  provided: any; // passando o 'provided' do Draggable como prop
};

export const ListItem = ({
  item,
  onRemove,
  onEdit,
  onToggle,
  provided,
}: Props) => {
  // States
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(item.name);

  // Request permission for notifications when the component is mounted
  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Functions
  const handleRemoveClick = () => {
    onRemove(item.id);
  };

  const handleCheckboxClick = () => {
    onToggle(item.id); // Chama a função de toggle

    if (!item.done) {
      toast({
        title: "Tarefa concluída!",
        description: (
          <span>
            Você concluiu uma tarefa:{" "}
            <span className="underline decoration-sky-500 font-extrabold">
              Muito Bem!
            </span>
          </span>
        ),
        className: "bg-gray-900/30 max-sm:bg-slate-950 text-white text-wrap",
        duration: 2500,
        action: (
          <ToastAction altText="Undo" className="hover:text-black">
            Fechar
          </ToastAction>
        ),
      });
    }
  };

  const handleEditClick = () => {
    if (!item.done) {
      setIsEditing(true);
    } else {
      toast({
        title: "Erro!",
        description: (
          <span>
            Você{" "}
            <span className="underline decoration-red-800 font-extrabold">
              não
            </span>{" "}
            pode editar uma tarefa concluída!{" "}
          </span>
        ),
        className: "bg-gray-900/30 max-sm:bg-slate-950 text-white ",
        duration: 4000,
        action: (
          <ToastAction altText="Undo" className="hover:text-black">
            Fechar
          </ToastAction>
        ),
      });
    }
  };

  const handleNameChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onEdit(item.id, newName);
  };

  // Function to schedule a notification
  const scheduleNotification = (taskName: string, delay: number) => {
    if (Notification.permission === "granted") {
      setTimeout(() => {
        new Notification("Lembrete de Tarefa", {
          body: `Não se esqueça de completar: ${taskName}`,
          icon: "/favicon.ico",
        });
      }, delay);
    } else {
      toast({
        title: "Permissão negada!",
        description: "Ative as notificações para usar os lembretes.",
        className: "bg-red-500 text-white",
        duration: 3000,
      });
    }
  };

  const handleSetReminder = () => {
    const oneHour = 3600000; // Tempo para o lembrete (1 hora em milissegundos)
    scheduleNotification(item.name, oneHour);

    toast({
      title: "Lembrete Definido!",
      description: `Você será lembrado da tarefa "${item.name}" em 1 hora.`,
      className: "bg-gray-900/30 max-sm:bg-slate-950 text-white ",
      duration: 3000,
    });
  };

  return (
    <C.Container
      done={item.done}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="rounded-xl flex items-center shadow-shape w-full">
        <div className="flex items-center gap-2 flex-1 h-8">
          <GripVerticalIcon />
          <input
            type="checkbox"
            checked={item.done}
            onChange={handleCheckboxClick} // Chama a função de toggle
          />
          <div onClick={handleCheckboxClick} style={{ cursor: "pointer" }}>
            {item.done ? (
              <CheckCircle className="text-lime-500" />
            ) : (
              <Circle className="text-gray-500" />
            )}
          </div>

          {isEditing ? (
            <input
              type="text"
              placeholder="Edit task"
              value={newName}
              onChange={handleNameChanged}
              onBlur={handleBlur}
              onKeyDown={(e) => {
                if (
                  (e.code === "Enter" || e.key === "Enter") &&
                  newName.trim() !== ""
                ) {
                  onEdit(item.id, newName);
                  setIsEditing(false);
                }
              }}
              autoFocus
              className="border border-zinc-300 px-2 py-1"
            />
          ) : (
            <div className="w-full">
              <label className="text-sm">{item.name}</label>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleSetReminder}
            className="px-1 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            <BellRing className="size-5" />
          </button>

          <button
            type="button"
            onClick={handleEditClick}
            style={{ cursor: "pointer" }}
          >
            <Edit className="size-5 text-zinc-400" />
          </button>
          <button
            type="button"
            onClick={handleRemoveClick}
            style={{ cursor: "pointer" }}
          >
            <X className="size-5 text-zinc-400" />
          </button>
        </div>
      </div>
    </C.Container>
  );
};
