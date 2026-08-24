// Prisma configuration file
// Manages database connection URLs for Prisma CLI and IDE tools

export default {
  schema: './prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL,
    directUrl: process.env.DIRECT_URL,
  },
};
