import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  CheckCircle, 
  Users, 
  Edit3, 
  Target, 
  BarChart3, 
  Zap, 
  FileText, 
  Shield, 
  Menu,
  X,
  Bot,
  TrendingUp,
  Clock
} from "lucide-react";
import ContactForm from "@/components/contact-form";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Smooth scroll handler
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Add scroll-based animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, observerOptions);

    // Observe sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
      section.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <div className="text-2xl font-bold vantyge-black">Vantyge Social</div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('features')} 
                className="vantyge-gray hover:text-black transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('workflow')} 
                className="vantyge-gray hover:text-black transition-colors"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('benefits')} 
                className="vantyge-gray hover:text-black transition-colors"
              >
                Benefits
              </button>
              <div className="relative group">
                <button className="vantyge-gray hover:text-black transition-colors flex items-center">
                  Resources
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link href="/blog" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                      Blog Posts
                    </Link>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => setIsContactOpen(true)}
                className="bg-lime-400 text-black hover:bg-lime-300 font-bold"
              >
                Get Demo
              </Button>
            </div>
            
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-6 space-y-4">
              <button 
                onClick={() => scrollToSection('features')} 
                className="block w-full text-left vantyge-gray hover:text-black transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('workflow')} 
                className="block w-full text-left vantyge-gray hover:text-black transition-colors"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('benefits')} 
                className="block w-full text-left vantyge-gray hover:text-black transition-colors"
              >
                Benefits
              </button>
              <Link href="/blog" className="block w-full text-left vantyge-gray hover:text-black transition-colors">
                Resources
              </Link>
              <Button 
                onClick={() => {
                  setIsContactOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full bg-lime-400 text-black hover:bg-lime-300 font-bold"
              >
                Get Demo
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient pt-24 pb-32 lg:pt-40 lg:pb-48 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
              LinkedIn AI Agents for<br />
              <span className="text-lime-400">High-Growth B2B</span> Startups
            </h1>
            
            <p className="text-xl md:text-3xl text-gray-200 max-w-5xl mx-auto mb-12 leading-relaxed">
              Vantyge Social plans, writes, and schedules LinkedIn posts for your entire company. 
              Empower every team member to share high-quality, authentic content — and turn your whole company into LinkedIn thought leaders.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg"
                onClick={() => setIsContactOpen(true)}
                className="bg-lime-400 text-black px-10 py-6 text-xl font-bold hover:bg-lime-300 transform hover:scale-105 transition-all shadow-lg"
              >
                Get Demo
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => setIsContactOpen(true)}
                className="border-3 border-lime-400 text-lime-400 bg-transparent px-10 py-6 text-xl font-bold hover:bg-lime-400 hover:text-black transition-all shadow-lg"
              >
                Contact Sales
              </Button>
            </div>
            

          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-32 bg-vantyge-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold vantyge-black mb-10 leading-tight">
            Don't Have Time to Write on LinkedIn?
          </h2>
          <p className="text-2xl md:text-3xl vantyge-gray mb-12 font-medium">
            You're not alone — and you don't have to do it yourself.
          </p>
          <p className="text-xl md:text-2xl vantyge-gray max-w-5xl mx-auto leading-relaxed">
            If you're in B2B, LinkedIn is your most powerful growth channel. But building traction takes time, consistency, and a personal voice. Vantyge Social takes the heavy lifting off your plate so your team can shine without stress.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold vantyge-black mb-10 leading-tight">
              Vantyge Social Helps You:
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <Card className="text-center p-12 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="pt-8">
                <div className="w-20 h-20 bg-lime-400 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Users className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-bold vantyge-black mb-6">Find your team's voice</h3>
                <p className="vantyge-gray text-lg leading-relaxed">Discover and amplify each team member's unique perspective and expertise</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-12 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="pt-8">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Edit3 className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-bold vantyge-black mb-6">Express ideas clearly and engagingly</h3>
                <p className="vantyge-gray text-lg leading-relaxed">Transform complex thoughts into compelling LinkedIn content that resonates</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-12 hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="pt-8">
                <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Target className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-bold vantyge-black mb-6">Share authentic content with your target audience</h3>
                <p className="vantyge-gray text-lg leading-relaxed">Reach the right people with content that builds trust and drives engagement</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-32 bg-vantyge-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold vantyge-black mb-10 leading-tight">
              The 10/80/10 Workflow
            </h2>
            <p className="text-xl md:text-2xl vantyge-gray max-w-4xl mx-auto leading-relaxed">
              Start with a seed (10%), let AI draft (80%), finish with review (10%). Fast, scalable content that sounds genuinely human.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <Card className="workflow-step bg-white p-12 shadow-lg hover:shadow-2xl transition-all duration-300">
              <CardContent className="pt-8">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-lime-400 text-black rounded-full flex items-center justify-center font-bold text-xl mr-6">
                    10%
                  </div>
                  <h3 className="text-2xl font-bold vantyge-black">Seed Your Ideas</h3>
                </div>
                <p className="vantyge-gray mb-8 text-lg leading-relaxed">
                  Share a brief thought, insight, or topic. Just a few sentences to get started.
                </p>
                <div className="bg-vantyge-light p-6 rounded-lg text-lg vantyge-gray italic">
                  "Just finished reading about the impact of AI on B2B sales cycles..."
                </div>
              </CardContent>
            </Card>
            
            <Card className="workflow-step bg-white p-12 shadow-lg hover:shadow-2xl transition-all duration-300">
              <CardContent className="pt-8">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-xl mr-6">
                    80%
                  </div>
                  <h3 className="text-2xl font-bold vantyge-black">AI Crafts Content</h3>
                </div>
                <p className="vantyge-gray mb-8 text-lg leading-relaxed">
                  Our AI expands your idea into engaging, authentic LinkedIn content that matches your voice.
                </p>
                <div className="bg-vantyge-light p-6 rounded-lg">
                  <div className="flex items-center text-green-600 mb-2">
                    <CheckCircle className="w-5 h-5 mr-3" />
                    <span className="text-lg font-medium">Draft generated in seconds</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="workflow-step bg-white p-12 shadow-lg hover:shadow-2xl transition-all duration-300">
              <CardContent className="pt-8">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-green-400 text-black rounded-full flex items-center justify-center font-bold text-xl mr-6">
                    10%
                  </div>
                  <h3 className="text-2xl font-bold vantyge-black">Review & Publish</h3>
                </div>
                <p className="vantyge-gray mb-8 text-lg leading-relaxed">
                  Quick review, light edits if needed, then schedule or publish directly to LinkedIn.
                </p>
                <div className="bg-vantyge-light p-6 rounded-lg">
                  <div className="flex items-center text-lime-600 mb-2">
                    <CheckCircle className="w-5 h-5 mr-3" />
                    <span className="text-lg font-medium">Ready to publish</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold vantyge-black mb-10 leading-tight">
              Let AI Handle 80% — You Focus on the 20% That Matters
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              "Post consistently and grow your following",
              "Turn employees into trusted industry voices",
              "Attract your ideal customers",
              "Build engagement and brand trust",
              "Generate inbound leads — without extra workload",
              "Start turning your team into LinkedIn powerhouses"
            ].map((benefit, index) => (
              <div key={index} className="flex items-start space-x-6 p-6 hover:bg-gray-50 rounded-lg transition-all duration-300">
                <div className="w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center flex-shrink-0 mt-2">
                  <CheckCircle className="w-7 h-7 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold vantyge-black mb-4 leading-tight">{benefit}</h3>
                  <p className="vantyge-gray text-lg leading-relaxed">
                    {index === 0 && "Maintain regular presence without the daily grind"}
                    {index === 1 && "Build thought leadership across your entire team"}
                    {index === 2 && "Reach prospects through authentic, valuable content"}
                    {index === 3 && "Foster meaningful connections with your audience"}
                    {index === 4 && "Turn content into a lead generation machine"}
                    {index === 5 && "Less effort, more impact for every team member"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Deep Dive */}
      <section className="py-32 bg-vantyge-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold vantyge-black mb-10 leading-tight">
              What You Get
            </h2>
            <p className="text-xl md:text-2xl vantyge-gray">
              Everything you need to transform your team into LinkedIn thought leaders
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              {[
                { icon: FileText, title: "Personalized LinkedIn Templates", desc: "Proven, high-engagement formats updated regularly to match current trends", color: "bg-lime-400" },
                { icon: Shield, title: "Full Editorial Control", desc: "Every post can be reviewed or edited before publishing to maintain your brand voice", color: "bg-yellow-400" },
                { icon: BarChart3, title: "Insightful Metrics", desc: "See what's working and measure real marketing impact across your entire team", color: "bg-green-400" },
                { icon: Zap, title: "Autopilot Mode", desc: "Train the AI, then automate up to 95% of post creation — with team review still in control", color: "bg-orange-400" }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-6 p-6 hover:bg-white rounded-lg transition-all duration-300">
                  <div className={`w-16 h-16 ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <feature.icon className="w-8 h-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold vantyge-black mb-4">{feature.title}</h3>
                    <p className="vantyge-gray text-lg leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Card className="bg-white p-8 shadow-lg">
              <CardContent className="pt-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-vantyge-blue rounded-full flex items-center justify-center text-white font-bold">
                      JS
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold vantyge-black">John Smith</div>
                      <div className="text-sm vantyge-gray">Head of Growth at TechCorp • 2h</div>
                    </div>
                  </div>
                  
                  <div className="vantyge-black mb-4">
                    Just wrapped up our Q4 planning session and I'm excited about the AI initiatives we're rolling out.
                    <br /><br />
                    Here are 3 key insights I learned about implementing AI in B2B operations:
                    <br /><br />
                    1️⃣ Start small and iterate quickly<br />
                    2️⃣ Focus on user experience, not just efficiency<br />
                    3️⃣ Always keep the human element in the loop
                    <br /><br />
                    What's your experience with AI adoption? I'd love to hear your thoughts! 👇
                    <br /><br />
                    #AI #B2B #GrowthStrategy #TechLeadership
                  </div>
                  
                  <div className="flex items-center space-x-6 vantyge-gray text-sm">
                    <span>24 likes</span>
                    <span>8 comments</span>
                    <span>3 shares</span>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <Badge variant="secondary" className="vantyge-success">
                    <Bot className="w-4 h-4 mr-2" />
                    Generated by Vantyge Social AI
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Focus Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold vantyge-black mb-10 leading-tight">
              Built for Teams, Not Just Creators
            </h2>
            <p className="text-xl md:text-2xl vantyge-gray max-w-5xl mx-auto leading-relaxed">
              Vantyge Social is designed for marketing teams managing content across multiple employees. One marketer can drive visibility for dozens of team members — no account chasing or manual effort required.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Card className="bg-vantyge-light p-6">
              <CardContent className="pt-6">
                <h4 className="font-semibold vantyge-black mb-4">Team Dashboard</h4>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <Card className="bg-white p-4 text-center">
                    <div className="text-2xl font-bold vantyge-blue">127</div>
                    <div className="text-sm vantyge-gray">Posts Published</div>
                  </Card>
                  <Card className="bg-white p-4 text-center">
                    <div className="text-2xl font-bold vantyge-success">12</div>
                    <div className="text-sm vantyge-gray">Active Members</div>
                  </Card>
                  <Card className="bg-white p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">89%</div>
                    <div className="text-sm vantyge-gray">Engagement Rate</div>
                  </Card>
                </div>
                
                <div className="space-y-3">
                  {[
                    { name: "Sarah Chen - Sales", status: "Published", color: "bg-blue-500", statusColor: "vantyge-success bg-green-100" },
                    { name: "Mike Rodriguez - Engineering", status: "Review", color: "bg-purple-500", statusColor: "text-orange-600 bg-orange-100" },
                    { name: "Lisa Park - Marketing", status: "Drafting", color: "bg-green-500", statusColor: "text-gray-600 bg-gray-100" }
                  ].map((member, index) => (
                    <Card key={index} className="bg-white p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 ${member.color} rounded-full mr-3`}></div>
                          <span className="text-sm font-medium">{member.name}</span>
                        </div>
                        <Badge variant="secondary" className={`text-xs ${member.statusColor} px-2 py-1 rounded`}>
                          {member.status}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              {[
                { step: "1", title: "Centralized Management", desc: "Manage all team members' LinkedIn content from one dashboard", color: "bg-lime-400" },
                { step: "2", title: "Scale Effortlessly", desc: "One marketer can handle content for dozens of team members", color: "bg-yellow-400" },
                { step: "3", title: "Maintain Brand Consistency", desc: "Ensure all content aligns with your company's voice and values", color: "bg-green-400" }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-6 p-6">
                  <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-black font-bold text-lg">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold vantyge-black mb-4">{item.title}</h3>
                    <p className="vantyge-gray text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Voice Section */}
      <section className="py-32 bg-vantyge-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold vantyge-black mb-10 leading-tight">
              AI That Writes Like You
            </h2>
            <p className="text-xl md:text-2xl vantyge-gray max-w-5xl mx-auto leading-relaxed">
              Our tuned AI captures each person's voice, making posts sound authentic and personal — never robotic. Your team's ideas, elevated.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16">
            <Card className="bg-white p-12 shadow-lg">
              <CardContent className="pt-8">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold vantyge-black mb-4">Before: Generic AI</h3>
                  <p className="vantyge-gray text-lg">Robotic, templated content</p>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                  <p className="text-gray-700 italic text-lg leading-relaxed">
                    "Artificial Intelligence is transforming the business landscape. Companies that adopt AI early will gain competitive advantages. Here are 5 ways AI can benefit your organization: 1) Increased efficiency 2) Better analytics..."
                  </p>
                </div>
                
                <div className="mt-6 flex items-center text-red-600 text-lg">
                  <X className="w-5 h-5 mr-3" />
                  Sounds robotic and impersonal
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white p-12 shadow-lg">
              <CardContent className="pt-8">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold vantyge-black mb-4">After: Vantyge Social</h3>
                  <p className="vantyge-gray text-lg">Personal, authentic voice</p>
                </div>
                
                <div className="bg-lime-50 border border-lime-300 rounded-lg p-8">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    "I've been skeptical about AI tools, but after 6 months of testing different platforms, I'm finally seeing real ROI. The key isn't replacing human creativity—it's amplifying it. Our team saves 10+ hours/week on content while actually improving quality. What's your experience? 🤔"
                  </p>
                </div>
                
                <div className="mt-6 flex items-center text-lime-600 text-lg">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  Authentic and engaging
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-40 bg-vantyge-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-7xl font-bold text-white mb-12 leading-tight">
            Turn Your Team Into a Marketing Channel
          </h2>
          <p className="text-xl md:text-3xl text-gray-200 mb-16 max-w-5xl mx-auto leading-relaxed">
            In just weeks, Vantyge Social activates your employees on LinkedIn — boosting visibility, generating leads, and building real audience trust.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20">
            <Button 
              size="lg"
              onClick={() => setIsContactOpen(true)}
              className="bg-lime-400 text-black px-12 py-6 text-xl font-bold hover:bg-lime-300 transform hover:scale-105 transition-all shadow-lg"
            >
              Get Demo
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => setIsContactOpen(true)}
              className="border-3 border-lime-400 text-lime-400 bg-transparent px-12 py-6 text-xl font-bold hover:bg-lime-400 hover:text-black transition-all shadow-lg"
            >
              Contact Sales
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16 text-center">
            <div>
              <div className="text-5xl font-bold text-lime-400 mb-6 flex items-center justify-center">
                <TrendingUp className="w-12 h-12 mr-4" />
                10x
              </div>
              <div className="text-gray-200 text-xl">Faster Content Creation</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-6 flex items-center justify-center">
                <Bot className="w-12 h-12 mr-4" />
                95%
              </div>
              <div className="text-gray-200 text-xl">Automation Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-400 mb-6 flex items-center justify-center">
                <Clock className="w-12 h-12 mr-4" />
                2 weeks
              </div>
              <div className="text-gray-200 text-xl">To See Results</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="text-3xl font-bold vantyge-black mb-6">Vantyge Social</div>
              <p className="vantyge-gray mb-6 max-w-md text-lg leading-relaxed">
                Transform your team into LinkedIn thought leaders with AI-powered content creation that sounds authentically human.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold vantyge-black mb-6">Product</h3>
              <ul className="space-y-4">
                <li><button onClick={() => scrollToSection('features')} className="vantyge-gray hover:text-black text-lg transition-colors">Features</button></li>
                <li><button onClick={() => scrollToSection('workflow')} className="vantyge-gray hover:text-black text-lg transition-colors">How It Works</button></li>
                <li><button onClick={() => scrollToSection('benefits')} className="vantyge-gray hover:text-black text-lg transition-colors">Benefits</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold vantyge-black mb-6">Company</h3>
              <ul className="space-y-4">
                <li><button onClick={() => setIsContactOpen(true)} className="vantyge-gray hover:text-black text-lg transition-colors">Contact</button></li>
                <li><button onClick={() => setIsContactOpen(true)} className="vantyge-gray hover:text-black text-lg transition-colors">Demo</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-12 pt-12 flex flex-col md:flex-row justify-between items-center">
            <p className="vantyge-gray text-lg">© 2024 Vantyge Social. All rights reserved.</p>
            <div className="flex space-x-8 mt-6 md:mt-0">
              <button className="vantyge-gray hover:text-black text-lg transition-colors">Privacy Policy</button>
              <button className="vantyge-gray hover:text-black text-lg transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      <ContactForm 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </div>
  );
}
