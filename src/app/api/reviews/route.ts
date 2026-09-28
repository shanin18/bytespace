import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { currentUser, transact, getReviews, rateLimit, sameOrigin } from '@/lib/store';
import { courses } from '@/lib/courses';
export async function GET(req: Request) {
  return NextResponse.json({
    reviews: await getReviews(new URL(req.url).searchParams.get('courseId') || ''),
  });
}
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Invalid request.' }, { status: 403 });
  const user = await currentUser();
  if (!user)
    return NextResponse.json({ error: 'Please log in to leave a review.' }, { status: 401 });
  if (rateLimit('review:' + user.id, 5))
    return NextResponse.json({ error: 'Please try again in a minute.' }, { status: 429 });
  try {
    const { courseId, rating, text } = await req.json();
    if (
      !courses.some((c) => c.id === courseId) ||
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5 ||
      typeof text !== 'string' ||
      text.trim().length < 10 ||
      text.length > 2000
    )
      return NextResponse.json(
        { error: 'Choose a rating and write a review of 10–2,000 characters.' },
        { status: 400 },
      );
    if (!user.enrolled.includes(courseId))
      return NextResponse.json(
        { error: 'Enroll in this course before leaving a review.' },
        { status: 403 },
      );
    const review = {
      id: randomUUID(),
      courseId,
      userId: user.id,
      name: user.name,
      rating,
      text: text.trim(),
      date: new Date().toISOString(),
    };
    await transact((d) => {
      d.reviews = d.reviews.filter((r) => r.userId !== user.id || r.courseId !== courseId);
      d.reviews.unshift(review);
    });
    return NextResponse.json({ review });
  } catch {
    return NextResponse.json({ error: 'Unable to save your review.' }, { status: 400 });
  }
}
