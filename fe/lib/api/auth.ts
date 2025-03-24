import https from "../http";
import {
  AccountType,
  LoginResType,
  LoginType,
  RegisterResType,
  RegisterType,
} from "../validate/auth";

const AuthApi = {
  login: async (values: LoginType) =>
    https.post<LoginResType>(
      "/auth/login",
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
      values
    ),
  register: async (values: RegisterType) =>
    https.post<RegisterResType>(
      "/users",
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      values
    ),
  logout: async () =>
    https.post<{ message: string }>(
      "/auth/logout",
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
      {}
    ),
  refreshToken: async () =>
    https.post<{ message: string }>(
      "/auth/refresh",
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
      {}
    ),
  getProfile: async (id: string) =>
    https.get<RegisterResType>(`/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    }),
  getMe: async (accessToken: string) => {
    return https.post<AccountType>(
      `/auth/me`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        credentials: "include",
      },
      {}
    );
  },
  editProfile: async (name: string) =>
    https.put(
      `auth/update-profile`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
      { name }
    ),
  editPassword: async ({
    currentP,
    newP,
  }: {
    currentP: string;
    newP: string;
  }) => {
    https.put(
      `auth/change-password`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
      {
        oldPassword: currentP,
        newPassword: newP,
      }
    );
  },
};

export default AuthApi;
