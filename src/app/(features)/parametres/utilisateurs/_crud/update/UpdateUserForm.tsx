"use client";

import { useCrud } from "@/hooks/use-hg-crud";
import { User } from "@/schemas/user";
import React, { useState } from "react";

const UpdateUserForm: React.FC<{ user: User }> = ({ user }) => {
  const { useUpdate } = useCrud<User>("/users");
  const { mutate } = useUpdate();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ id: user.id, updatedData: { name, email } });
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
      <button type="submit">Update User</button>
    </form>
  );
};

export default UpdateUserForm;
