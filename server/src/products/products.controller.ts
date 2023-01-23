
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import ProductsService from './products.service';
import { ApiBody, ApiExtraModels, ApiConflictResponse, ApiOkResponse, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger'

@ApiTags('Products')
@Controller('products')
export default class ProductsController {
  constructor(
    private readonly productsService: ProductsService
  ) {}

  @Get(':code')
  @ApiOperation({ summary: 'Retrieve data of :code product' })
  getProductByCode(@Param('code') code: Number) {
    return this.productsService.getProductByCode(code);
  }
}