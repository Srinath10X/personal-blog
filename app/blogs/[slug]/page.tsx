import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import "./css/style.css";

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("blog"));
  const paths = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));
  return paths;
}

function getPost({ slug }: { slug: string }) {
  const markdownFile = fs.readFileSync(
    path.join("blog", slug + ".mdx"),
    "utf-8",
  );
  const { data: fontMatter, content } = matter(markdownFile);
  return {
    fontMatter,
    slug,
    content,
  };
}

export default function Page({ params }: any) {
  const props = getPost(params);
  return (
    <article className="article">
      <h1>{props.fontMatter.title}</h1>
      <hr className="hr" />
      <MDXRemote source={props.content}></MDXRemote>
    </article>
  );
}
