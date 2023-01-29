// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "~/db/client";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string") {
    return res.status(404).json({ message: "Use With a slug" });
  }

  const data = await prisma?.shortLink.findFirst({
    where: {
      slug: {
        equals: slug
      }
    }
  })

  if (!data) {
    return res.status(404).json({ message: "slug not found" });
  }

  res.setHeader("Cache-Control", "s-maxage=1000000, stale-while-revalidate");

  return res.json(data)
}
