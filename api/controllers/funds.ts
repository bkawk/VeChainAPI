import { NextFunction, Request, Response, Router } from 'express';
export const FundsController: Router = Router();
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

FundsController.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { address, value } = req.body;
      const REGION = process.env.REGION;
      const params = {
        DelaySeconds: 10,
        MessageAttributes: {
          Address: {
            DataType: 'String',
            StringValue: address,
          },
          Value: {
            DataType: 'Number',
            StringValue: value,
          },
        },
        MessageBody: `Send ${value} to ${address}`,
        MessageDeduplicationId: 'SendFunds',
        MessageGroupId: 'Group1',
        QueueUrl: process.env.SQS_QUEUE_URL,
      };

      const sqs = new SQSClient({ region: REGION });

      const run = async () => {
        try {
          const data = await sqs.send(new SendMessageCommand(params));
          res.status(200).send({ data: true });
        } catch (err) {
          res.status(400).send({ data: false });
          // tslint:disable-next-line: no-console
          console.log('Error', err);
        }
      };
      run();
    } catch (e) {
      next(e);
    }
  }
);
