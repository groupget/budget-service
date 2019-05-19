import { Injectable } from '@nestjs/common';
import { NewExpenseInput } from '../dto/new-expense.input';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from '../models/expense.model';
import { ModelType } from 'typegoose';

@Injectable()
export class ExpensesService {

    constructor(
        @InjectModel(Expense.modelName) private readonly expenseModel: ModelType<Expense>,
    ) { }

    public async getExpenses(groupId: string) {
        return await this.expenseModel.find({ groupId: groupId }).exec();
    }

    public async addExpense(expense: NewExpenseInput) {
        const expenseModel = new this.expenseModel(expense);
        const savedExpense = await expenseModel.save();

        return savedExpense;
    }

    public async getExpensesGroupedByUser(groupId: string) {
        const pipeline = [
            { $match: { groupId: groupId } },
            {
                $group: {
                    _id: "$userId",
                    totalAmount: { $sum: "$amount" }
                }
            }
        ];
    }
}
