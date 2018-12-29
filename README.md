# StratBook.Pro

Strategy handbook manager for Overwatch and other esports

### Setup
Terminal 1:
```
cd backend
touch .env
```
In .env:
```
FRONTEND_URL="http://localhost:YourFrontendPort"
PRISMA_ENDPOINT="YourPrisma(GraphQL)Endpoint"
PRISMA_SECRET="YourPrismaSecret"
APP_SECRET="YourJavascriptWebtokenSecret"
PORT=YourBackendPort
```
### Run
Back in Terminal 1:
```
npm install
npm run dev
```

Termainal 2:
```
cd frontend
npm install
npm run dev
```
