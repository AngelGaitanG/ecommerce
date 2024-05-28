import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ){}

    async getCategories(): Promise<Category[]>{
        return this.categoryRepository.find();
    }

    async addCategories(category: Partial<Category>):Promise<Category>{
        const newCategory = this.categoryRepository.create(category);
        return this.categoryRepository.save(newCategory);
    }

    // async loadCategories(){
    //     data?.map(async (element) => {
    //         await this.categoryRepository

    //         .createQueryBuilder()
    //         .insert()
    //         .into(Category)
    //         .values({name: element.category})
    //         .orIgnore()
    //         .execute()
    //     })
    //     return 'Categorias agreagadas'
    // }

    

    async findByName(name: string): Promise<Category>{
        return this.categoryRepository.findOne({where: {name}});
    }
}
