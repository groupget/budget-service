import { prop, ModelType, plugin, Typegoose } from "typegoose";
import { timestampPlugin } from "../../common/mongoose/mongoose-plugins";
import { Field, ObjectType, ID } from 'type-graphql';
import { ITimestamped } from "../../common/mongoose/timestamped-document";
import { schemaOptions } from "../../common/mongoose/schema.options";

export interface IExpense extends ITimestamped {
    id: string;
    userId: string;
    groupId: string;
    amount: number;
    description: string;
}

@ObjectType()
@plugin(timestampPlugin)
export class Expense extends Typegoose implements IExpense {

    @Field(type => ID)
    id: string;

    @Field(type => ID)
    @prop()
    userId: string;

    @Field(type => ID)
    @prop()
    groupId: string;


    @Field()
    @prop()
    amount: number;

    @Field()
    @prop()
    description: string;

    @Field() @prop() createdAt: Date;
    @Field() @prop() updatedAt: Date;

    public static get model(): ModelType<Expense> {
        return new Expense().getModelForClass(Expense, { schemaOptions });
    }

    public static get modelName(): string {
        return "Expense";
    }
}
