// import { Button } from "@/components/ui/button";
// import Image from "next/image";

// export default function Home() {
//   return (
//     <div>
//       <h2> AI RECRUITER</h2>
//       <Button variant="outline">
//         Hello
//       </Button>
//     </div>
//   );
// }
"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "./provider";

export default function Home() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
  if (loading) return; // wait until session check is done

  if (user) {
    router.replace("/dashboard");
  }
  // ❌ don’t auto-send to /auth here
  // let users go to /auth manually if they’re not logged in
}, [user, loading, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      <span className="ml-3 text-slate-600 font-medium">
        Loading...
      </span>
    </div>
  );
}
