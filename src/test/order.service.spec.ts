import { Repository } from "typeorm";
import { Product } from "../entities/product.entity";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { Order } from "../entities/order.entity";
import { User } from "../entities/user.entity";
import { OrderService } from "../services/order.service";
import { EmailService } from "../services/email.service";

describe('OrderService', () => {
  let service: OrderService;
  let orderRepo: Repository<Order>;
  let productRepo: Repository<Product>;
  let userRepo: Repository<User>;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Order, Product, User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Order, Product, User]),
      ],
      providers: [OrderService, EmailService],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepo = module.get<Repository<Order>>(getRepositoryToken(Order));
    productRepo = module.get<Repository<Product>>(getRepositoryToken(Product));
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should process order successfully', async () => {
    // Only testing happy path
    // No error cases
    // No edge cases

    // First create the user
    const user = await userRepo.save({
      n: 'Test User',
      em: 'test@test.com',
      a: false,
      pwd: 'hashedPassword'
    });

    // Then create the product
    const product = await module.get<Repository<Product>>(getRepositoryToken(Product)).save({
      name: 'Test Product',
      p: 100,
      q: 10,
      c: 'test'
    });

    // Finally create the order with proper references
    const order = await orderRepo.save({
      u: user,
      p: [product],
      s: 'pending',
      t: 0,
    });

    const result = await service.po(order.id);
    expect(result).toBeDefined();
    expect(result.t).toBe(1000);
  });
});
