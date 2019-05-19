import { Field, InputType, ID } from 'type-graphql';

@InputType()
export class NewExpenseInput {
    @Field()
    amount: number;

    @Field(type => ID)
    userId: string;

    @Field(type => ID)
    groupId: string;

    @Field()
    description: string;

    // fromListId: string  // ???
}
