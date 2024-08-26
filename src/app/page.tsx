"use client";

import * as C from "@/app/App.styles";
import { useState, useEffect } from "react";
import { Item } from "@/types/item";
import { CheckCircle } from "lucide-react";
import { ListItem } from "@/components/ListItem/Index";
import { AddArea } from "@/components/AddArea/Index";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Page = () => {
  const [list, setList] = useState<Item[]>([]);

  // Função para salvar tarefas no localStorage
  const saveTasksToLocalStorage = (tasks: Item[]) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Função para carregar tarefas do localStorage
  const loadTasksFromLocalStorage = () => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [];
  };

  // Carregar tarefas do localStorage quando o componente for montado
  useEffect(() => {
    const savedTasks = loadTasksFromLocalStorage();
    setList(savedTasks);
  }, []);

  const handleRemoveTask = (id: number) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    saveTasksToLocalStorage(newList); // Salvar após remover
  };

  const handleEditTask = (id: number, newName: string) => {
    const newList = list.map((item) => {
      if (item.id === id) {
        return { ...item, name: newName };
      }
      return item;
    });
    setList(newList);
    saveTasksToLocalStorage(newList); // Salvar após editar
  };

  const handleAddTask = (taskName: string) => {
    let NewList = [...list];
    NewList.push({
      id: list.length + 1,
      name: taskName,
      done: false,
    });
    setList(NewList);
    saveTasksToLocalStorage(NewList); // Salvar após adicionar
  };

  const handleToggleTask = (id: number) => {
    const newList = list.map((item) => {
      if (item.id === id) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    setList(newList);
    saveTasksToLocalStorage(newList); // Salvar após marcar/desmarcar como concluída
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedItems = reorder(
      list,
      result.source.index,
      result.destination.index
    );
    setList(reorderedItems);
    saveTasksToLocalStorage(reorderedItems); // Salvar após rearranjar
  };

  const reorder = (list: Item[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  return (
    <C.Container>
      <C.Area>
        <C.Header className="text-4xl font-bold flex justify-center items-baseline gap-2">
          Task List <CheckCircle className="text-lime-500" />
        </C.Header>

        <AddArea onEnter={handleAddTask} />

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {list.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={String(item.id)}
                    index={index}
                  >
                    {(provided) => (
                      <ListItem
                        item={item}
                        onRemove={handleRemoveTask}
                        onEdit={handleEditTask}
                        onToggle={handleToggleTask} // Chamar ao marcar como concluída
                        provided={provided}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </C.Area>
    </C.Container>
  );
};

export default Page;
