import { getBlogBySlug } from "@/app/server.actions";
import type { BlogData } from "@/lib/types";
import Block from "../Block";
import type { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: { slug: string };
}

// TODO: update meta data image sizes / etc

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  // fetch post information
  const blog: BlogData = (await getBlogBySlug(slug)) as unknown as BlogData;

  return {
    title: blog.title + " | Evan's Blog",
    description: blog.description,
    metadataBase: new URL(`https://evanoshea.blog/blog/${slug}/`),
    // keywords: ["Next.js", "React", "JavaScript"], // TODO: create field for this
    keywords: (blog.keywords as string[]) || [],
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/en-US",
        "de-DE": "/de-DE",
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
      },
    },
    openGraph: {
      title: blog.title + " | Evan's Blog",
      description: blog.description ?? "Evan's blog DEFAULT description here",
      url: `https://evanoshea.blog/blog/${slug}`,
      siteName: "Evan O'Shea's blog",
      images: [
        {
          url: "https://nextjs.org/og.png", // Must be an absolute URL
          width: 800,
          height: 600,
        },
        {
          url: "https://nextjs.org/og-alt.png", // Must be an absolute URL
          width: 1800,
          height: 1600,
          alt: "My custom alt",
        },
      ],
      videos: [
        {
          url: "https://nextjs.org/video.mp4", // Must be an absolute URL
          width: 800,
          height: 600,
        },
      ],
      audio: [
        {
          url: "https://nextjs.org/audio.mp3", // Must be an absolute URL
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

async function RenderBlog({ params }: Props) {
  const { slug } = await params;

  let blog: BlogData | null = null;
  try {
    blog = (await getBlogBySlug(slug)) as unknown as BlogData;
  } catch (e) {
    console.error("Blog fetch err:", e);
  }

  if (!blog || blog == null) return <div>No blog..</div>;

  const pathname = `https://www.evanoshea.blog/blog/${slug}`;

  console.log("Pathname: ", pathname);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pathname,
    },
    headline: blog.title,
    description: blog.description,
    image: blog.image,
    author: {
      "@type": "Person",
      name: blog.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Evan O'Shea's Blog",
      logo: {
        "@type": "ImageObject",
        url: "https://yourblog.com/logo.png",
      },
    },
    datePublished: blog.published_at,
    dateModified: blog.modified_at,
  };

  return (
    <>
      <h1>{blog.title}</h1>
      <p>Author: {blog.author}</p>
      {blog.content.blocks.length ? (
        <>
          {blog.content.blocks.map((block) => (
            <Block key={block.id} block={block} />
          ))}
        </>
      ) : (
        <div>No blocks...</div>
      )}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </>
  );
}

export default RenderBlog;
