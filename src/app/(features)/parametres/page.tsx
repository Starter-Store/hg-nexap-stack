"use client";

export default function DashboardPage() {
  return (
    <div className=" bg-red-200">
      <div>
        <h1>Dashboard</h1>
        <h1>
          Welcome : <span className="font-bold">user?.name</span>
        </h1>
        <h1>
          That's your email : <span className="font-bold">user?.email</span>
        </h1>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          laudantium ex quos soluta veritatis temporibus autem laboriosam quas
          itaque perspiciatis fugit voluptatum veniam incidunt, deleniti non
          error asperiores laborum facilis.
        </div>
      </div>
    </div>
  );
}
