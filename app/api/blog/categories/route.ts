import { NextRequest, NextResponse } from 'next/server';
import { portfolioCategoryService } from '@/backend/services/portfolio/category.service';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';
import { requireSuperadmin } from '@/backend/utils/authGuard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * GET /api/blog/categories
 * Returns all active blog categories with live article counts from the shared Category table (type='BLOG').
 */
export async function GET(req: NextRequest) {
  try {
    const clientEtag = req.headers.get('if-none-match');
    const categories = await portfolioCategoryService.getAllCategories('BLOG');
    const etag = categories.etag || '';

    // HTTP 304 Not Modified support
    if (clientEtag && clientEtag === etag) {
      return new NextResponse(null, {
        status: 304,
        headers: {
          'ETag': etag,
          'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=86400',
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        data: categories,
        total: categories.length,
      },
      {
        status: 200,
        headers: {
          'ETag': etag,
          'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=86400',
          'CDN-Cache-Control': 'public, s-maxage=300',
          'Vercel-CDN-Cache-Control': 'public, s-maxage=300',
        },
      }
    );
  } catch (error: any) {
    console.error('GET /api/blog/categories error:', error);
    return errorResponse('Failed to retrieve blog categories.', 500);
  }
}

/**
 * POST /api/blog/categories
 * Creates a new dynamic blog category in the shared table with type='BLOG' (Requires Superadmin)
 */
export async function POST(req: NextRequest) {
  const authError = requireSuperadmin(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return errorResponse('Category name is required.', 400);
    }

    const created = await portfolioCategoryService.createCategory(name.trim(), 'BLOG');
    return successResponse(created, `Blog category "${created.name}" created successfully.`, 201);
  } catch (error: any) {
    console.error('POST /api/blog/categories error:', error);
    return errorResponse(error?.message || 'Failed to create blog category.', 400);
  }
}

/**
 * DELETE /api/blog/categories?id=... (or ?name=...)
 * Deletes a blog category with type='BLOG' (Requires Superadmin)
 */
export async function DELETE(req: NextRequest) {
  const authError = requireSuperadmin(req);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id') || searchParams.get('name');

    if (!id || !id.trim()) {
      return errorResponse('Category ID or Name parameter is required for deletion.', 400);
    }

    const result = await portfolioCategoryService.deleteCategory(id.trim(), 'BLOG');
    return successResponse(result, `Blog category "${result.deletedName}" deleted successfully.`);
  } catch (error: any) {
    console.error('DELETE /api/blog/categories error:', error);
    return errorResponse(error?.message || 'Failed to delete blog category.', 400);
  }
}
