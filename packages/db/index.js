// Mock Prisma client for testing without database
export const prismaClient = {
  project: {
    create: async (data) => ({ id: "mock-id-123", ...data.data }),
    findMany: async () => [{ id: "mock-id-123", title: "Mock Project", status: "draft" }],
    findUnique: async () => ({ id: "mock-id-123", title: "Mock Project", status: "draft" }),
    update: async (data) => ({ id: "mock-id-123", ...data.data }),
    delete: async () => ({ id: "mock-id-123" })
  }
};