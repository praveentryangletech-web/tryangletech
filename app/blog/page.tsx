import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import WebflowInit from "../common/WebflowInit";

import BlogContent from './components/BlogContent';

export default function BlogPage() {
  return (
    <>
      <WebflowInit pageId="68eddbced83339fe88ea9ff6" />
      <Navbar />
      <main>
        <BlogContent />
      </main>
      <Footer />
    </>
  );
}
