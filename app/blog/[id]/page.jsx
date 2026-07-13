import Image from "next/image";
import { notFound } from "next/navigation";

async function getBlogs() {
  const res = await fetch("http://localhost:3000/json/blog.json", {
    cache: "no-store",
  });

  if (!res.ok) return [];

  return res.json();
}

export default async function BlogDetails({ params }) {
  const blogs = await getBlogs();

  const blog = blogs[Number(params.id)];

  if (!blog) {
    notFound();
  }

  return (
    <main className="max-w-5xl mx-auto px-5 py-10">

      <Image
        src={blog.Thumbnail_URL}
        alt={blog.Title}
        width={1200}
        height={600}
        className="rounded-xl w-full h-[450px] object-cover"
      />

      <h1 className="text-4xl font-bold mt-8">
        {blog.Title}
      </h1>

      <p className="text-gray-500 mt-3">
        {blog.Topic}
      </p>

      <div className="flex gap-2 mt-4 flex-wrap">
        {blog.Keywords.split(",").map((item) => (
          <span
            key={item}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
          >
            {item.trim()}
          </span>
        ))}
      </div>

      <p className="text-lg text-gray-700 mt-8">
        {blog.Summary}
      </p>

      <article
        className="prose prose-lg max-w-none mt-10"
        dangerouslySetInnerHTML={{
          __html: blog.Content,
        }}
      />
    </main>
  );
}