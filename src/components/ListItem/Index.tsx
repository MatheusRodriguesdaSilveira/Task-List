import { useState, KeyboardEvent } from "react";
import * as C from "./styles";
import { Item } from "@/types/item";
import { CheckCircle, Circle, Edit, GripVerticalIcon, X } from "lucide-react";
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

  // Functions
  const handleRemoveClick = () => {
    onRemove(item.id);
  };

  const handleCheckboxClick = () => {
    onToggle(item.id); // Chama a função de toggle

    if (!item.done) {
      toast({
        title: "Task Complete!",
        description: (
          <span>
            You have successfully completed the task:.{" "}
            <span className="underline decoration-sky-500 font-extrabold">
              Great job!
            </span>
          </span>
        ),
        className: "bg-gray-900/30 max-sm:bg-slate-950 text-white text-wrap",
        duration: 2500,
        action: (
          <ToastAction altText="Undo" className="hover:text-black">
            Undo
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
        title: "Cannot Edit",
        description: (
          <span>
            You{" "}
            <span className="underline decoration-red-800 font-extrabold">
              cannot
            </span>{" "}
            edit a completed task.
          </span>
        ),
        className: "bg-gray-900/30 max-sm:bg-slate-950 text-white ",
        duration: 4000,
        action: (
          <ToastAction altText="Undo" className="hover:text-black">
            Undo
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
              onKeyUp={(e) => {
                if (e.code === "Enter" && newName.trim() !== "") {
                  onEdit(item.id, newName);
                  setIsEditing(false);
                }
              }}
              autoFocus
              className="border border-zinc-300 px-2 py-1"
            />
          ) : (
            <div>
              <label>{item.name} </label>
            </div>
          )}
        </div>

        <div className="mr-5">
          <button
            type="button"
            onClick={handleEditClick}
            style={{ cursor: "pointer" }}
            className="ml-auto px-1.5"
          >
            <Edit className="size-6 text-zinc-400" />
          </button>
          <button
            type="button"
            onClick={handleRemoveClick}
            style={{ cursor: "pointer" }}
            className="ml-auto px-1.5"
          >
            <X className="size-6 text-zinc-400" />
          </button>
        </div>
      </div>
    </C.Container>
  );
};
