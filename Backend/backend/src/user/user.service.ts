import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }
  async findUsersByRuolo(role: string): Promise<User[]> {
    return this.userRepository.find({
      where: { role }, // Filtra gli utenti con il ruolo specificato
    });
  }
  async createUser(
    nome: string,
    email: string,
    password: string,
    role: string = 'customer',
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      nome,
      email,
      password: hashedPassword,
      role,
    });
    return this.userRepository.save(newUser);
  }

  async updateUser(id: number, updatedData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updatedData);
    return this.userRepository.findOne({ where: { id } });
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
  async findById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  // Altri metodi per la gestione utenti (come eliminazione) possono essere aggiunti qui
}
