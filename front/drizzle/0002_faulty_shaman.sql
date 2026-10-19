RENAME TABLE `admin_table` TO `user_table`;--> statement-breakpoint
ALTER TABLE `user_table` DROP INDEX `admin_table_username_unique`;--> statement-breakpoint
ALTER TABLE `user_table` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `user_table` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `user_table` ADD `flags` text;--> statement-breakpoint
ALTER TABLE `user_table` ADD CONSTRAINT `user_table_username_unique` UNIQUE(`username`);