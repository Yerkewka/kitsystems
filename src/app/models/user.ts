export interface ITokenResponse {
  refresh: string;
  access: string;
}

export interface ILoginFormInputs {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  is_active: boolean;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  position: number;
  avatar: string | null;
  created_by: string | null;
  created_at: Date;
  modified_at: Date;
}
