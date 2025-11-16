import { 
  SessionNotFoundError, 
  SessionExpiredError, 
  SessionInactiveError,
  InvalidSessionOperationError 
} from '../exceptions/session.exceptions';

export interface SessionMetadata {
  ipAddress?: string;
  userAgent?: string;
  device?: string;
  location?: string;
}

export class SessionEntity {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public refreshToken: string,
    public isActive: boolean,
    public readonly createdAt: Date,
    public expiresAt: Date,
    public readonly metadata: SessionMetadata
  ) {}

  // Фабричный метод для создания новой сессии
  static create(
    userId: string, 
    refreshToken: string,
    ttlDays: number = 7,
    metadata: SessionMetadata = {}
  ): SessionEntity {
    const now = new Date();
    const id = this.generateId();
    
    if (!userId || !refreshToken) {
      throw new InvalidSessionOperationError('UserId and refreshToken are required');
    }

    if (ttlDays <= 0) {
      throw new InvalidSessionOperationError('TTL must be positive');
    }

    return new SessionEntity(
      id,
      userId,
      refreshToken,
      true, // isActive
      now,
      new Date(now.getTime() + ttlDays * 86400000),
      metadata
    );
  }

  // Доменная логика
  rotateToken(newToken: string, ttlDays: number = 7): void {
    if (!this.isActive) {
      throw new SessionInactiveError('Cannot rotate token for inactive session');
    }

    if (this.isExpired) {
      throw new SessionExpiredError('Cannot rotate token for expired session');
    }

    if (!newToken) {
      throw new InvalidSessionOperationError('New token is required');
    }

    this.refreshToken = newToken;
    this.expiresAt = new Date(Date.now() + ttlDays * 86400000);
  }

  deactivate(): void {
    this.isActive = false;
  }

  extend(additionalDays: number = 7): void {
    if (!this.isActive) {
      throw new SessionInactiveError('Cannot extend inactive session');
    }

    this.expiresAt = new Date(this.expiresAt.getTime() + additionalDays * 86400000);
  }

  // Валидации
  validate(): void {
    if (!this.isActive) {
      throw new SessionInactiveError();
    }

    if (this.isExpired) {
      throw new SessionExpiredError();
    }
  }

  // Геттеры
  get token(): string {
    return this.refreshToken;
  }

  get isExpired(): boolean {
    return this.expiresAt < new Date();
  }

  get isValid(): boolean {
    return this.isActive && !this.isExpired;
  }

  get remainingTime(): number {
    return this.expiresAt.getTime() - Date.now();
  }

  // Приватные методы
  private static generateId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Для сериализации (если нужно)
  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      isActive: this.isActive,
      createdAt: this.createdAt,
      expiresAt: this.expiresAt,
      metadata: this.metadata,
      isExpired: this.isExpired,
      isValid: this.isValid,
      remainingTime: this.remainingTime
    };
  }
}