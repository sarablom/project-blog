import React from "react";

import BlogSummaryCard from "@/components/BlogSummaryCard";

import styles from "./homepage.module.css";
import { getBlogPostList } from "@/helpers/file-helpers";

async function Home() {
    const blogPosts = await getBlogPostList();

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.mainHeading}>Latest Content:</h1>
            {blogPosts.length > 0 &&
                blogPosts.map(post => (
                    <BlogSummaryCard
                        key={post.title}
                        title={post.title}
                        slug={post.slug}
                        abstract={post.abstract}
                        publishedOn={post.publishedOn}
                    />
                ))}
        </div>
    );
}

export default Home;
