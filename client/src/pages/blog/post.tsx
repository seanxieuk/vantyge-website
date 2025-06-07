import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import type { BlogPost } from "@shared/schema";

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
              <div className="prose prose-lg max-w-none prose-headings:vantyge-black prose-p:vantyge-gray prose-strong:vantyge-black prose-ul:vantyge-gray prose-ol:vantyge-gray">
                <div style={{ whiteSpace: 'pre-wrap' }} className="vantyge-gray leading-relaxed">
                  {post.content.split('\n').map((paragraph, index) => {
                    if (paragraph.startsWith('## ')) {
                      return <h2 key={index} className="text-2xl font-bold vantyge-black mt-8 mb-4">{paragraph.replace('## ', '')}</h2>
                    } else if (paragraph.startsWith('### ')) {
                      return <h3 key={index} className="text-xl font-bold vantyge-black mt-6 mb-3">{paragraph.replace('### ', '')}</h3>
                    } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return <p key={index} className="font-bold vantyge-black mt-4 mb-2">{paragraph.replace(/\*\*/g, '')}</p>
                    } else if (paragraph.startsWith('- ')) {
                      return <li key={index} className="ml-4 mb-1">{paragraph.replace('- ', '')}</li>
                    } else if (paragraph.trim() === '') {
                      return <br key={index} />
                    } else {
                      return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>
                    }
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Related Articles */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-16">
          <h3 className="text-2xl font-bold vantyge-black mb-8">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-3">Coming Soon</Badge>
                <h4 className="text-lg font-bold vantyge-black mb-3">
                  LinkedIn Content Strategy Guide
                </h4>
                <p className="vantyge-gray text-sm">
                  Complete guide to building an effective LinkedIn content strategy for B2B teams.
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Badge variant="secondary" className="mb-3">Coming Soon</Badge>
                <h4 className="text-lg font-bold vantyge-black mb-3">
                  AI Writing Best Practices
                </h4>
                <p className="vantyge-gray text-sm">
                  Learn how to leverage AI tools while maintaining authentic voice and quality.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
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