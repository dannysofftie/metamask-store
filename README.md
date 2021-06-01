# Metamask wallet

A web app that users sign-in on Metamask, to pay for pending invoices. All signed users get transaction(s) confirmations in real time. The realtimeness is achieved by leveraging GraphQL subscriptions.

## Development stack

1. Node.js (TypeScript)
2. Next.js (React)
3. React-Query & graphql-request
4. MongoDB
5. GraphQL subscriptions

## Setting development environment

1. Clone remote repo
   > `git clone https://github.com/dannysofftie/metamask-store.git`
2. Install dependencies
   > `yarn` or `npm install`
3. Update `.env` environment variables.

   > `cp .env.sample .env`

4. Run development server (This will fire up both server and client)
   > `yarn dev` or `npm run dev`
5. Running tests (Will run both client side and server side unit tests)
   > `yarn test`

## Setting up Jenkins

Ensure you have Docker and docker-compose installed before you proceed.

1. Change directory and make `start.sh` executable
   > `cd jenkins && chmod +x start.sh && ./start.sh`
2. Jenkins will be accessible at `http://127.0.0.1:8080`
