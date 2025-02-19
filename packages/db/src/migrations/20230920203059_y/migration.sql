-- DropIndex
DROP INDEX `model_has_permissions_model_id_model_type_index` ON `modelhaspermissions`;

-- DropIndex
DROP INDEX `model_has_roles_model_id_model_type_index` ON `modelhasroles`;

-- DropIndex
DROP INDEX `permissions_name_guard_name_unique` ON `permissions`;
