import React from "react";

import BlogSummaryCard from "@/components/BlogSummaryCard";
import { getBlogPostList } from "@/helpers/file-helpers";
import { BLOG_TITLE } from "@/constants";

import styles from "./homepage.module.css";

export const metadata = {
    title: BLOG_TITLE,
		content: "A wonderful blog about JavaScript"
};

async function Home() {
    const blogPosts = await getBlogPostList();

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.mainHeading}>Latest Content:</h1>
            {blogPosts.length > 0 &&
                blogPosts.map(({ title, slug, abstract, publishedOn }) => (
                    <BlogSummaryCard
                        key={slug}
                        title={title}
                        slug={slug}
                        abstract={abstract}
                        publishedOn={publishedOn}
                    />
                ))}
        </div>
    );
}

export default Home;
