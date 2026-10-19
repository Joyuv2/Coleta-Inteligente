import { int, mysqlTable, varchar, text } from 'drizzle-orm/mysql-core';

// export const truckTable = mysqlTable('truck_table', {
//     id: int().primaryKey().autoincrement(),
//     plate: varchar({ length: 7 }).notNull(),
// });

export const truckTable = mysqlTable('truck_table', {
    id: int().primaryKey().autoincrement(),
    plate: varchar({ length: 7 }).notNull(),
});

export const routeTable = mysqlTable('route_table', {
    id: int().primaryKey().autoincrement(),
    points: text().notNull(),
})

export const userTable = mysqlTable('user_table', {
    id: int().primaryKey().autoincrement(),
    username: varchar({ length: 255 }).notNull().unique(),
    password_hash: varchar({ length: 255 }).notNull(),
    flags: text()
})

export const routeTruckTable = mysqlTable('route_truck_table', {
    id: int().primaryKey().autoincrement(),
    previous_points: text(),
    point: text().notNull(),
    route_id: int().notNull().references(() => routeTable.id),
    truck_id: int().notNull().references(() => truckTable.id),
})