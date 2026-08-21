import { NextRequest, NextResponse } from 'next/server';
import faqService from '@/backend/services/faq/faq.service';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pageType = searchParams.get('pageType') || 'PORTFOLIO_DETAIL';
    const pageId = searchParams.get('pageId') || undefined;
    const isDefaults = searchParams.get('defaults') === 'true';

    if (isDefaults) {
      const defaults = await faqService.getDefaultFAQs(pageType);
      return NextResponse.json({ success: true, faqs: defaults }, { status: 200 });
    }

    const faqs = await faqService.getFAQs({ pageType, pageId });
    return NextResponse.json({ success: true, faqs }, { status: 200 });
  } catch (err: any) {
    console.error('[API /api/faqs GET] Error:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to fetch FAQs' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pageType = 'PORTFOLIO_DETAIL', pageId = null, faqs = [] } = body;

    await faqService.savePageFAQs(pageType, pageId, faqs);
    return NextResponse.json({ success: true, message: 'FAQs updated successfully' }, { status: 200 });
  } catch (err: any) {
    console.error('[API /api/faqs POST] Error:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to save FAQs' },
      { status: 500 }
    );
  }
}
