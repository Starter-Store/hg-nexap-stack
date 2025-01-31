"use client";

import { useCrud } from "@/hooks/use-hg-crud";
import React from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

const DeleteUserButton: React.FC<{ userId: number | string }> = ({
  userId,
}) => {
  const { useDelete } = useCrud<User>("/user");
  const { mutate, isPending } = useDelete();

  const handleDelete = () => {
    mutate(userId);
  };

  return (
    <button onClick={handleDelete}>
      {isPending ? "loading..." : "Delete User"}
    </button>
  );
};

export default DeleteUserButton;
