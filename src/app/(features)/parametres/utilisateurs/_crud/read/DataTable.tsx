import TableStack from "@/components/tableStack/TableStack";

import { useCrud } from "@/hooks/use-hg-crud";
import LoadingProvider from "@/providers/LoadingProvider";
import { columns } from "./Columns";

type User = { id: number; name: string; email: string };
function DataTable() {
  const { useFetchAll: useFetchUsers } = useCrud<User>("/user");
  const { data, isFetching, isLoading, isError } = useFetchUsers(["users"]);

  return (
    <LoadingProvider isLoading={isLoading || isFetching} isError={isError}>
      <TableStack
        columns={columns}
        data={data && data?.data}
        nameFilter="nomComplet"
        children={
          <div className="flex items-center gap-2">
            {/* <Button variant="ghost">Imprimer</Button> */}
            {/* <CreateModal /> */}
            {/* <ActionSelected data={users && users?.data} /> */}
          </div>
        }
        title={"Liste des utlisateurs"}
      />
    </LoadingProvider>
  );
}

export default DataTable;
