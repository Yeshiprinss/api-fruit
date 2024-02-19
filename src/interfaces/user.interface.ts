import { Auth } from "./auth.interface";

export interface User extends Auth {
  name: string;
  lastName: string;
  phone: string;
  isAdmin: number;
}
