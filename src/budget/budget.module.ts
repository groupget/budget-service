import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { ExpensesService } from './expenses/expenses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense } from './models/expense.model';
import { ExpensesResolver } from './expenses/expenses.resolver';
import { PubSubProvider } from './providers/pub-sub.provider';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    NotificationsModule,
    MongooseModule.forFeature([
      { name: Expense.modelName, schema: Expense.model.schema }
    ]),
  ],
  providers: [
    BudgetService,
    ExpensesService,
    ExpensesResolver,
    PubSubProvider
  ]
})
export class BudgetModule { }
