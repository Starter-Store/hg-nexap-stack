"use client";

import { useCurrentUser } from "@/hooks/use-current-user";

export default function DashboardPage() {
  const user = useCurrentUser();

  return (
    <div>
      <div className="w-56 overflow-hidden">
        {user && (
          <>
            <div>
              <h1>Dashboard</h1>
              <h1>
                Welcome : <span className="font-bold">{user?.name}</span>
              </h1>
              <h1>
                That's your email :{" "}
                <span className="font-bold">{user?.email}</span>
              </h1>
              <div>
                <pre>{JSON.stringify(user)}</pre>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
