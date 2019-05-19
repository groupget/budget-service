import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class UserTotalExpense {
    @Field(type => ID)
    _id: string;

    @Field()
    totalAmount: number;
}
