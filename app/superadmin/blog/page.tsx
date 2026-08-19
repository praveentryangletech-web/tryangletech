'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import BlogTable from '@/app/superadmin/blog/components/BlogTable';
import BlogDeleteModal from '@/app/superadmin/blog/components/BlogDeleteModal';
import { BlogProvider, useBlog } from '@/app/superadmin/context/BlogContext';

/**
 * BlogContentView Component
 * 
 * Houses the blog data table, preview modals, full-page edit/create navigation,
 * and delete confirmation dialogs connected to BlogContext.
 */
function BlogContentView() {
  const router = useRouter();
  const {
    deletingPost,
    setDeletingPost,
    deletePost,
  } = useBlog();

  /**
   * Navigate to the full-page Article Editor (Create mode)
   */
  const handleAddNew = () => {
    router.push('/superadmin/blog/editor');
  };

  /**
   * Navigate to the full-page Article Editor (Edit mode)
   * 
   * @param {any} post - The post record to edit
   */
  const handleEdit = (post: any) => {
    const targetId = post.id || post.slug;
    router.push(`/superadmin/blog/editor?id=${targetId}`);
  };

  /**
   * Open "Delete Article" confirmation modal
   * 
   * @param {any} post - The post record to delete
   */
  const handleDelete = (post: any) => {
    setDeletingPost(post);
  };

  return (
    <>
      {/* 1. Server-Paginated Interactive Blog Table */}
      <BlogTable
        onEditPost={handleEdit}
        onDeletePost={handleDelete}
        onAddNewPost={handleAddNew}
      />

      {/* 2. Delete Confirmation Modal */}
      <BlogDeleteModal
        isOpen={!!deletingPost}
        post={deletingPost}
        onClose={() => setDeletingPost(null)}
        onConfirm={deletePost}
      />
    </>
  );
}

/**
 * SuperadminBlogPage Component
 * 
 * Root Superadmin page for managing blog articles, wrapped in BlogProvider.
 */
export default function SuperadminBlogPage() {
  return (
    <BlogProvider>
      <BlogContentView />
    </BlogProvider>
  );
}
