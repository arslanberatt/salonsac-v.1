"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, signOut } from "@/actions/auth";

interface UserProfile {
  avatar: string;
  id: string;
  name: string;
  email: string;
  labels: string[];
  isAdmin: boolean;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const userData = await getLoggedInUser();
      if (!userData) {
        router.push("/login");
        return;
      }
      setUser(userData);
      setLoading(false);
    }

    fetchUser();
  }, [router]);

  async function handleSignOut() {
    await signOut();
    router.push("/login");
  }

  if (loading) return <p>Yükleniyor...</p>;
  if (!user) return <p>Kullanıcı bulunamadı.</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-semibold mt-4">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        {user.isAdmin && (
          <span className="text-sm text-red-500 font-bold mt-2">Admin</span>
        )}
      </div>

      <div className="mt-6">
        <p>
          <strong>Etiketler:</strong>{" "}
          {user.labels.length > 0 ? user.labels.join(", ") : "Yok"}
        </p>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          Anasayfaya Dön
        </button>

        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}
