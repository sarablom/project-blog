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
