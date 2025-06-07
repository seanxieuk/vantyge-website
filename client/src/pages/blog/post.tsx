import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { Calendar, Clock, ArrowLeft, Share2, ArrowRight, User, BookOpen } from "lucide-react";
import type { BlogPost } from "@shared/schema";
import { getBlogHeroImage, getBlogThumbnail } from "../../components/blog-hero-image";

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
      <div className="bg-gray-50 rounded-2xl p-8">
        <h3 className="text-3xl font-bold vantyge-black mb-8 text-center">Continue Reading</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {relatedPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative">
                <img 
                  src={getBlogThumbnail(post.slug)} 
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="secondary" className="bg-white/90 text-black text-xs">
                    {post.category}
                  </Badge>
                  {post.featured === "true" && (
                    <Badge className="bg-lime-400 text-black text-xs">Featured</Badge>
                  )}
                </div>
              </div>
              
              <CardContent className="p-6">
                <h4 className="text-xl font-bold vantyge-black mb-3 line-clamp-2 leading-tight">
                  {post.title}
                </h4>
                <p className="vantyge-gray text-sm mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs vantyge-gray">
                    <Clock className="w-3 h-3 mr-1" />
                    {post.readTime}
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="ghost" size="sm" className="text-sm hover:bg-lime-50 group">
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link href="/blog">
            <Button variant="outline" size="lg" className="bg-white hover:bg-lime-50">
              View All Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  
  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: [`/api/blog/${slug}`],
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
            {/* Hero Image and Header */}
            <div className="relative">
              <div className="h-96 md:h-[500px] relative overflow-hidden">
                <img 
                  src={getBlogHeroImage(post.slug)}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                  <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="secondary" className="bg-white/90 text-black">{post.category}</Badge>
                      {post.featured === "true" && (
                        <Badge className="bg-lime-400 text-black">Featured</Badge>
                      )}
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                      {post.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Vantyge Team
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {post.readTime}
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Article
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Article Summary */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="bg-gradient-to-r from-lime-50 to-white rounded-2xl p-8 mb-12">
                <h2 className="text-2xl font-bold vantyge-black mb-4">Article Summary</h2>
                <p className="text-xl vantyge-gray leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center mt-6">
                  <div className="flex items-center gap-4 text-sm vantyge-gray">
                    <span>Share this article:</span>
                  </div>
                  <Button variant="outline" size="sm" className="bg-white hover:bg-lime-50">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            {/* Article Body */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                <div className="article-content max-w-none">
                  {post.content && post.content.split('\n').map((line, index) => {
                    const trimmedLine = line.trim();
                    
                    if (trimmedLine === '') {
                      return <div key={index} className="h-6" />;
                    }
                    
                    if (trimmedLine.startsWith('## ')) {
                      return (
                        <div key={index} className="mt-16 mb-8 first:mt-0">
                          <div className="border-l-4 border-lime-400 pl-6">
                            <h2 className="text-3xl md:text-4xl font-bold vantyge-black leading-tight">
                              {trimmedLine.replace('## ', '')}
                            </h2>
                          </div>
                        </div>
                      );
                    } else if (trimmedLine.startsWith('### ')) {
                      return (
                        <h3 key={index} className="text-2xl md:text-3xl font-bold vantyge-black mt-12 mb-6 leading-tight">
                          {trimmedLine.replace('### ', '')}
                        </h3>
                      );
                    } else if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
                      return (
                        <div key={index} className="bg-lime-50 rounded-xl p-6 my-8">
                          <h4 className="text-xl font-bold vantyge-black leading-tight">
                            {trimmedLine.replace(/\*\*/g, '')}
                          </h4>
                        </div>
                      );
                    } else if (trimmedLine.startsWith('- ')) {
                      return (
                        <div key={index} className="flex items-start mb-4">
                          <div className="w-2 h-2 rounded-full bg-lime-400 mt-3 mr-4 flex-shrink-0"></div>
                          <p className="vantyge-gray text-lg leading-relaxed">
                            {trimmedLine.replace('- ', '')}
                          </p>
                        </div>
                      );
                    } else {
                      const formattedText = trimmedLine.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold vantyge-black bg-lime-100 px-1 rounded">$1</strong>');
                      return (
                        <p key={index} className="vantyge-gray mb-8 leading-relaxed text-lg md:text-xl" 
                           style={{ lineHeight: '1.8' }}
                           dangerouslySetInnerHTML={{ __html: formattedText }} />
                      );
                    }
                  })}
                </div>
                
                {/* Article End CTA */}
                <div className="mt-16 pt-12 border-t border-gray-200">
                  <div className="bg-gradient-to-r from-lime-400 to-green-400 rounded-2xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-black mb-4">
                      Ready to Transform Your LinkedIn Strategy?
                    </h3>
                    <p className="text-black/80 mb-6 text-lg">
                      See how Vantyge can help your executives become thought leaders with AI-powered content creation.
                    </p>
                    <Button size="lg" className="bg-black text-white hover:bg-gray-800 font-bold">
                      Get Demo
                    </Button>
                  </div>
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