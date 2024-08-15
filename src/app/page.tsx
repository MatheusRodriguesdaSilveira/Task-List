"use client";

import * as C from "@/app/App.styles";
import { useState } from "react";
import { Item } from "@/types/item";
import { CheckCircle } from "lucide-react";
import { ListItem } from "@/components/ListItem/Index";
import { AddArea } from "@/components/AddArea/Index";

const Page = () => {
  const [list, setList] = useState<Item[]>([]);

  const handleRemoveTask = (id: number) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  const handleEditTask = (id: number, newName: string) => {
    const newList = list.map((item) => {
      if (item.id === id) {
        return { ...item, name: newName };
      }
      return item;
    });
    setList(newList);
  };

  const HandleAddTask = (taskName: string) => {
    let NewList = [...list];
    NewList.push({
      id: list.length + 1,
      name: taskName,
      done: false,
    });
    setList(NewList);
  };

  return (
    <C.Container>
      <C.Area>
        <C.Header className="text-4xl font-bold flex justify-center items-baseline gap-2">
          Task List <CheckCircle className="text-lime-500" />{" "}
        </C.Header>

        {/* add new task area */}
        <AddArea onEnter={HandleAddTask} />

        {/* task list area */}
        {list.map((item, index) => (
          <ListItem
            key={index}
            item={item}
            onRemove={handleRemoveTask}
            onEdit={handleEditTask}
          />
        ))}
      </C.Area>
    </C.Container>
  );
};

export default Page;
