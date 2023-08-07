type UserPayload = {
  id: string;
  email: string;
};

type SessionUser = UserPayload & {
  iat: number;
};
