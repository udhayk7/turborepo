// Mock Prisma client for testing without database
export const prismaClient = {
  video: {
    create: async (data) => ({ id: "vid-123", ...data.data }),
    findMany: async () => [{ id: "vid-123", title: "Mock Video", status: "UPLOADING" }],
    findUnique: async () => ({ id: "vid-123", title: "Mock Video", status: "UPLOADING" }),
    update: async (data) => ({ id: "vid-123", ...data.data }),
    delete: async () => ({ id: "vid-123" })
  }
};