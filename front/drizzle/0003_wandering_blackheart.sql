CREATE TABLE `route_truck_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`point` text NOT NULL,
	`route_id` int NOT NULL,
	`truck_id` int NOT NULL,
	CONSTRAINT `route_truck_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `route_truck_table` ADD CONSTRAINT `route_truck_table_route_id_route_table_id_fk` FOREIGN KEY (`route_id`) REFERENCES `route_table`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `route_truck_table` ADD CONSTRAINT `route_truck_table_truck_id_truck_table_id_fk` FOREIGN KEY (`truck_id`) REFERENCES `truck_table`(`id`) ON DELETE no action ON UPDATE no action;