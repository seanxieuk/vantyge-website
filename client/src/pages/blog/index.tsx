import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function BlogIndex() {
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

      {/* Coming Soon Section */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-vantyge-light rounded-2xl p-16">
            <h2 className="text-3xl md:text-4xl font-bold vantyge-black mb-6">
              Blog Coming Soon
            </h2>
            <p className="text-xl vantyge-gray mb-8 max-w-2xl mx-auto leading-relaxed">
              We're preparing valuable content about LinkedIn AI strategies, content creation best practices, and industry insights. Stay tuned for expert tips and actionable advice.
            </p>
            <Button className="bg-lime-400 text-black hover:bg-lime-300 font-bold px-8 py-4 text-lg">
              Get Notified When We Launch
            </Button>
          </div>
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