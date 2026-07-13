import Link from "next/link";
import Image from "next/image";

export default function BlogSection({ blogs }) {
  return (
    <section className="max-w-7xl mx-auto py-12 px-4 bg-black">
      <h2 className="text-3xl font-bold mb-8 text-white">Latest Blogs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <Link
            key={index}
            href={`/blog/${index}`}
            className="block h-full"
          >
            <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-[#1a1a1a] shadow-md hover:shadow-xl transition-all">
              <Image
                src={blog.Thumbnail_URL}
                alt={blog.Title}
                width={500}
                height={300}
                className="w-full h-56 object-cover"
              />

              <div className="p-6 flex flex-col flex-grow">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                  {blog.Topic}
                </p>

                <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                  {blog.Title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-grow text-justify">
                  {blog.Summary}
                </p>

                <span className="inline-block mt-6 text-blue-600 font-semibold text-sm hover:underline">
                  Read Article →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}