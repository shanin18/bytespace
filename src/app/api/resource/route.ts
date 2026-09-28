import { currentUser } from '@/lib/store';
import { courses } from '@/lib/courses';
export async function GET(req: Request) {
  const user = await currentUser();
  const id = new URL(req.url).searchParams.get('courseId') || '';
  const course = courses.find((c) => c.id === id);
  if (!user || !user.enrolled.includes(id))
    return new Response('Please enroll to download this resource.', { status: 403 });
  if (!course) return new Response('Course not found', { status: 404 });
  return new Response(
    `BYTESPACE — YOUR PRACTICE WORKSHEET\n${course.title}\n\n1. My goal\nWhat would you like to create or improve by the end of this course?\n\n\n2. Ideas worth keeping\nWrite down three ideas from your latest lesson.\n\n\n3. Put it into practice\nChoose one idea and use it in a small project. Describe your approach.\n\n\n4. A moment to reflect\nWhat worked? What would you try differently?\n\n\n5. Your next step\nChoose one small action you can take this week.\n\n\nKeep going. You’ve got this.\n— ByteSpace\n`,
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': `attachment; filename="bytespace-${course.id}-worksheet.txt"`,
      },
    },
  );
}
