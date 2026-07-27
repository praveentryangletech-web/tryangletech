import React from 'react';

const A = '/about-assets';

export default function AboutBlog() {
  return (
    <>
        {/* ── BLOG ── */}
        <section className="rt-blog-v4">
          <div className="w-layout-blockcontainer rt-container-main w-container">
            <div className="rt-tools-iconheading rt-blog-v4-heading">
              <div className="rt-sub-gap">
                <div className="rt-sub-text rt-sub-gredient">integration</div>
              </div>
              <h2 className="rt-gap-off rt-desktop-text-center">
                Insights to organize work and <span className="rt-color-periwinkle-gray">achieve more</span>
              </h2>
            </div>
            <div className="w-dyn-list">
              <div role="list" className="rt-blog-v4-card-main w-dyn-items">
                {[
                  { href: '/blog-post/simplify-projects-through-intelligent-task-management', img: '690334392ba1ea2dde7061fb_blog-three-G.png', date: '29 Oct 2025', title: 'Simplify projects through intelligent task management', authorImg: '692578b4c0960e6fd75eecf4_blog-four.webp', author: 'Phyllis Juniper' },
                  { href: '/blog-post/empowering-teams-through-organized-workflows', img: '69033491fe6b91fcc7c657c1_blog-three-F.png', date: '29 Oct 2025', title: 'Empowering teams through organized workflows', authorImg: '692578949272463827cff5ff_blog-five.webp', author: 'Nadia Dulac' },
                  { href: '/blog-post/efficiency-starts-with-effective-task-management', img: '690334d31c75da8a7738d07f_blog-three-E.png', date: '29 Oct 2025', title: 'Efficiency starts with effective task management', authorImg: '692578854278fc2eb9bf2c9e_blog-two.webp', author: 'Alyssa Ireae' },
                ].map((post, idx) => (
                  <div key={idx} role="listitem" className="w-dyn-item">
                    <a data-w-id="6b5c6d36-e516-7ca4-cea7-722942bbc916" href={post.href} className="rt-blog-v3-card rt-border-radius-medium w-inline-block">
                      <div className="rt-blog-v3-card-top-part rt-border-radius-medium rt-overflow-hidden">
                        <img className="rt-auto-fit rt-desktop-image-full-width rt-blog-image" src={`${A}/${post.img}`} width="410" height="348" alt="" loading="lazy" />
                      </div>
                      <div className="rt-blog-v3-card-bottom-part">
                        <div className="w-layout-hflex rt-blog-v3-publish-date">
                          <div className="w-layout-vflex">
                            <img width="15" height="16" alt="" src={`${A}/6903524c7f841af5015b3844_kloudera-blog-two-icon.svg`} loading="lazy" />
                          </div>
                          <div>{post.date}</div>
                        </div>
                        <div className="rt-text-style-h6">{post.title}</div>
                        <div className="w-layout-hflex rt-blog-v2-author-details">
                          <div className="rt-blog-v2-author-image rt-overflow-hidden">
                            <img width="38" height="38" alt="" src={`${A}/${post.authorImg}`} loading="lazy" className="rt-auto-fit rt-desktop-image-full-width" />
                          </div>
                          <div>{post.author}</div>
                        </div>
                      </div>
                      <div className="rt-link-discernible">This is some text inside of a div block.</div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
