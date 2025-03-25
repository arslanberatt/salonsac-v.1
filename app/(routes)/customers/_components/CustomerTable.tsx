"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CreateCustomer from "./CreateCustomer";

interface Customer {
  $id: string;
  customerID: string;
  customerName: string;
  phone: number;
}

export function CustomerTable({
  customers,
  isLoading,
}: {
  customers: Customer[];
  isLoading: boolean;
}) {
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.customerName.toLowerCase().includes(filter.toLowerCase()) ||
      customer.phone.toString().toLowerCase().includes(filter.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-w-3xl mx-auto p-4 mt-5">
      <div className="flex items-center py-4 gap-3 justify-between">
        <Input
          placeholder="Müşteri adı veya telefon numarası filtrele..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
        <CreateCustomer />
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Müşteri Adı</th>
              <th className="p-3 text-left">Telefon</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="p-3">
                  <th>loading</th>
                </td>
              </tr>
            ) : currentCustomers.length > 0 ? (
              currentCustomers.map((customer) => (
                <tr key={customer.$id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{customer.customerName}</td>
                  <td className="p-3">{customer.phone}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-2">
                  Henüz Hiç Müşteri Yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 space-x-4">
        <Button
          variant="outline"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Önceki
        </Button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Sonraki
        </Button>
      </div>
    </div>
  );
}
