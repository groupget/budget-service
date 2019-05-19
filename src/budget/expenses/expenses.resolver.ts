import { Resolver, Query, Args, Mutation, Subscription } from "@nestjs/graphql";
import { Inject } from "@nestjs/common";
import { ExpensesService } from "./expenses.service";
import { Expense } from "../models/expense.model";
import { NewExpenseInput } from "../dto/new-expense.input";

@Resolver(of => Expense)
export class ExpensesResolver {
    constructor(
        private readonly expenseService: ExpensesService,
    ) { }

    @Query(returns => [Expense])
    async getItems(@Args('groupId') groupId: string) {
        return await this.expenseService.getExpenses(groupId);
    }

    @Mutation(returns => Expense)
    async addItem(@Args("newExpenseData") inputExpense: NewExpenseInput) {
        const item = await this.expenseService.addExpense(inputExpense);

        return item;
    }

    // @Mutation(returns => Item)
    // async removeItem(@Args('listId') listId: string, @Args("itemId") itemId: string) {
    //     const item = await this.itemsService.removeItem(itemId);
    //     await this.pubSub.publish('itemRemoved', { itemRemoved: item });
    //     return item;
    // }

    // @Subscription(returns => Item)
    // itemAdded() {
    //     return this.pubSub.asyncIterator('itemAdded');
    // }

    // @Subscription(returns => Item)
    // itemToggled() {
    //     return this.pubSub.asyncIterator('itemToggled');
    // }

    // @Subscription(returns => Item)
    // itemRemoved() {
    //     return this.pubSub.asyncIterator('itemRemoved');
    // }
}
