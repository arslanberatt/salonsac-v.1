"use server";

import { createAdminClient } from "@/lib/appwrite";
import { ID, Query } from "node-appwrite";

export async function createCustomer(formData: FormData) {
  const customerName = formData.get("customerName") as string;
  const phone = formData.get("phone") as string; // Number yerine string al

  if (!customerName || !phone) {
    return { error: "Tüm alanları doldurmalısınız!" };
  }

  try {
    const { database } = await createAdminClient();
    const customerID = ID.unique();

    const newCustomer = await database.createDocument(
      process.env.DATABASE_ID!,
      process.env.CUSTOMER_COLLECTION_ID!,
      customerID,
      {
        customerID,
        customerName,
        phone,
      }
    );

    return { success: true, customer: newCustomer };
  } catch (error: any) {
    console.error("Müşteri oluşturulamadı:", error.message);
    return { error: error.message };
  }
}

export async function getCustomers() {
  try {
    const { database } = await createAdminClient();
    const response = await database.listDocuments(
      process.env.DATABASE_ID!,
      process.env.CUSTOMER_COLLECTION_ID!
    );

    return { success: true, customers: response.documents };
  } catch (error: any) {
    console.error("Servis görüntülenemedi:", error.message);
    return {
      error: `Servis görüntülenemedi: ${error.message}`,
    };
  }
}

export async function getCustomerByPhone(phone: number) {
  try {
    const { database } = await createAdminClient();

    const response = await database.listDocuments(
      process.env.DATABASE_ID!,
      process.env.CUSTOMER_COLLECTION_ID!,
      [Query.equal("phone", [phone])]
    );
    return response.documents[0];
  } catch (error: any) {
    console.error("Servis görüntülenemedi:", error.message);
    return {
      error: `Servis görüntülenemedi: ${error.message}`,
    };
  }
}

export async function deleteCustomer(customerID: string) {
  try {
    const { database } = await createAdminClient();

    await database.deleteDocument(
      process.env.DATABASE_ID!,
      process.env.CUSTOMER_COLLECTION_ID!,
      customerID
    );

    return { success: true };
  } catch (error: any) {
    console.error("Müşteri silinemedi:", error.message);
    return {
      error: `Müşteri silinemedi: ${error.message}`,
    };
  }
}
