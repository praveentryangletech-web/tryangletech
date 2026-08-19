export interface AdminUserDTO {
  id?: string;
  email: string;
  name: string;
  role: string;
}

export interface AdminUserRecord {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
}

export interface SessionTokenPayload {
  sub: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}
