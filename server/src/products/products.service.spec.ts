import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import ProductsService from './products.service';
import axios from 'axios';

describe('ProductsService', () => {
  let app: INestApplication;
  let service: ProductsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        ProductsService,
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    service = app.get(ProductsService);
  });


  afterAll(async () => {
    await app.close();
  });

  it('ProductService should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getProductbycode', () => {
    it('should return product data', async () => {
      const code = 3017620422003;
      const mockResponse = { data: { code: 3017620422003 } };
      jest.spyOn(axios, 'get').mockResolvedValue(mockResponse);
      const result = await service.getProductByCode(code);
      expect(result).toHaveProperty('code');
      expect(axios.get).toHaveBeenCalledWith('https://world.openfoodfacts.org/api/v2/product/3017620422003')
    });
  });
});