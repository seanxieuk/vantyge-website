import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";

export default function BlogPost() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <a href="/" className="text-2xl font-bold vantyge-black">Vantyge Social</a>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="vantyge-gray hover:text-black transition-colors">Home</a>
              <a href="/blog" className="vantyge-gray hover:text-black transition-colors">Blog</a>
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
          <a href="/blog" className="inline-flex items-center vantyge-gray hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </a>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <Badge variant="secondary" className="mb-4">Coming Soon</Badge>
          <h1 className="text-4xl md:text-5xl font-bold vantyge-black mb-6 leading-tight">
            Blog Post Template
          </h1>
          
          <div className="flex items-center justify-between mb-8 text-vantyge-gray">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Coming Soon
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                5 min read
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
            <div className="bg-vantyge-light rounded-2xl p-12 text-center">
              <h2 className="text-3xl font-bold vantyge-black mb-6">
                Content Coming Soon
              </h2>
              <p className="text-xl vantyge-gray mb-8 max-w-2xl mx-auto leading-relaxed">
                We're working on creating valuable content about LinkedIn AI strategies, best practices, and industry insights. Check back soon for expert advice and actionable tips.
              </p>
              <Button className="bg-lime-400 text-black hover:bg-lime-300 font-bold">
                Get Notified About New Posts
              </Button>
            </div>
          </div>
        </div>

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