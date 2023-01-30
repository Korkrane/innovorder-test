
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import ProductsService from './products.service';
import { ApiBody, ApiExtraModels, ApiConflictResponse, ApiOkResponse, ApiOperation, ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '../users/auth.guard';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export default class ProductsController {
  constructor(
    private readonly productsService: ProductsService
  ) {}

  @Get(':code')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Retrieve data of :code product' })
  getProductByCode(@Param('code') code: Number) {
    return this.productsService.getProductByCode(code);
  }
}