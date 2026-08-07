
import WebflowInit from "../common/WebflowInit";

import BlogContent from './components/BlogContent';
import BlogFAQ from './components/BlogFAQ';

export default function BlogPage() {
  return (
    <>
      <WebflowInit pageId="68eddbced83339fe88ea9ff6" />

      <main>
        <BlogContent />
        <BlogFAQ />
      </main>

    </>
  );
}
