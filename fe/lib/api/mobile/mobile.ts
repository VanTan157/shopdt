import https from "../../http";
import { MobileTType, MobileType } from "../../validate/mobile";

const MobileApi = {
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
  getMobileById: async (id: string) =>
    https.get<MobileType>(`mobiles/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    }),
  editMobile: async ({ id, mobile }: { id: string; mobile: MobileType }) => {
    const formData = new FormData();

    // Thêm các trường dữ liệu vào FormData
    formData.append("name", mobile.name || "");
    formData.append("StartingPrice", String(mobile.StartingPrice));
    formData.append("promotion", String(mobile.promotion || ""));
    formData.append("description", mobile.description || "");
    formData.append("weight", String(mobile.weight || 0));

    // Thêm specifications (chuỗi hóa JSON)
    if (mobile.specifications) {
      for (const [key, value] of Object.entries(mobile.specifications)) {
        formData.append(`specifications[${key}]`, String(value));
      }
    }

    // Camera
    if (mobile.camera) {
      for (const [key, value] of Object.entries(mobile.camera)) {
        formData.append(`camera[${key}]`, value);
      }
    }

    // Tags
    if (mobile.tags) {
      mobile.tags.forEach((tag, index) => {
        formData.append(`tags[${index}]`, tag);
      });
    }
    // Thêm colorVariants và file ảnh
    if (mobile.colorVariants) {
      mobile.colorVariants.forEach((variant, index) => {
        // Gửi từng thuộc tính con của variant
        formData.append(`colorVariants[${index}][color]`, variant.color || "");
        formData.append(
          `colorVariants[${index}][stock]`,
          String(variant.stock || 0)
        );
        // Nếu image không phải File, gửi đường dẫn
        if (!(variant.image instanceof File)) {
          formData.append(
            `colorVariants[${index}][image]`,
            variant.image || ""
          );
        }
        // Nếu image là File, gửi qua trường images
        if (variant.image instanceof File) {
          formData.append("images", variant.image);
        }
      });
    }

    // Gửi request PATCH với FormData
    return https.patch<MobileType>(
      `mobiles/${id}`,
      {
        credentials: "include",
      },
      formData
    );
  },

  removeMobile: async (id: string) =>
    https.delete(`mobiles/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }),
};

export default MobileApi;
