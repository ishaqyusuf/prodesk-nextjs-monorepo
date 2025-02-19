export default defineConfig({
    project: "proj_caklyqpkhwrtmdbtjhjs", // Your project reference
    // Your other config settings...
    build: {
        extensions: [
            prismaExtension({
                // version: "5.20.0", // optional, we'll automatically detect the version if not provided
                // update this to the path of your Prisma schema file
                schema: "prisma/schema",
                typedSql: true,
                migrate: true,
            }),
        ],
    },
});
