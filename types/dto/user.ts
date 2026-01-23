export type UserResponseDTO = {
  id: string;
  name: string;
  email: string;
};

export type CreateUser = {
  name: string;
  email: string;
  password: string;
};
