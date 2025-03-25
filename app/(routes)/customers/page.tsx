"use client";

import React, { useEffect, useState } from "react";
import { getCustomers } from "@/actions/customer";
import { CustomerTable } from "./_components/CustomerTable";

interface Customer {
  $id: string;
  customerID: string;
  customerName: string;
  phone: number;
  birthdate: string;
}

const CustomerPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomers() {
      setIsLoading(true);
      try {
        const result = await getCustomers();
        if (result.success) {
          setCustomers(result.customers as unknown as Customer[]);
        } else {
          console.error(result.error);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
      setIsLoading(false);
    }
    fetchCustomers();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>yükleniyor</div>
      ) : (
        <CustomerTable customers={customers} isLoading={false} />
      )}
    </div>
  );
};

export default CustomerPage;
