import { Resolver, Query, Args, Mutation, Subscription } from "@nestjs/graphql";
import { Inject } from "@nestjs/common";
import { ExpensesService } from "./expenses.service";
import { Expense } from "../models/expense.model";
import { NewExpenseInput } from "../dto/new-expense.input";
import { PubSubToken } from "../../common/provide-tokens";
import { PubSub } from "graphql-subscriptions";
import { UserTotalExpense } from "../models/user-total-expense.model";

@Resolver(of => Expense)
export class ExpensesResolver {
    constructor(
        private readonly expenseService: ExpensesService,
        @Inject(PubSubToken) private readonly pubSub: PubSub
    ) { }

    // DEV only.
    @Query(returns => [Expense])
    async getAllExpenses() {
        return await this.expenseService.getAllExpenses();
    }

    @Query(returns => [Expense])
    async getExpenses(@Args('groupId') groupId: string) {
        return await this.expenseService.getExpenses(groupId);
    }

    @Query(returns => [UserTotalExpense])
    async getUserTotalExpenses(@Args('groupId') groupId: string) {
        return await this.expenseService.getUserTotalExpenses(groupId);
    }

    @Mutation(returns => Expense)
    async addExpense(@Args("newExpenseData") inputExpense: NewExpenseInput) {
        const expense = await this.expenseService.addExpense(inputExpense);
        await this.pubSub.publish('expenseAdded', { expenseAdded: expense });

        return expense;
    }

    @Mutation(returns => Expense)
    async removeExpense(@Args("expenseId") expenseId: string) {
        const expense = await this.expenseService.removeExpense(expenseId);
        await this.pubSub.publish('expenseRemoved', { expenseRemoved: expense });

        return expense;
    }

    @Subscription(returns => Expense)
    expenseAdded() {
        return this.pubSub.asyncIterator('expenseAdded');
    }

    @Subscription(returns => Expense)
    expenseRemoved() {
        return this.pubSub.asyncIterator('expenseRemoved');
    }
}
