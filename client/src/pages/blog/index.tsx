import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function BlogIndex() {
  const { data: posts, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
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
              <Link href="/blog" className="text-black font-medium">Blog</Link>
              <Button className="bg-lime-400 text-black hover:bg-lime-300 font-bold">
                Get Demo
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-vantyge-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold vantyge-black mb-6">
            Resources & Insights
          </h1>
          <p className="text-xl md:text-2xl vantyge-gray max-w-3xl mx-auto leading-relaxed">
            Expert insights, strategies, and tips for maximizing your LinkedIn presence with AI-powered content creation.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-lime-400"></div>
              <p className="mt-4 vantyge-gray">Loading blog posts...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="vantyge-gray">Unable to load blog posts. Please try again later.</p>
            </div>
          )}

          {posts && posts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card key={post.id} className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="text-xs">
                        {post.category}
                      </Badge>
                      {post.featured === "true" && (
                        <Badge className="bg-lime-400 text-black text-xs">Featured</Badge>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold vantyge-black mb-3">
                      {post.title}
                    </h3>
                    
                    <p className="vantyge-gray mb-4 flex-grow">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm vantyge-gray mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="ghost" className="w-full justify-between p-0 h-auto text-left">
                        Read Article
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {posts && posts.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold vantyge-black mb-4">No blog posts available</h2>
              <p className="vantyge-gray">Check back soon for new content!</p>
            </div>
          )}
        </div>
      </section>

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