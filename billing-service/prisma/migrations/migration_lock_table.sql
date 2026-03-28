CREATE TABLE "_prisma_migrations" (
    "id" VARCHAR(36) PRIMARY KEY,
    "checksum" VARCHAR(64) NOT,
    "finished_at" TIMESTAMP,
    "migration_name" VARCHAR(255) NOT,
    "logs" TEXT,
    "rolled_back_at" TIMESTAMP,
    "started_at" TIMESTAMP NOT DEFAULT CURRENT_TIMESTAMP,
    "applied_steps_count" INTEGER NOT DEFAULT 0
);
