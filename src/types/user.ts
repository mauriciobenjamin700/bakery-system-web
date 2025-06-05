import { UserRole } from "@/constants/enums";

declare global {
  type UserLogin = {
    email: string;
    password: string;
  };
  type UserResponse = {
    name: string;
    phone: string;
    email: string;
    id: string;
    role: UserRole;
    created_at: string;
    updated_at: string;
  };
  type TokenResponse = {
    access_token: string;
    token_type: string;
    user: UserResponse;
  }
}

export {};