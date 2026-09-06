CREATE TABLE `admin_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`password_hash` varchar(25) NOT NULL,
	CONSTRAINT `admin_table_id` PRIMARY KEY(`id`),
	CONSTRAINT `admin_table_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `route_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`points` text NOT NULL,
	CONSTRAINT `route_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `truck_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`plate` varchar(7) NOT NULL,
	CONSTRAINT `truck_table_id` PRIMARY KEY(`id`)
);
