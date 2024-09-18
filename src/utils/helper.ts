export const normalizedName = (name: string) =>
  name?.replace(/\s+/g, "").toLowerCase() || "";
