import { NextRequest, NextResponse } from 'next/server';
import { portfolioService } from '@/backend/services/portfolio';
import { successResponse, errorResponse } from '@/backend/utils/apiResponse';

export const dynamic = 'force-dynamic';

/**
 * GET /api/portfolio
 * Query params: ?category=...&search=...
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;

    const items = await portfolioService.getAllProjects(category, search);
    return successResponse(items);
  } catch (error: any) {
    console.error('GET /api/portfolio error:', error);
    return errorResponse(error?.message || 'Failed to fetch portfolio projects', 500);
  }
}

/**
 * POST /api/portfolio
 * Creates a new portfolio project
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.title || !body.title.trim()) {
      return errorResponse('Project title is required.', 400);
    }

    const created = await portfolioService.createProject(body);
    return successResponse(created, 'Project created successfully.');
  } catch (error: any) {
    console.error('POST /api/portfolio error:', error);
    return errorResponse(error?.message || 'Failed to create portfolio project', 500);
  }
}

/**
 * PATCH /api/portfolio
 * Updates an existing project by ID
 */
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return errorResponse('Project ID is required for update.', 400);
    }

    const updated = await portfolioService.updateProject(id, data);
    if (!updated) {
      return errorResponse('Project not found.', 404);
    }

    return successResponse(updated, 'Project updated successfully.');
  } catch (error: any) {
    console.error('PATCH /api/portfolio error:', error);
    return errorResponse(error?.message || 'Failed to update portfolio project', 500);
  }
}

/**
 * DELETE /api/portfolio?id=...
 * Deletes project by ID
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return errorResponse('Project ID is required for deletion.', 400);
    }

    const success = await portfolioService.deleteProject(id);
    if (!success) {
      return errorResponse('Failed to delete project.', 500);
    }

    return successResponse({ deletedId: id }, 'Project deleted successfully.');
  } catch (error: any) {
    console.error('DELETE /api/portfolio error:', error);
    return errorResponse(error?.message || 'Failed to delete portfolio project', 500);
  }
}
