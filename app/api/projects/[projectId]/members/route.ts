import { NextResponse } from "next/server";
import { readUserFromCookie } from "@/lib/auth";
import { pool } from "@/lib/db";

export async function POST(req: Request, { params }: { params: Promise<{ projectId: string }> }) {
  const auth = await readUserFromCookie();
  if (!auth) return NextResponse.json({ error: "未登录" }, { status: 401 });
  const { projectId } = await params;
  const { email, role = "editor" } = await req.json();

  const ownership = await pool.query("SELECT * FROM projects WHERE id=$1 AND owner_id=$2", [projectId, auth.userId]);
  if (!ownership.rows[0]) return NextResponse.json({ error: "仅项目拥有者可添加成员" }, { status: 403 });

  const user = await pool.query("SELECT id FROM users WHERE email=$1", [email]);
  if (!user.rows[0]) return NextResponse.json({ error: "用户不存在" }, { status: 404 });

  await pool.query("INSERT INTO project_members (project_id, user_id, role) VALUES ($1,$2,$3) ON CONFLICT(project_id,user_id) DO UPDATE SET role=$3", [projectId, user.rows[0].id, role]);
  return NextResponse.json({ ok: true });
}
