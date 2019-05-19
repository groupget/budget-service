import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from './config/config.module';
import { MongooseConfigService } from './config/mongoose-config.service';
import { BudgetModule } from './budget/budget.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      playground: true,
      introspection: true
    }),
    BudgetModule,
  ],
  providers: [],
})
export class AppModule { }
