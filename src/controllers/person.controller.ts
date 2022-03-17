/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonModel } from 'src/models/person.model';
import { PersonSchema } from 'src/schemas/person.schema';
import { Repository } from 'typeorm';

@Controller('/person')
export class PersonController {
  constructor(
    @InjectRepository(PersonModel)
    private model: Repository<PersonModel>,
  ) { }

  @Post()
  public async create(@Body() body: PersonSchema): Promise<PersonModel> {
    const personCreated = await this.model.save(body);
    return personCreated;
  }

  @Get()
  public async readAll(): Promise<PersonModel[]> {
    const list = await this.model.find();
    return list;
  }

  @Get(':id')
  public async readOne(@Param('id', ParseIntPipe) id: number): Promise<PersonModel> {
    const person = await this.model.findOne({ where: { id } })

    if (!person) {
      throw new NotFoundException(`Não existe pessoa com o ID ${id}`);
    }

    return person;
  }

  @Put(':id')
  public async update(@Param('id', ParseIntPipe) id: number, @Body() body: PersonSchema,): Promise<PersonModel> {
    const person = await this.model.findOne({ where: { id } })

    if (!person) {
      throw new NotFoundException(`Não existe pessoa com o ID ${id}`);
    }

    await this.model.update({ id }, body);

    return this.model.findOne({ where: { id } });
  }

  @Delete(':id')
  public async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const person = await this.model.findOne({ where: { id } })

    if (!person) {
      throw new NotFoundException(`Não existe pessoa com o ID ${id}`);
    }

    await this.model.delete(id);
    return `A pessoa com o ID ${id} foi deletada`;
  }
}