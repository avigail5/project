import { Controller, Get, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/new-product.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(
    private cloudinary: CloudinaryService,
    private productsService: ProductsService) 
  {}

  @Get()
  getAllProducts() {
    return this.productsService.findAll();
  }

  @Post('create')
@UseInterceptors(FileInterceptor('image'))
async createProduct(
@UploadedFile() file: Express.Multer.File,
@Body() body: Omit<CreateProductDto, 'imageUrl'>,
) {
const upload = await this.cloudinary.uploadImage(file);


const dto: CreateProductDto = {
...body,
imageUrl: upload.secure_url,
};


return this.productsService.createProduct(dto);
}
}