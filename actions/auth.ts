"use server";

import { ID } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminClient, createSessionClient } from "@/lib/appwrite";

export const getLoggedInUser = async () => {
  const sessionClient = await createSessionClient();
  if (!sessionClient) return null;

  try {
    const { account } = sessionClient;
    const result = await account.get();
    if (!result) {
      return null;
    }

    const userLabels = result.labels || [];
    const isAdmin = userLabels.includes("admin");

    return JSON.parse(
      JSON.stringify({
        id: result.$id,
        name: result.name,
        email: result.email,
        labels: userLabels,
        isAdmin,
      })
    );
  } catch (error) {
    console.error("getLoggedInUser Hatası:", error);
    return null;
  }
};

export async function signOut(): Promise<void> {
  const sessionClient = await createSessionClient();
  if (!sessionClient) redirect("/login");
  const { account } = sessionClient;

  (await cookies()).delete("appwrite-session");
  await account.deleteSession("current");
  redirect("/login");
}

export const getUserDetails = async (userID: string) => {
  try {
    if (!userID) {
      return {
        id: "unknown",
        name: "Bilinmeyen Kullanıcı",
        email: "",
        labels: [],
        registrationDate: "",
        status: "",
      };
    }

    const { user } = await createAdminClient();
    const userDetails = await user.get(userID);

    return {
      id: userDetails.$id,
      name: userDetails.name,
      email: userDetails.email,
      labels: userDetails.labels || [],
      registrationDate: userDetails.registration,
      status: userDetails.status,
    };
  } catch (error: any) {
    if (error.code === 404) {
      return {
        id: userID,
        name: "Bilinmeyen Kullanıcı",
        email: "",
        labels: [],
        registrationDate: "",
        status: "",
      };
    }
    console.error("❌ Kullanıcı detayları alınırken hata oluştu:", error);
    return null;
  }
};

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "E-posta ve şifre gereklidir." };
  }

  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return { success: true };
  } catch (error: any) {
    let errorMessage = "Bilinmeyen bir hata oluştu.";
    if (error.message.includes("invalid_credentials")) {
      errorMessage = "E-posta veya şifre hatalı.";
    }

    return {
      error: `Giriş Yapılamadı: ${errorMessage}`,
    };
  }
}

export async function signUp(formData: FormData) {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // Admin yetkisini kontrol et
    const adminUser = await getLoggedInUser();
    if (!adminUser || !adminUser.isAdmin) {
      throw new Error("Yetkisiz işlem: Sadece adminler kullanıcı ekleyebilir.");
    }

    // Appwrite ile kullanıcı oluştur
    const { account, database } = await createAdminClient();
    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newUserAccount) {
      throw new Error("Kullanıcı hesabı oluşturulamadı.");
    }

    // Appwrite Avatar URL oluştur
    const encodedName = encodeURIComponent(username);
    const avatarURL = `${process.env.APPWRITE_ENDPOINT}/avatars/initials?name=${encodedName}&project=${process.env.APPWRITE_PROJECT}`;

    // Kullanıcıyı veritabanına kaydet
    const createdUserDoc = await database.createDocument(
      process.env.DATABASE_ID!,
      process.env.USER_COLLECTION_ID!,
      ID.unique(),
      {
        accountId: newUserAccount.$id,
        email,
        username,
        avatar: avatarURL, // Appwrite avatar URL'si
        salary: 0,
        prim: 0,
      }
    );

    return { success: true, userId: newUserAccount.$id };
  } catch (error: any) {
    console.error("Kullanıcı oluşturulamadı:", error);
    return { success: false, error: error.message || JSON.stringify(error) };
  }
}
