import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from './config/config.module';
import { MongooseConfigService } from './config/mongoose-config.service';
import { BudgetModule } from './budget/budget.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule,
    NotificationsModule,
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ headers: req.headers }),
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
