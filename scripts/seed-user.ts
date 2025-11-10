import { PrismaClient, SystemRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
}

async function main() {
    console.log('🌱 Starting seed...\n');

    // Пароль для всех тестовых пользователей
    const defaultPassword = 'Test123!';
    const hashedPassword = await hashPassword(defaultPassword);

    // ==================== 1. SUPER ADMIN ====================
    const superAdmin = await prisma.user.create({
        data: {
            email: 'superadmin@university.com',
            login: 'superadmin',
            password: hashedPassword,
            isActive: true,
            roles: {
                create: {
                    role: SystemRole.SUPER_ADMIN,
                    assignedBy: 'system',
                    assignedAt: new Date(),
                    
                    isActive: true,
                    profile: {
                        create: {
                            firstName: 'Иван',
                            lastName: 'Петров',
                            middleName: 'Сергеевич',
                            gender: 'male',
                            dateOfBirth: new Date('1980-05-15'),
                            phone: '+996700123456',
                            address: 'г. Бишкек, ул. Чуй 265',
                            adminProfile: {
                                create: {
                                    department: 'Администрация',
                                    position: 'Главный администратор',
                                    

                                    permissions: [
                                        'manage_users',
                                        'manage_roles',
                                        'view_all_data',
                                        'manage_applications',
                                        'view_security_logs',
                                        'manage_system_settings'
                                    ],
                                    scope: 'Полный доступ ко всей системе',
                                    experienceYears: 15
                                }
                            }
                        }
                    }
                }



            }


        },
        include: {
            roles: {
                include: {
                    profile: {
                        include: { adminProfile: true }
                    }
                }
            }
        }
    });

    console.log('✅ Super Admin создан:');
    console.log(`   Login: ${superAdmin.login}`);
    console.log(`   Email: ${superAdmin.email}`);
    console.log(`   Role: ${superAdmin.roles[0].role}\n`);

    // ==================== 2. DEPARTMENT HEAD ====================
    const deptHead = await prisma.user.create({
        data: {
            email: 'head.cs@university.com',
            login: 'head_cs',
            password: hashedPassword,
            isActive: true,
            roles: {
                create: {
                    role: SystemRole.DEPARTMENT_HEAD,
                    assignedBy: superAdmin.id,
                    isActive: true,
                    profile: {
                        create: {
                            firstName: 'Айгуль',
                            lastName: 'Асанова',
                            middleName: 'Бакытовна',
                            gender: 'female',
                            dateOfBirth: new Date('1975-08-20'),
                            phone: '+996555987654',
                            address: 'г. Бишкек, ул. Московская 123',
                            departmentHeadProfile: {
                                create: {
                                    department: 'Информационные технологии',
                                    faculty: 'Факультет информационных технологий',
                                    permissions: [
                                        'manage_department_teachers',
                                        'view_department_students',
                                        'approve_schedules',
                                        'view_department_reports'
                                    ],
                                    experienceYears: 20
                                }
                            }
                        }
                    }
                }
            }
        },
        include: {
            roles: {
                include: {
                    profile: {
                        include: { departmentHeadProfile: true }
                    }
                }
            }
        }
    });

    console.log('✅ Department Head создан:');
    console.log(`   Login: ${deptHead.login}`);
    console.log(`   Email: ${deptHead.email}`);
    console.log(`   Department: ${deptHead.roles[0].profile?.departmentHeadProfile?.department}\n`);

    // ==================== 3. TEACHERS ====================
    const teacher1 = await prisma.user.create({
        data: {
            email: 'teacher.math@university.com',
            login: 'teacher_math',
            password: hashedPassword,
            isActive: true,
            roles: {
                create: {
                    role: SystemRole.TEACHER,
                    assignedBy: superAdmin.id,
                    isActive: true,
                    profile: {
                        create: {
                            firstName: 'Нурлан',
                            lastName: 'Токтомушев',
                            middleName: 'Эркинович',
                            gender: 'male',
                            dateOfBirth: new Date('1985-03-10'),
                            phone: '+996700111222',
                            address: 'г. Бишкек, мкр. Джал 45',
                            teacherProfile: {
                                create: {
                                    faculty: 'Факультет информационных технологий',
                                    department: 'Информационные технологии',
                                    position: 'Старший преподаватель',
                                    academicDegree: 'Кандидат физико-математических наук',
                                    academicTitle: 'Доцент',
                                    experienceYears: 10,
                                    education: 'КНУ им. Ж. Баласагына, Прикладная математика',
                                    biography: 'Специалист в области алгоритмов и математического моделирования'
                                }
                            }
                        }
                    }
                }
            }
        },
        include: {
            roles: {
                include: {
                    profile: {
                        include: { teacherProfile: true }
                    }
                }
            }
        }
    });

    const teacher2 = await prisma.user.create({
        data: {
            email: 'teacher.prog@university.com',
            login: 'teacher_prog',
            password: hashedPassword,
            isActive: true,
            roles: {
                create: {
                    role: SystemRole.TEACHER,
                    assignedBy: superAdmin.id,
                    isActive: true,
                    profile: {
                        create: {
                            firstName: 'Гульнара',
                            lastName: 'Жумабаева',
                            middleName: 'Асановна',
                            gender: 'female',
                            dateOfBirth: new Date('1990-11-25'),
                            phone: '+996555333444',
                            teacherProfile: {
                                create: {
                                    faculty: 'Факультет информационных технологий',
                                    department: 'Информационные технологии',
                                    position: 'Преподаватель',
                                    academicDegree: 'Магистр',
                                    experienceYears: 5,
                                    education: 'КГТУ, Программная инженерия',
                                    biography: 'Эксперт в веб-разработке и базах данных'
                                }
                            }
                        }
                    }
                }
            }
        },

        include: {
            roles: {
                include: {
                    profile: {
                        include: { teacherProfile: true }
                    }
                }
            }
        }
    });

    console.log('✅ Teachers созданы (2 шт.)\n');

    // ==================== 4. STUDENTS ====================
    const student1 = await prisma.user.create({
        data: {
            email: 'student1@university.com',
            login: 'student001',
            password: hashedPassword,
            isActive: true,
            roles: {
                create: {
                    role: SystemRole.STUDENT,
                    assignedBy: superAdmin.id,
                    isActive: true,
                    profile: {
                        create: {
                            firstName: 'Азамат',
                            lastName: 'Кадыров',
                            middleName: 'Талантович',
                            gender: 'male',
                            dateOfBirth: new Date('2004-06-15'),
                            phone: '+996700555666',
                            studentProfile: {
                                create: {
                                    studentId: 'ST2024001',
                                    group: 'ИТ-21',
                                    course: 2,
                                    specialization: 'Информационные системы',
                                    faculty: 'Факультет информационных технологий',
                                    department: 'Информационные технологии',
                                    enrollmentYear: 2023,
                                    graduationYear: 2027,
                                    gpa: 3.8
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    const student2 = await prisma.user.create({
        data: {
            email: 'student2@university.com',
            login: 'student002',
            password: hashedPassword,
            isActive: true,
            roles: {
                create: {
                    role: SystemRole.STUDENT,
                    assignedBy: superAdmin.id,
                    isActive: true,
                    profile: {
                        create: {
                            firstName: 'Медина',
                            lastName: 'Сатарова',
                            middleName: 'Бекболотовна',
                            gender: 'female',
                            dateOfBirth: new Date('2005-02-20'),
                            phone: '+996555777888',
                            studentProfile: {
                                create: {
                                    studentId: 'ST2024002',
                                    group: 'ИТ-21',
                                    course: 2,
                                    specialization: 'Информационные системы',
                                    faculty: 'Факультет информационных технологий',
                                    department: 'Информационные технологии',
                                    enrollmentYear: 2023,
                                    graduationYear: 2027,
                                    gpa: 4.0
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    console.log('✅ Students созданы (2 шт.)\n');

    // ==================== 5. SUBJECTS ====================
    const subjects = await prisma.subject.createMany({
        data: [
            {
                name: 'Математический анализ',
                code: 'MATH101',
                description: 'Основы математического анализа',
                credits: 5,
                isActive: true
            },
            {
                name: 'Программирование на Python',
                code: 'CS201',
                description: 'Основы программирования на языке Python',
                credits: 4,
                isActive: true
            },
            {
                name: 'Базы данных',
                code: 'CS301',
                description: 'Проектирование и работа с базами данных',
                credits: 4,
                isActive: true
            }
        ]
    });

    const allSubjects = await prisma.subject.findMany();
    console.log('✅ Subjects созданы (3 шт.)\n');

    // ==================== 6. TEACHER-SUBJECT RELATIONS ====================
    const teacherProfile1 = teacher1.roles[0].profile?.teacherProfile;
    const teacherProfile2 = teacher2.roles[0].profile?.teacherProfile;

    if (teacherProfile1 && teacherProfile2) {
        await prisma.teacherSubject.createMany({
            data: [
                {
                    teacherId: teacherProfile1.id,
                    subjectId: allSubjects[0].id, // Math
                    semester: 'SPRING',
                    year: 2025,
                    isActive: true
                },
                {
                    teacherId: teacherProfile2.id,
                    subjectId: allSubjects[1].id, // Python
                    semester: 'SPRING',
                    year: 2025,
                    isActive: true
                },
                {
                    teacherId: teacherProfile2.id,
                    subjectId: allSubjects[2].id, // DB
                    semester: 'SPRING',
                    year: 2025,
                    isActive: true
                }
            ]
        });
        console.log('✅ Teacher-Subject relations созданы\n');
    }

    // ==================== SUMMARY ====================
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 Seed завершен успешно!\n');
    console.log('📋 Созданные аккаунты:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('1. Super Admin:');
    console.log(`   Login: superadmin`);
    console.log(`   Email: superadmin@university.com`);
    console.log('');
    console.log('2. Department Head:');
    console.log(`   Login: head_cs`);
    console.log(`   Email: head.cs@university.com`);
    console.log('');
    console.log('3. Teachers:');
    console.log(`   Login: teacher_math | teacher_prog`);
    console.log(`   Email: teacher.math@... | teacher.prog@...`);
    console.log('');
    console.log('4. Students:');
    console.log(`   Login: student001 | student002`);
    console.log(`   Email: student1@... | student2@...`);
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`🔑 Пароль для всех: ${defaultPassword}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main()
    .catch(e => {
        console.error('❌ Ошибка при выполнении seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });