# VeChainAPI
Simple web-facing API that accepts payment requests from a React front end, the payment request contains an amount and an address. The API, in turn, sends the request to AWS SQS to be processed by a script running in a non-web-facing VPC over multiple AZ's

## TODO

* write controller for acceptiong payment request 
* Implement CORS to ensure only requests from the front end URL will be accepted
* Sanitise incoming data
* Setup and connect to SQS


## Install

```ssh
yarn
```

## Run Development

```ssh
yarn dev
```

## Watch Tests

```ssh
yarn devtests
```

## Start

```ssh
yarn start
```

## Docker

```ssh
yarn docker
```

## Lint

```ssh
tslint --project .
```


