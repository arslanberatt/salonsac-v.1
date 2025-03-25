interface UserDetails {
  $collectionID: string;
  $createdAt: string;
  $databaseID: string;
  $id: string;
  $permissions: string[];
  $updateAt: string;
  email: string;
  userID: string;
  username: string;
  isAdmin: boolean;
  isMVP?: boolean;
  name: string;
  id: string | undefined;
  userId: string | undefined;
}

type User = {
  salary: string;
  bonus: string;
  $id: string;
  name?: string;
  email?: string;
  registration: string;
  labels?: string[];
};

interface Customer {
  customerID: string;
  customerName: string;
  phone: number;
}
