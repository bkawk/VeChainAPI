# VeChainAPI
Simple web-facing API that accepts payment requests from a React front end, the payment request contains an amount and an address. The API, in turn, sends the request to AWS SQS to be processed by a script running in a non-web-facing VPC over multiple AZ's

## TODO

* Sanitise incoming data
* Configure CORS for front end only
* Check all functions have try catch
* Log all errors
* Final lint
* Configure CircleCI to push to ECR on success
* Complete deployment readme

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

## Deploy

### 1. Build the application with Docker and check it runs as expected

```ssh
yarn docker
```
Then go to http://localhost/8080/v1/ping and you will see the output "pong"

### 2. Build the docker image

```ssh
docker build -t vechain-api .
```
### 3. Create a repository on AWS ECR

* Log into AWS
* Go to `Elastic Container Registery`
* Select `Repositories` from the left hand side
* Select `Create Repostory`
* Enter the name as `vechain-api`
* Check you have the latest version of Docker running
* Check you have the latest AWS CLI installed
* Follow the commands that look like the below
* Wait for the image to be pushed to the repository

```ssh
# aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin 308475981017.dkr.ecr.us-east-2.amazonaws.com
# docker build -t vechain-api .
# docker tag vechain-api:latest 308475981017.dkr.ecr.us-east-2.amazonaws.com/vechain-api:latest
# docker push 308475981017.dkr.ecr.us-east-2.amazonaws.com/vechain-api:latest
```


### 4. Create an ECS task definition

* From te repository copy the `Repository URL` (Not the image URL!)
* Go to `ECS` and select `Task Definitions` from the left hand menu
* On the next screen select Fargate
* Select `Add Container`
* set `Task Definition Name` to `vechain-api`
* set `Task memory (GB)` to `0.5GB`
* set `Task CPU (vCPU)` to `0.25 vCPU`
* Under `Container Definitions` select `Add container`
* set Container name `vechain-api`
* set Image to the url you copied above mine was `308475981017.dkr.ecr.us-east-2.amazonaws.com/vechain-api`
* set `Port mappings` to `8080`
* In the `Environment` section, find the section titled `Environment variables` and add in the vsalues from the .env file
* Save


### 5. Configure a cluster

* Go to `ECS` and select `Clusters` from the left hand menu
* Select `Create Cluster`
* Select the default `Networking only`
* set `Cluster name` to `vchain-api-cluster` or other unique name
* Select `Create`

### 6. Add a domain name

 * Go to `Route 53` and select `Register domain` from the route 53 Dashboard if you need one if you dont then select `Registered domains` from the left hand menu and select `Transfer Domain`
 * Complete the purchae or transfer
 * Select `Hosted zones` from the left hand menu 
 * Select `Create Record Set`
 * on the right set `Name` to `api`


### 7. Create a certificate

* Go to `ACM` and select `Get started` under provision certificates

### 8. Create a load balancer

 * Go to `EC2` and select `Load Balancers` from the left hand menu
 * Select `Create Load Balancer`
 * Select `Create` on `Application Load Balancer`
 * set `Name` to `vchain-api-lb`
 * Select `Add listener` and choose https and leave the port as 443
 * Select the tick box's next to the first two `Availability Zones`
 * Slect `Next: Configure Security Settings`

### 9. Create a service