import { NextResponse } from 'next/server';
import { currentUser, transact, sameOrigin } from '@/lib/store';
import { courses, lessonGroups } from '@/lib/courses';
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 });
  const user = await currentUser();
  if (!user)
    return NextResponse.json({ error: 'Please log in to start learning.' }, { status: 401 });
  try {
    const { courseId, lesson } = await req.json();
    if (!courses.some((c) => c.id === courseId))
      return NextResponse.json({ error: 'Course not found.' }, { status: 404 });
    const count = lessonGroups.flatMap((g) => g.lessons).length;
    if (lesson !== undefined && (!Number.isInteger(lesson) || lesson < 0 || lesson >= count))
      return NextResponse.json({ error: 'Invalid lesson.' }, { status: 400 });
    const progress = await transact((d) => {
      const u = d.users.find((u) => u.id === user.id)!;
      if (!u.enrolled.includes(courseId)) u.enrolled.push(courseId);
      u.progress[courseId] ||= [];
      if (lesson !== undefined && !u.progress[courseId].includes(lesson))
        u.progress[courseId].push(lesson);
      return u.progress[courseId];
    });
    return NextResponse.json({ ok: true, progress });
  } catch {
    return NextResponse.json({ error: 'Unable to save your progress.' }, { status: 400 });
  }
}
