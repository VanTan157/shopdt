import {
  AccountType,
  LoginResType,
  LoginType,
  MobileTType,
  MobileType,
  RegisterResType,
  RegisterType,
} from "@/app/validate";
import https from "./http";

const ReqApi = {
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
  getAllMobile: async () =>
    https.get<MobileType[]>(`/mobiles`, {
      headers: {
        "Content-Type": "application/json",
      },
    }),
  getAllMobilebyType: async (id: string) =>
    https.get<MobileType[]>(`/mobiles/type/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    }),
  getAllMobileType: async () =>
    https.get<MobileTType[]>(`/mobile-types`, {
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
};

export default ReqApi;
