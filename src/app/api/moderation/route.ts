import { NextResponse } from 'next/server';

export interface ModerationAPI {
  data: ArrayElement[];
}

export interface ArrayElement {
  results: Data[];
}

export interface Data {
  flagged: boolean;
  categories: Categories;
  category_scores: CategoryScores;
}

export interface Categories {
  sexual: boolean;
  hate: boolean;
  violence: boolean;
  'self-harm': boolean;
  'sexual/minors': boolean;
  'hate/threatening': boolean;
  'violence/graphic': boolean;
}

export interface CategoryScores {
  sexual: number;
  hate: number;
  violence: number;
  'self-harm': number;
  'sexual/minors': number;
  'hate/threatening': number;
  'violence/graphic': number;
}

export async function POST(req: Request) {
  const request = await req.json();

  console.log(request, ' request');
  const requestBody: ModerationAPI = request.data;

  const flagged = requestBody.data.map((data) => {
    return +data.results[0].flagged;
  });

  return NextResponse.json({ data: flagged });
}
