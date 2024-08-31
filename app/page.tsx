import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import "./page.css";

export default function Home() {
  const blogDir = "blog";
  const files = fs.readdirSync(path.join(blogDir));

  const blogs = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(blogDir, filename), "utf-8");
    const { data: frontMatter } = matter(fileContent);
    return {
      meta: frontMatter,
      slug: filename.replace(".mdx", ""),
    };
  });

  return (
    <main>
      <div className="header">
        <h1>Srinath10X</h1>
      </div>
      <section className="blog-section">
        <h2>Latest Blogs</h2>
        <hr className="hr" />
        <div className="blogs-wrapper">
          {blogs.map((blog) => (
            <Link href={"/blogs/" + blog.slug} passHref key={blog.slug}>
              <div className="blog-div">
                <div className="blog-div-child">
                  <h3>{blog.meta.title}</h3>
                  <div>
                    <p>{blog.meta.description}</p>
                  </div>
                  <div>
                    <p>{blog.meta.date}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
