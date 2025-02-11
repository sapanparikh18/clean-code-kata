import { Product } from "../entities/product.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "../entities/order.entity";
import { User } from "../entities/user.entity";
import { EmailService } from "./email.service";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}


  async po(orderId: string) {
    const o = await this.orderRepo.findOne({
      where: { id: orderId },
      relations: ['u', 'p']
    });

    if (!o) return null;

    let total = 0;

    for (let i = 0; i < o.p.length; i++) {
      const prod = o.p[i];
      if (prod.q <= 0) {
        return null;
      }
      total += prod.p * prod.q;
    }

    o.t = total;
    o.s = 'processing';
    await this.orderRepo.save(o);


    await this.productRepo
      .createQueryBuilder()
      .update(Product)
      .set({ q: () => 'q - :amount' })
      .where('id IN (:...ids)', { ids: o.p.map(p => p.id) })
      .setParameter('amount', 1)
      .execute();


    await this.sendEmail(o.u.em, 'Order Confirmation', `Order ${o.id} is being processed`);

    return o;
  }

  private calculator(products: Product[]): number {
    let t = 0;
    for (let i = 0; i < products.length; i++) {
      const p = products[i];
      t += p.p * p.q;
    }
    return t;
  }


  private async sendEmail(to: string, subject: string, body: string) {
    // Direct dependency on external service
    const emailService = new EmailService();
    return emailService.send(to, subject, body);
  }
}
