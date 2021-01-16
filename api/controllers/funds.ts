import { NextFunction, Request, Response, Router } from 'express';
import * as crypto from 'crypto';
export const FundsController: Router = Router();
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

FundsController.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { address, amount } = req.body;
      // TODO: check the address is well formatted and the value is > 0
      const params = {
        DelaySeconds: 0,
        MessageAttributes: {
          Address: {
            DataType: 'String',
            StringValue: address,
          },
          Amount: {
            DataType: 'Number',
            StringValue: `${amount}`,
          },
        },
        MessageBody: `Send ${amount} VET to ${address}`,
        MessageDeduplicationId: crypto.randomBytes(10).toString('hex'),
        MessageGroupId: 'Group1',
        QueueUrl: process.env.SQS_QUEUE_URL,
      };
      const sqs = new SQSClient({ region: process.env.SQS_REGION });
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
