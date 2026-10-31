import { timingSafeEqual } from "node:crypto";

// Checks the /admin password on the server against ADMIN_PASSWORD, so the password never
// ships in the browser bundle. /admin stays locked until ADMIN_PASSWORD is set.
export async function POST(request: Request) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return Response.json({ ok: false, error: "Admin sign-in is off until ADMIN_PASSWORD is set" }, { status: 503 });
  }

  let password = "";
  try {
    const body = await request.json();
    if (typeof body?.password === "string") password = body.password;
  } catch {
    return Response.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const given = Buffer.from(password);
  const wanted = Buffer.from(expected);
  const ok = given.length === wanted.length && timingSafeEqual(given, wanted);
  return ok
    ? Response.json({ ok: true })
    : Response.json({ ok: false, error: "Invalid password" }, { status: 401 });
}
