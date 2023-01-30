
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export default class ProductsService {
    async getProductByCode(code: Number) {
    try {
      const response = await axios.get(`https://world.openfoodfacts.org/api/v2/product/${code}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}