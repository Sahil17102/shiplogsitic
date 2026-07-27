import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerPage } from "@/components/inner-page";
import { pageData, routeSlugs } from "@/lib/site-data";

export function generateStaticParams() {
  return routeSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = pageData[slug];
  if (!data) return {};
  return { title: data.eyebrow, description: data.description };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = pageData[slug];
  if (!data) notFound();
  return <InnerPage slug={slug} />;
}
