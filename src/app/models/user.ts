import {Certificate} from "./certificate";
import {UserRole} from "./enum/user-role.enum";

export interface User {
  id?: number,
  login: string,
  password: string,
  budget: string,
  role: UserRole,
  certificates: Certificate[]
}

