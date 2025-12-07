import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/new-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findById(id: number){
    return this.productsRepository.findOne({ where: { id } });
  }

 findByName(name: string) {
    return this.productsRepository.findOne({ where: { name } });
  }

  createProduct(dto: CreateProductDto) {
  const product = this.productsRepository.create(dto);
  return this.productsRepository.save(product);
}

 async remove(id: number) {
    const product = await this.productsRepository.findOne({ where: { id: id } });
    if (!product)
      return "product not exists!"
    await this.productsRepository.delete({id: id})
    return "product Deleted Successfully";
  }
}
