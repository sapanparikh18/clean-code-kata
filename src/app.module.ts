import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Product } from "./entities/product.entity";
import { User } from "./entities/user.entity";
import { OrderController } from "./controllers/order.controller";
import { OrderService } from "./services/order.service";
import { EmailService } from "./services/email.service";

@Module({
  imports: [
    // Database configuration mixed with application logic
    // Hard-coded database configuration
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'clean-code-kata.sql',
      entities: [Order, Product, User],
      synchronize: true, // Not recommended for production
    }),
    // Registering repositories directly without abstractions
    TypeOrmModule.forFeature([Order, Product, User]),
  ],
  // No separation of concerns between different feature modules
  controllers: [OrderController],
  // Services registered directly without interfaces
  providers: [OrderService, EmailService],
})
export class AppModule {}
