import { Injectable } from '@nestjs/common';
import { NewExpenseInput } from '../dto/new-expense.input';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from '../models/expense.model';
import { ModelType } from 'typegoose';
import { NotificationEventType } from '../../notifications/models';
import { ProducerService } from '../../notifications/producer/producer.service';

@Injectable()
export class ExpensesService {

    constructor(
        @InjectModel(Expense.modelName) private readonly expenseModel: ModelType<Expense>,
        private readonly notifier: ProducerService
    ) { }

    public async getAllExpenses() {
        return await this.expenseModel.find().exec();
    }

    public async getExpenses(groupId: string) {
        return await this.expenseModel.find({ groupId: groupId }).exec();
    }

    public async addExpense(expense: NewExpenseInput) {
        const expenseModel = new this.expenseModel(expense);
        const savedExpense = await expenseModel.save();
        await this.notifyQueue("created", savedExpense);

        return savedExpense;
    }

    public async removeExpense(expenseId: string) {
        const result = await this.expenseModel.findByIdAndDelete(expenseId);

        if (result !== null) {
            await this.notifyQueue("deleted", result);
        }

        return result;
    }

    public async getUserTotalExpenses(groupId: string) {
        const pipeline = [
            { $match: { groupId: groupId } },
            {
                $group: {
                    _id: "$userId",
                    totalAmount: { $sum: "$amount" },
                }
            }
        ];

        return this.expenseModel.aggregate(pipeline);
    }

    private async notifyQueue(action: NotificationEventType, message: Expense) {
        return await this.notifier.publish({
            resourceType: "expense",
            type: action,
            message: message
        });
    }
}
