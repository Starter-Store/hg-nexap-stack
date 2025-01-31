import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

function ActionSelected({ data }: { data: any }) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Menu className="h-10 w-10 cursor-pointer" color="#2e4d70" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="shadow-2xl w-40">
          {/* <Container data={data} /> */}
          {/* <ExcelExport data={data} /> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ActionSelected;
