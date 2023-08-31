import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { loadBlogPost } from "@/helpers/file-helpers";

import BlogHero from "@/components/BlogHero";
import CodeSnippet from "@/components/CodeSnippet/CodeSnippet";

import styles from "./postSlug.module.css";

export const getMetaInfo = React.cache(async postSlug => {
  const { frontmatter, content } = await loadBlogPost(postSlug);
  return { frontmatter, content };
});

export async function generateMetadata({ params }) {
  const { frontmatter } = await getMetaInfo(params.postSlug);

  return {
    title: frontmatter.title,
    content: frontmatter.content,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const { frontmatter, content } = await getMetaInfo(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} components={{ pre: CodeSnippet }} />
      </div>
    </article>
  );
}

export default BlogPost;
