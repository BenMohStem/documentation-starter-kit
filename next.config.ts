import nextra from "nextra";

const withNextra = nextra({
  defaultShowCopyCode: true,
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withNextra({
  reactStrictMode: true,
});
