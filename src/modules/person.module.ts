import { Module } from '@nestjs/common';
import { PersonController } from './../controllers/person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModel } from './../models/person.model';

@Module({
  imports: [TypeOrmModule.forFeature([PersonModel])],
  controllers: [PersonController],
})
export class PersonModule { }
