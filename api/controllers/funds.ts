import { NextFunction, Request, Response, Router } from 'express';
export const FundsController: Router = Router();
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

FundsController.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { address, value } = req.body;
      // check the address is well formatted and the value is > 0
      const params = {
        DelaySeconds: 10,
        MessageAttributes: {
          Address: {
            DataType: 'String',
            StringValue: address,
          },
          Value: {
            DataType: 'Number',
            StringValue: `${value}`,
          },
        },
        MessageBody: `Send ${value} VET to ${address}`,
        MessageDeduplicationId: 'SendFunds',
        MessageGroupId: 'Group1',
        QueueUrl: process.env.SQS_QUEUE_URL,
      };
      const sqs = new SQSClient({ region: process.env.REGION });
      try {
        await sqs.send(new SendMessageCommand(params));
        res.status(200).send({ data: true });
      } catch (error) {
        res.status(400).send({ data: false });
        // tslint:disable-next-line: no-console
        console.log(error);
      }
    } catch (e) {
      next(e);
    }
});
