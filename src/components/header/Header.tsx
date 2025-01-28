import { ModeToggle } from "../modeToggle/ModeToggle";
import { NavUser } from "../sidebar/nav-user";
import { SidebarTrigger } from "../ui/sidebar";

export default function Header() {
  return (
    <div className=" z-50  left-0 top-0 right-0 h-16 px-6 py-4 bg-white border-b border-neutral-200 justify-between items-center gap-[20px] inline-flex dark:bg-gray-900 dark:border-neutral-900">
      <div className=" flex items-center">
        <SidebarTrigger />
      </div>
      <div className="justify-start items-center gap-2 flex">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </span>
          <input
            type="text"
            className="w-full py-1 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            placeholder="Recherche"
          />
        </div>

        <div className="justify-start items-center gap- flex border-l-2 border-yellow-400 pl-2">
          <NavUser />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
