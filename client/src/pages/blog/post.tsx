import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ArrowLeft, Share2, ArrowRight } from "lucide-react";
import type { BlogPost } from "@shared/schema";

function BlogContent({ content }: { content: string }) {
  if (!content) return null;

  const formatContent = (text: string) => {
    const lines = text.split('\n');
    let inList = false;
    const elements: JSX.Element[] = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine === '') {
        if (inList) {
          inList = false;
        }
        elements.push(<div key={index} className="h-4" />);
        return;
      }

      if (trimmedLine.startsWith('## ')) {
        if (inList) inList = false;
        elements.push(
          <h2 key={index} className="text-3xl font-bold vantyge-black mt-12 mb-6 leading-tight">
            {trimmedLine.replace('## ', '')}
          </h2>
        );
      } else if (trimmedLine.startsWith('### ')) {
        if (inList) inList = false;
        elements.push(
          <h3 key={index} className="text-2xl font-bold vantyge-black mt-10 mb-4 leading-tight">
            {trimmedLine.replace('### ', '')}
          </h3>
        );
      } else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
        if (inList) inList = false;
        elements.push(
          <h4 key={index} className="text-xl font-bold vantyge-black mt-8 mb-4">
            {trimmedLine.replace(/\*\*/g, '')}
          </h4>
        );
      } else if (trimmedLine.startsWith('- ')) {
        if (!inList) {
          inList = true;
        }
        elements.push(
          <li key={index} className="vantyge-gray mb-2 ml-6 list-disc leading-relaxed">
            {trimmedLine.replace('- ', '')}
          </li>
        );
      } else {
        if (inList) inList = false;
        // Handle bold text within paragraphs
        const formattedText = trimmedLine.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold vantyge-black">$1</strong>');
        elements.push(
          <p key={index} className="vantyge-gray mb-6 leading-relaxed text-lg" 
             dangerouslySetInnerHTML={{ __html: formattedText }} />
        );
      }
    });

    return elements;
  };

  return <div className="article-content">{formatContent(content)}</div>;
}

function RelatedArticles({ currentSlug }: { currentSlug: string }) {
  const { data: allPosts } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  const relatedPosts = allPosts?.filter(post => post.slug !== currentSlug).slice(0, 2) || [];

  if (relatedPosts.length === 0) return null;

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-16">
      <h3 className="text-2xl font-bold vantyge-black mb-8">Related Articles</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {relatedPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                {post.featured === "true" && (
                  <Badge className="bg-lime-400 text-black text-xs">Featured</Badge>
                )}
              </div>
              <h4 className="text-lg font-bold vantyge-black mb-3">
                {post.title}
              </h4>
              <p className="vantyge-gray text-sm mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs vantyge-gray">
                  <Clock className="w-3 h-3 mr-1" />
                  {post.readTime}
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <Button variant="ghost" size="sm" className="text-xs p-0">
                    Read More
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  
  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ['/api/blog', slug],
    enabled: !!slug,
  });
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold vantyge-black">Vantyge Social</Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="vantyge-gray hover:text-black transition-colors">Home</Link>
              <Link href="/blog" className="vantyge-gray hover:text-black transition-colors">Blog</Link>
              <Button className="bg-lime-400 text-black hover:bg-lime-300 font-bold">
                Get Demo
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Article Content */}
      <article className="pt-24">
        {/* Back to Blog */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link href="/blog" className="inline-flex items-center vantyge-gray hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>

        {isLoading && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-lime-400"></div>
            <p className="mt-4 vantyge-gray">Loading article...</p>
          </div>
        )}

        {error && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
            <h1 className="text-3xl font-bold vantyge-black mb-4">Article Not Found</h1>
            <p className="vantyge-gray mb-8">The article you're looking for doesn't exist or has been moved.</p>
            <Link href="/blog">
              <Button className="bg-lime-400 text-black hover:bg-lime-300 font-bold">
                Back to Blog
              </Button>
            </Link>
          </div>
        )}

        {post && (
          <>
            {/* Article Header */}
            <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
              <Badge variant="secondary" className="mb-4">{post.category}</Badge>
              {post.featured === "true" && (
                <Badge className="bg-lime-400 text-black mb-4 ml-2">Featured</Badge>
              )}
              <h1 className="text-4xl md:text-5xl font-bold vantyge-black mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex items-center justify-between mb-8 text-vantyge-gray">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {post.readTime}
                  </div>
                  <span>By Vantyge Team</span>
                </div>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </header>

            {/* Article Body */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="prose prose-lg max-w-none">
                <div className="article-content">
                  {post.content && post.content.split('\n').map((line, index) => {
                    const trimmedLine = line.trim();
                    
                    if (trimmedLine === '') {
                      return <div key={index} className="h-4" />;
                    }
                    
                    if (trimmedLine.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-3xl font-bold vantyge-black mt-12 mb-6 leading-tight">
                          {trimmedLine.replace('## ', '')}
                        </h2>
                      );
                    } else if (trimmedLine.startsWith('### ')) {
                      return (
                        <h3 key={index} className="text-2xl font-bold vantyge-black mt-10 mb-4 leading-tight">
                          {trimmedLine.replace('### ', '')}
                        </h3>
                      );
                    } else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
                      return (
                        <h4 key={index} className="text-xl font-bold vantyge-black mt-8 mb-4">
                          {trimmedLine.replace(/\*\*/g, '')}
                        </h4>
                      );
                    } else if (trimmedLine.startsWith('- ')) {
                      return (
                        <li key={index} className="vantyge-gray mb-2 ml-6 list-disc leading-relaxed">
                          {trimmedLine.replace('- ', '')}
                        </li>
                      );
                    } else {
                      const formattedText = trimmedLine.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold vantyge-black">$1</strong>');
                      return (
                        <p key={index} className="vantyge-gray mb-6 leading-relaxed text-lg" 
                           dangerouslySetInnerHTML={{ __html: formattedText }} />
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Related Articles */}
        {post && (
          <RelatedArticles currentSlug={post.slug} />
        )}
      </article>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold vantyge-black mb-4">Vantyge Social</div>
            <p className="vantyge-gray mb-4">
              Transform your team into LinkedIn thought leaders with AI-powered content creation.
            </p>
            <p className="vantyge-gray text-sm">© 2024 Vantyge Social. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}