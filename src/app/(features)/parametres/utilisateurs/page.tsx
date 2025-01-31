"use client";

import { useCrud } from "@/hooks/use-hg-crud";
import { User } from "@/schemas/user";
import AddUserForm from "./_crud/create/AddUserForm";
import DeleteUserButton from "./_crud/delete/DeleteUserButton";
import DataTable from "./_crud/read/DataTable";

export default function DashboardPage() {
  const { useFetchAll: useFetchUsers } = useCrud<User>("/user");
  const { data, isFetching, isLoading, isError } = useFetchUsers(["users"]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>

      <div>
        <DataTable />
        <AddUserForm />
        {/* <UpdateUserForm user={data && data?.data[0]} /> */}
        <DeleteUserButton userId={`33533g3g4t`} />
      </div>
    </div>
  );
}
