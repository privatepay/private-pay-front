export const DocumentType = {
  CNPJ: "CNPJ",
  CPF: "CPF",
} as const;

export type DocumentType = (typeof DocumentType)[keyof typeof DocumentType];

export const Role = {
  USER: "USER",
  ADMIN: "ADMIN",
};

export type Role = (typeof Role)[keyof typeof Role];

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IRegisterUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  document: string;
  documentType: DocumentType;
  role: Role;
}

export interface UserProfile {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  language: string;
  iat: number;
  exp: number;
}
