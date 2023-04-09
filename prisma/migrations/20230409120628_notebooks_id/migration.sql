-- CreateTable
CREATE TABLE `notebook_notes` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `notebook_id` INTEGER NOT NULL DEFAULT 0,
    `note_id` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notebooks` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `uid` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `name` VARCHAR(64) NOT NULL DEFAULT '',
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`, `uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notes` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `uid` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `title` VARCHAR(64) NOT NULL DEFAULT '',
    `content_md` LONGTEXT NOT NULL,
    `state` TINYINT NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `avatar` VARCHAR(255) NOT NULL DEFAULT '',
    `nickname` VARCHAR(32) NOT NULL DEFAULT '',
    `phone` VARCHAR(32) NOT NULL DEFAULT '',
    `password` VARCHAR(64) NOT NULL DEFAULT '',
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
