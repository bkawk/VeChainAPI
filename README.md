# VeChainAPI
Simple web-facing API that accepts payment requests from a React front end, the payment request contains an amount and an address. The API, in turn, sends the request to AWS SQS to be processed by a secure lambda function that is listening to queue and not web facing.

[![<ORG_NAME>](https://circleci.com/gh/bkawk/VeChainAPI.svg?style=svg)](<LINK>)


## TODO

* Add logging with pino
* Sanitise incoming data
* Configure CORS for front end only
* Check all functions have try catch
* Final lint
* Configure CircleCI to push to ECR on success
* Build out tests to get coverage

## Install

```ssh
npm install
```

## Run Development

```ssh
npm run dev
```

## Watch Tests

```ssh
npm run devtests
```

## Start

```ssh
npm run start
```

## Docker

```ssh
npm run docker
```

## Lint

```ssh
tslint --project .
```

## Deploy

* Setup a domain Route 53
* Setup a Certificate in Certificate manager
* Create a remote repository in AWS ECR
* Push docker image to ECR
* Create a new VPC
* Create 2 Subnets for private and 2 Subnets for public
* Attach an Internet gateway to VPC
* Create 2 route tables one for public and one for private
* On the public route table connect the Internet Gateway and NAT Gateway
* On the private route table setup a route for the NAT Gateway
* Associate the coresponding subnets to the 2 route tables
* Create an ECS Cluster powered by Fargate in a new VPC
* Create a Fargate ECS Task Definition and link the docker image in ECR
* Create an application load balancer and target group for the public subnet
* Create a Fargate service in the Cluster, connect the load balancer and configure the security group
* Alias the domain to the load balancer
* Setup AWS Code Deploy linking it to GitHub




