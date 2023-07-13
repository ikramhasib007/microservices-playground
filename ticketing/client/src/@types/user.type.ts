type UserPayload = {
  id: string;
  email: string;
};

type SessionResponse = UserPayload & {
  iat: number;
};
