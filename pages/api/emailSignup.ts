import type { NextApiRequest, NextApiResponse } from "next";
import client from "@sendgrid/client";

import dotenv from "dotenv";
import { ClientRequest } from "@sendgrid/client/src/request";
dotenv.config();

type Response = {
  success: boolean;
  email?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const { email } = req.body;
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || null;
  if (!SENDGRID_API_KEY) {
    console.log("Missing env vars: SENDGRID_API_KEY");
    return res.status(500).json({ success: false });
  }

  client.setApiKey(SENDGRID_API_KEY);

  if (typeof email !== "string") {
    return res.status(400).json({ success: false });
  }

  const data = {
    contacts: [
      {
        email,
      },
    ],
  };

  const request = {
    url: `/v3/marketing/contacts`,
    method: "PUT",
    body: data,
  } as ClientRequest;

  client
    .request(request)
    .then(() => {
      res.status(200).json({ success: true, email });
    })
    .catch((error) => {
      return res.status(500).json({ success: false });
    });
}
