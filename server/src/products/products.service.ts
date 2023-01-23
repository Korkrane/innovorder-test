
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export default class ProductsService {
    async getProductByCode(code: Number) {
    try {
      const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${code}.json`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}