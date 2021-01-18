import { app } from './app';
import * as dotenv from 'dotenv';
dotenv.config();

const port = 3000;

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server running`);
});
