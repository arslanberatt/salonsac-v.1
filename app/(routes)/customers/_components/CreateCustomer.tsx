"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { createCustomer } from "@/actions/customer";

const CreateCustomer = () => {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("customerName", customerName);
    formData.append("phone", phone);

    const response = await createCustomer(formData);
    setLoading(false);

    if (response.success) {
      alert("Müşteri başarıyla eklendi!");
      window.location.reload();
    } else {
      alert("Hata: " + response.error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Müşteri Ekle</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <AlertDialogHeader>
            <AlertDialogTitle>Yeni Müşteri Kaydı</AlertDialogTitle>
            <AlertDialogDescription>
              <Label htmlFor="name">Müşteri Adı</Label>
              <Input
                className="mb-3"
                id="name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
              <Label htmlFor="phone">Telefon</Label>
              <Input
                className="mb-3"
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button type="submit" className="ml-auto" disabled={loading}>
                {loading ? "Kaydediliyor..." : "Kaydet"}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateCustomer;
