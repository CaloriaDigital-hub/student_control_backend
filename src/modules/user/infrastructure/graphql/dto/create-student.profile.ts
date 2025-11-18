// import { InputType, Field, ID } from '@nestjs/graphql';
// import { Contract } from 'src/modules/contract/contract.model';
// import { Grade } from 'src/modules/grade/grade.model';
// import { Attendance } from 'src/modules/attendance/attendance.model';
// import { Profile } from 'src/modules/profile/profile.model';
//
// @InputType()
// export class CreateStudentProfileInput extends CreateUserInput {
//   @Field(() => ID)
//   profileId: string;
//
//   @Field()
//   firstName: string;
//
//   @Field()
//   lastName: string;
//
//   @Field()
//   middleName: string;
//
//   @Field()
//   birthDate: Date;
//
//   @Field()
//   gender: string;
//
//   @Field()
//   phoneNumber: string;
//
//   @Field()
//   email: string;
//
//   @Field()
//   password: string;
//
//   @Field(() => ID)
//   studentId: string;
//
//   @Field()
//   group: string;
//
//   @Field()
//   course: number;
//
//   @Field({ nullable: true })
//   specialization?: string;
//
//   @Field({ nullable: true })
//   faculty?: string;
//
//   @Field({ nullable: true })
//   department?: string;
//
//   @Field({ nullable: true })
//   enrollmentYear?: number;
//
//   @Field({ nullable: true })
//   graduationYear?: number;
//
//   @Field({ nullable: true })
//   gpa?: number;
//
//   @Field(() => [() => Contract])
//   contracts: Contract[];
//
//   @Field(() => [() => Grade])
//   grades: Grade[];
//
//   @Field(() => [() => Attendance])
//   attendance: Attendance[];
//
//   @Field(() => Profile)
//   profile: Profile;
// }