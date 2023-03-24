from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `job` MODIFY COLUMN `name` VARCHAR(64) NOT NULL;
        ALTER TABLE `job` MODIFY COLUMN `name` VARCHAR(64) NOT NULL;
        ALTER TABLE `job` MODIFY COLUMN `name` VARCHAR(64) NOT NULL;
        ALTER TABLE `job` ADD UNIQUE INDEX `uid_job_name_688ec4` (`name`);"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE `job` DROP INDEX `idx_job_name_688ec4`;
        ALTER TABLE `job` MODIFY COLUMN `name` LONGTEXT NOT NULL;
        ALTER TABLE `job` MODIFY COLUMN `name` LONGTEXT NOT NULL;
        ALTER TABLE `job` MODIFY COLUMN `name` LONGTEXT NOT NULL;"""
