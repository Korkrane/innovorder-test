import { Test, TestingModule } from '@nestjs/testing';
import  UsersService  from './users.service';
import { HttpException, HttpStatus, INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AppModule } from '../app.module';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';


describe('UsersService', () => {
  let app: INestApplication;
  let service: UsersService;
  let usersRepository: Repository<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    service = app.get(UsersService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });


  afterAll(async () => {
    await app.close();
  });

  it('AuthService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of users', async () => {
    const user = new User({
      login:'test',
      password:'test'
    });

    const result = [user];
    jest.spyOn(usersRepository, 'find').mockResolvedValue(result);

    expect(await service.getAllUsers()).toEqual(result);
  });

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      const user = new User({
        id: 1,
        login: 'test',
        password: 'test'
      });

      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(user);

      expect(await service.getUserById(1)).toEqual(user);
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.getUserById(2)).rejects.toThrow(HttpException);
    });
  });

  describe('getUserByLogin', () => {
    it('should return a user by login', async () => {
      const user = new User({
        id: 1,
        login: 'test',
        password: 'test'
      });

      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(user);

      expect(await service.getUserByLogin('test')).toEqual(user);
    });

    it('should throw an error if user not found', async () => {
      jest.spyOn(usersRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.getUserByLogin('notfound')).rejects.toThrow(HttpException);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const id = 1;
      const user: UpdateUserDto = {
        login: 'test-login',
        password: 'test-password',
      };
      const hashedPassword = await service.hashPassword(user.password);
      const updatedUser = {
        id,
        ...user,
        password: hashedPassword,
      };
      jest.spyOn(service['usersRepository'], 'update').mockResolvedValue(undefined);
      jest.spyOn(service['usersRepository'], 'findOne').mockResolvedValue(updatedUser);

      expect(await service.updateUser(id, user)).toEqual(updatedUser);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        login: 'test_user',
        password: 'test_password',
      };

      const hashedPassword = await service.hashPassword(createUserDto.password);
      const newUser = { ...createUserDto, password: hashedPassword, id:1 };
      jest.spyOn(service['usersRepository'], 'findOne').mockResolvedValue(null);
      jest.spyOn(service['usersRepository'], 'create').mockReturnValue(newUser);
      jest.spyOn(service['usersRepository'], 'save').mockResolvedValue(newUser);

      expect(await service.createUser(createUserDto)).toEqual(newUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const id = 1;
      const deleteResponse = {
        raw:0,
        affected: 1,
      };
      jest.spyOn(usersRepository, 'delete').mockResolvedValue(deleteResponse);

      await service.deleteUser(id);
      expect(await usersRepository.delete).toHaveBeenCalledWith(id);
    });

    it('should throw HttpException if user is not found', async () => {
      const deleteResult = { raw: [], affected: 0 };
      jest.spyOn(usersRepository, 'delete').mockResolvedValue(deleteResult);

      try {
        await service.deleteUser(1);
      } catch (e) {
        expect(e instanceof HttpException).toBe(true);
        expect(e.getStatus()).toBe(HttpStatus.NOT_FOUND);
        expect(e.message).toBe('User not found');
      }
    });
  });
});