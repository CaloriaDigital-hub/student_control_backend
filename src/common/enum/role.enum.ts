// src/common/enums/role.enum.ts
export enum SystemRole {
  SUPER_ADMIN = 'SUPER_ADMIN',    // Только для инициализации системы
  ADMIN = 'ADMIN',                // Управление системой
  DEPARTMENT_HEAD = 'DEPARTMENT_HEAD', // Руководитель подразделения
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT'
}