import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const params = url.searchParams;

    // default query if none provided
    const query = params.get("q") ?? "oil OR gas OR OPEC OR crude";
    const pageSize = params.get("pageSize") ?? "5";

    const externalBase = "https://newsapi.org/v2/everything";
    const externalUrl = `${externalBase}?q=${encodeURIComponent(
      query
    )}&language=en&pageSize=${pageSize}`;

    const res = await fetch(externalUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEWS_API_KEY}`, // 👈 secure key
      },
      next: { revalidate: 60 }, // cache 60s
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("NewsAPI error:", res.status, errText);
      return NextResponse.json(
        { error: "Failed to fetch news" },
        { status: 500 }
      );
    }

    const data = await res.json();

    return NextResponse.json({
      articles: data.articles?.map((a: any) => ({
        title: a.title,
        description: a.description,
        url: a.url,
        source: a.source?.name,
        publishedAt: a.publishedAt,
      })),
    });
  } catch (err: any) {
    console.error("news fetch error:", err);
    return NextResponse.json(
      { error: "Server error fetching news" },
      { status: 500 }
    );
  }
}
