import { app } from './app';

const hostname = process.env.HOST;
const port = process.env.PORT;

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server running at http://${hostname}:${port}/`);
});
