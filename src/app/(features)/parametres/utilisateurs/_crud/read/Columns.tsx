import { ColumnHeader } from "@/components/tableStack/ColumnHeader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
// import DetailBTN from "../../../../components/btnDetails/DetailBTN";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/schemas/user";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="bg-white border-white"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nomComplet",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Utilisateur" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => <ColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "role",
    header: ({ column }) => <ColumnHeader column={column} title="Role" />,
  },
  {
    accessorKey: "statut",
    header: ({ column }) => <ColumnHeader column={column} title="Statut" />,
    cell: ({ row }) => {
      let statut = row?.original?.statut;
      return (
        <>
          {statut ? (
            <Badge className="bg-green-600 hover:bg-green-500">ACTIF</Badge>
          ) : (
            <Badge variant={"destructive"}>INACTIF</Badge>
          )}
        </>
      );
    },
  },
  {
    id: "actions",
    header: ({ column }) => <ColumnHeader column={column} title="Actions" />,
    cell: ({ row }) => {
      const user = row?.original;
      // const navigate = useNavigate();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="shadow-2xl w-48">
            <DropdownMenuLabel className="text-gray-600">
              Actions
            </DropdownMenuLabel>
            {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>
              Copy payment ID
            </DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem
            // onSelect={() =>
            //   navigate(`/configurations/users/${user?.id}/details`)
            // }
            >
              Voir le détails
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem className="font-light text-gray-600">
              Modifier
            </DropdownMenuItem> */}
            {/* <UpdateModal currentData={user} /> */}
            {/* <DeleteModal id={user?.id} /> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
