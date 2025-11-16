import { SystemRole } from "src/common/enum/role.enum";


class BaseProfileInput {
    fisrtName: string;
    lastName: string;
    middleName?: string;
    phone?: string;
    dateOfBirth?: Date;
}


class StudentProfileInput {
    
    group: string;
    course: number;
    faculty: string;
    enrollmentYear: number;
    department?: string;

}


class TeacherProfileModel {
    position: string;
    department: string;
}