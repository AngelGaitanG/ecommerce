import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  address: string;
  phone: string;
  country?: string;
  city?: string;
}

@Injectable()
export class UsersRepository {
  private users: User[] = [{
    id: 1,
    email: 'qg7wS@example.com',
    name: 'John Doe',
    password: 'password123',
    address: '123 Main St',
    phone: '123-456-7890',
    country: 'USA',
    city: 'New York'
  },{
    id: 2,
    email: 'qdas@example.com',
    name: 'Ann',
    password: 'password1234',
    address: '1234 Main St',
    phone: '132-456-7890',
    country: 'USA',
    city: 'New Jersey'
  }];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  create(user: User): void {
    this.users.push(user);
  }

  update(id: number, user: Partial<User>): void {
    const existingUser = this.findOne(id);
    if (existingUser) {
      Object.assign(existingUser, user);
    }
  }

  remove(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
  }
}

