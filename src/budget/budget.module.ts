import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { ExpensesService } from './expenses/expenses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense } from './models/expense.model';
import { ExpensesResolver } from './expenses/expenses.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Expense.modelName, schema: Expense.model.schema }
    ]),
  ],
  providers: [
    BudgetService,
    ExpensesService,
    ExpensesResolver,
  ]
})
export class BudgetModule { }
