import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function SyncUser() {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const sync = async () => {
      const email = user.emailAddresses?.[0]?.emailAddress;
      if (!email) return;

      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user.id,
          email,
          name: user.fullName,
        }),
      });

      const data = await res.json();
      console.log("SYNC RESPONSE:", data);
    };
    sync();
  }, [isLoaded, user]);

  return;
}
