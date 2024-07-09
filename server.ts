import express from "express";
import { getPayloadClient } from "./getpayload";
import { nextApp, nextHandler } from "./nextutils";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./_trpc";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});

const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL: ${cms.getAdminURL()}`);
      },
    },
  });

  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  app.use((req, res) => nextHandler(req, res));

  nextApp.prepare().then(() => {
    payload.logger.info("Next.js started");
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  });
};

start();
