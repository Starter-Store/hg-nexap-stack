"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import "../../globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  const onActiveSide = (baseUrl: [] | any) => {
    return baseUrl?.includes(pathname)
      ? `group relative flex items-center bg-primary px-5 w-full text-white gap-2 text-sm font-semibold rounded-sm px-1 py-2 duration-300 ease-in-out dark:hover:bg-meta-4 activeSide`
      : `group relative flex items-center px-5 w-full gap-2 text-sm font-semibold rounded-sm px-1 py-2 duration-300 ease-in-out dark:hover:bg-meta-4`;
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2 my-4  sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Button size={"icon"} onClick={() => router.back()}>
            <ChevronLeft />
          </Button>
          <p className="text-gray-500 font-bold text-lg">PARAMETRES</p>
        </div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Paramètres</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col sm:flex-row  h-full flex-1 gap-5">
        <div className="flex flex-col sm:flex-row  h-full flex-1 gap-5">
          <nav className="flex flex-col items-start w-60 border border-gray-300 rounded-lg p-3 h-full">
            <Link
              className={onActiveSide(["/parametres/utilisateurs"])}
              href="/parametres/utilisateurs"
            >
              Utilisateurs
            </Link>
            <Link
              className={onActiveSide(["/parametres/magasins"])}
              href="/parametres/magasins"
            >
              Magasins
            </Link>
            <Link
              className={onActiveSide(["/parametres/devise"])}
              href="/parametres/devise"
            >
              Devise
            </Link>
            <Link
              className={onActiveSide(["/parametres/taux"])}
              href="/parametres/taux"
            >
              Taux
            </Link>
            <Link
              className={onActiveSide(["/parametres/taxe"])}
              href="/parametres/taxe"
            >
              Taxe
            </Link>
          </nav>
          <div className="w-full">
            <Card>
              <CardHeader>
                {/* <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription> */}
              </CardHeader>
              <CardContent>
                {/* <p>Card Content</p> */}
                {children}
              </CardContent>
              <CardFooter>
                {/* 
    <p>Card Footer</p>
    */}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
