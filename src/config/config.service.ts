
const LOCAL_MONGO = "mongodb://localhost/budget-test";
const LOCAL_RABBIT = "amqp://localhost";

interface MessageBroker {
    url: string;
    exchangeName: string;
}

export class ConfigService {
    get port() {
        return process.env.PORT || 3001;
    }

    get mongoUrl() {
        return process.env.DB_URL || LOCAL_MONGO;
    }

    get rabbitMQSettings(): MessageBroker {
        return {
            url: process.env.QUEUE_URL || LOCAL_RABBIT,
            exchangeName: process.env.EXCHANGE_NAME || "budget_dev",
        };
    }
}
