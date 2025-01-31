"use client";

import { useCrud } from "@/hooks/use-hg-crud";
import React, { useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

const AddUserForm: React.FC = () => {
  const { useCreate } = useCrud<User>("/user");
  const { mutate, isPending } = useCreate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">{isPending ? "loading..." : "Add User"}</button>
    </form>
  );
};

export default AddUserForm;
