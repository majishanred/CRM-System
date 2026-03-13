export interface UserFilters {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  isBlocked?: boolean;
  limit?: number; // сколько на странице
  page?: number; // страницу
}

export interface User {
  id: number;
  username: string;
  email: string;
  date: string; // ISO date string
  isBlocked: boolean;
  roles: Roles[];
  phoneNumber: string;
}

export interface UserRolesRequest {
  roles: Roles[];
}

export type UserRequest = {
  [Key in keyof Pick<User, 'username' | 'email' | 'phoneNumber'>]+?: User[Key];
};

export enum Roles {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  USER = 'USER',
}
