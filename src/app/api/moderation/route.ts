import { NextResponse } from 'next/server';

export interface ModerationAPI {
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

  const requestBody = request.data;

  const flagged = requestBody.map((data: ModerationAPI) => {
    console.log(JSON.stringify(data), ' data');
    return +data.results[0].flagged;
  });

  return NextResponse.json({ data: flagged });
}
