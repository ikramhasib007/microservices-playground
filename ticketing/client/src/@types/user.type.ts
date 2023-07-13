type UserPayload = {
  id: string;
  email: string;
};

type UserSession = UserPayload & {
  iat: number;
};
