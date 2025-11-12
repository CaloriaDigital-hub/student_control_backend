// src/modules/user/user.public.ts
export { UserApplicationService } from './application/services/user.service';
export { User } from './domain/entities/user.entity';
export { UserRepository } from './domain/repositories/user-repository.interface';
export { CreateUserData } from './domain/repositories/user-repository.interface';

// Только то, что нужно другим модулям