// Blog hero images component with relevant stock images for each post
export function getBlogHeroImage(slug: string): string {
  const imageMap: Record<string, string> = {
    'consistent-linkedin-posting-b2b-growth': 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=600&fit=crop&crop=center',
    'agentic-ai-executive-thought-leadership': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop&crop=center',
    'linkedin-strategy-kpis-metrics': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop&crop=center',
    'evolution-b2b-content-production': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop&crop=center',
    'building-executive-voice-linkedin-framework': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=600&fit=crop&crop=center'
  };
  
  return imageMap[slug] || 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=600&fit=crop&crop=center';
}

export function getBlogThumbnail(slug: string): string {
  const imageMap: Record<string, string> = {
    'consistent-linkedin-posting-b2b-growth': 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop&crop=center',
    'agentic-ai-executive-thought-leadership': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center',
    'linkedin-strategy-kpis-metrics': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center',
    'evolution-b2b-content-production': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&crop=center',
    'building-executive-voice-linkedin-framework': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop&crop=center'
  };
  
  return imageMap[slug] || 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop&crop=center';
}