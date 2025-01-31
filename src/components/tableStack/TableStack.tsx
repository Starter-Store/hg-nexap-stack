import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import React, { ReactNode, useState } from "react";
import { PaginationStack } from "./PaginationStack";

// interface TableStackProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[] | any;
//   children?: ReactNode;
//   title?: string;
//   nameFilter: string;
// }

// function TableStack<TData, TValue>({
//   columns,
//   data,
//   children,
//   title,
//   nameFilter,
// }: TableStackProps<TData, TValue>) {
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({});

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     onSortingChange: setSorting,
//     getSortedRowModel: getSortedRowModel(),
//     onColumnFiltersChange: setColumnFilters,
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,

//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//     },
//   });

//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-primary">{title}</h1>
//       <div className="flex justify-between items-center">
//         <div className="flex items-center justify-start gap-3">
//           <div className="flex items-center py-4">
//             <Input
//               placeholder="Filter name..."
//               value={
//                 (table.getColumn(nameFilter)?.getFilterValue() as string) ?? ""
//               }
//               onChange={(event) =>
//                 table.getColumn(nameFilter)?.setFilterValue(event.target.value)
//               }
//               className="max-w-sm"
//             />
//           </div>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               {/* <Button variant="outline">Columns</Button> */}
//               <Button variant="outline" className=" gap-1">
//                 <ListFilter className="h-3.5 w-3.5" />
//                 <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
//                   Filtre
//                 </span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               {table
//                 .getAllColumns()
//                 .filter((column) => column.getCanHide())
//                 .map((column) => {
//                   return (
//                     <DropdownMenuCheckboxItem
//                       key={column.id}
//                       className="capitalize"
//                       checked={column.getIsVisible()}
//                       onCheckedChange={(value) =>
//                         column.toggleVisibility(!!value)
//                       }
//                     >
//                       {column.id}
//                     </DropdownMenuCheckboxItem>
//                   );
//                 })}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//         <div>{children}</div>
//       </div>
//       {/*Tables */}
//       <div className="rounded-md border mb-3">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                   className="text-gray-500"
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   Aucun résultat.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       {/* Paginnation */}
//       {/* <div className="flex items-center justify-end space-x-2 py-4">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           Previous
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           Next
//         </Button>
//       </div> */}
//       <PaginationStack table={table} />
//     </div>
//   );
// }

interface TableStackProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | any;
  children?: ReactNode;
  title?: string;
  nameFilter: string;
  setPage?: any;
  setLimit?: any;
  isFetching?: any;
  // href?: (row: TData) => string; // Accept a function to generate the URL dynamically
}

function TableStack<TData, TValue>({
  columns,
  data,
  children,
  title,
  nameFilter,
  setPage,
  setLimit,
  isFetching,
}: // href,
TableStackProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: 20, //custom default page size
      },
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary">{title}</h1>
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-start gap-3">
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter name..."
              value={
                (table.getColumn(nameFilter)?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn(nameFilter)?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>
        </div>
        <div>{children}</div>
      </div>
      <div className="rounded-md border mb-3">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                // className="bg-primary hover:bg-primary hover:text-primary"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                // const rowUrl = href ? href(row.original) : "#"; // Generate the URL for the row
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="text-gray-500"
                  >
                    {/* <Link
                      to={rowUrl}
                      className="contents" // Ensure link doesn't break table layout
                    > */}
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                    {/* </Link> */}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Aucun résultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <PaginationStack
        table={table}
        setPage={setPage}
        setLimit={setLimit}
        pagination={data?.pagination}
        isFetching={isFetching}
      />
    </div>
  );
}

export default TableStack;
