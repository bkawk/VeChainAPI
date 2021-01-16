import { app } from './app';
import * as dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server running at http://${process.env.HOST}:${port}/`);
});
