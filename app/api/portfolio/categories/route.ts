import { NextRequest, NextResponse } from 'next/server';
import { portfolioCategoryService } from '@/backend/services/portfolio';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';
import { requireSuperadmin } from '@/backend/utils/authGuard';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * GET /api/portfolio/categories
 * Returns all active portfolio categories with live project counts and ETags.
 */
export async function GET(req: NextRequest) {
  try {
    const clientEtag = req.headers.get('if-none-match');
    const categories = await portfolioCategoryService.getAllCategories();
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
    console.error('GET /api/portfolio/categories error:', error);
    return errorResponse('Failed to retrieve categories.', 500);
  }
}

/**
 * POST /api/portfolio/categories
 * Creates a new dynamic portfolio category (Requires Superadmin)
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

    const created = await portfolioCategoryService.createCategory(name.trim());
    return successResponse(created, `Category "${created.name}" created successfully.`, 201);
  } catch (error: any) {
    console.error('POST /api/portfolio/categories error:', error);
    return errorResponse(error?.message || 'Failed to create category.', 400);
  }
}

/**
 * DELETE /api/portfolio/categories?id=... (or ?name=...)
 * Deletes a category by ID or Name (Requires Superadmin)
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

    const result = await portfolioCategoryService.deleteCategory(id.trim());
    return successResponse(result, `Category "${result.deletedName}" deleted successfully.`);
  } catch (error: any) {
    console.error('DELETE /api/portfolio/categories error:', error);
    return errorResponse(error?.message || 'Failed to delete category.', 400);
  }
}
