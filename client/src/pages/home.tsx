import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
              <Button 
                onClick={() => setIsContactOpen(true)}
                className="bg-vantyge-primary text-black hover:bg-vantyge-primary-dark"
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
              <Button 
                onClick={() => {
                  setIsContactOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full bg-vantyge-primary text-black hover:bg-vantyge-primary-dark"
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
              <span className="text-highlight text-white">LinkedIn AI Agents</span> for<br />
              <span className="text-highlight-accent text-white">High-Growth B2B</span> Startups
            </h1>
            
            <p className="text-xl md:text-3xl text-gray-300 max-w-5xl mx-auto mb-12 leading-relaxed">
              <span className="text-highlight text-gray-300">Vantyge Social</span> plans, writes, and schedules LinkedIn posts for your entire company. 
              Empower every team member to share <span className="text-highlight-accent text-gray-300">high-quality, authentic content</span> — and turn your whole company into <span className="text-highlight text-gray-300">LinkedIn thought leaders</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button 
                size="lg"
                onClick={() => setIsContactOpen(true)}
                className="bg-vantyge-primary text-black px-10 py-6 text-xl font-bold hover:bg-vantyge-primary-dark transform hover:scale-105 transition-all shadow-2xl"
              >
                Start Free Trial
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => setIsContactOpen(true)}
                className="border-4 border-vantyge-primary bg-vantyge-primary/10 text-vantyge-primary px-10 py-6 text-xl font-bold hover:bg-vantyge-primary hover:text-black transition-all shadow-xl"
              >
                Watch Demo
              </Button>
            </div>
            
            <div className="mt-12">
              <p className="text-gray-400 text-sm mb-4">Trusted by high-growth B2B teams</p>
              <div className="flex justify-center items-center space-x-8 opacity-60 text-white font-semibold">
                <div>StartupCo</div>
                <div>TechFlow</div>
                <div>SalesForce+</div>
                <div>GrowthLab</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-32 bg-vantyge-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold vantyge-black mb-10 leading-tight">
            <span className="text-highlight">Don't Have Time</span> to Write on LinkedIn?
          </h2>
          <p className="text-2xl md:text-3xl vantyge-gray mb-12 leading-relaxed">
            You're not alone — and you <span className="text-highlight-accent">don't have to do it yourself</span>.
          </p>
          <p className="text-xl md:text-2xl vantyge-gray max-w-5xl mx-auto leading-relaxed">
            If you're in B2B, <span className="text-highlight">LinkedIn is your most powerful growth channel</span>. But building traction takes time, consistency, and a personal voice. <span className="text-highlight-accent">Vantyge Social</span> takes the heavy lifting off your plate so your team can shine without stress.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold vantyge-black mb-8 leading-tight">
              <span className="text-highlight">Vantyge Social</span> Helps You:
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <Card className="text-center p-12 hover:shadow-2xl transition-all transform hover:scale-105">
              <CardContent className="pt-8">
                <div className="w-20 h-20 bg-vantyge-primary rounded-full flex items-center justify-center mx-auto mb-8">
                  <Users className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-bold vantyge-black mb-6">Find your <span className="text-highlight">team's voice</span></h3>
                <p className="vantyge-gray text-lg leading-relaxed">Discover and amplify each team member's unique perspective and expertise</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-12 hover:shadow-2xl transition-all transform hover:scale-105">
              <CardContent className="pt-8">
                <div className="w-20 h-20 bg-vantyge-accent rounded-full flex items-center justify-center mx-auto mb-8">
                  <Edit3 className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-bold vantyge-black mb-6">Express ideas <span className="text-highlight-accent">clearly and engagingly</span></h3>
                <p className="vantyge-gray text-lg leading-relaxed">Transform complex thoughts into compelling LinkedIn content that resonates</p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-12 hover:shadow-2xl transition-all transform hover:scale-105">
              <CardContent className="pt-8">
                <div className="w-20 h-20 bg-vantyge-primary rounded-full flex items-center justify-center mx-auto mb-8">
                  <Target className="w-10 h-10 text-black" />
                </div>
                <h3 className="text-2xl font-bold vantyge-black mb-6">Share <span className="text-highlight">authentic content</span> with your target audience</h3>
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
            <h2 className="text-4xl md:text-6xl font-bold vantyge-black mb-8 leading-tight">
              The <span className="text-highlight">10/80/10</span> Workflow
            </h2>
            <p className="text-xl md:text-2xl vantyge-gray max-w-4xl mx-auto leading-relaxed">
              Start with a <span className="text-highlight">seed (10%)</span>, let AI draft <span className="text-highlight-accent">(80%)</span>, finish with <span className="text-highlight">review (10%)</span>. Fast, scalable content that sounds genuinely human.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <Card className="workflow-step bg-white p-12 shadow-lg">
              <CardContent className="pt-8">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-vantyge-primary text-black rounded-full flex items-center justify-center font-bold text-xl mr-6">
                    10%
                  </div>
                  <h3 className="text-2xl font-bold vantyge-black">Seed Your <span className="text-highlight">Ideas</span></h3>
                </div>
                <p className="vantyge-gray mb-8 text-lg leading-relaxed">
                  Share a brief thought, insight, or topic. Just a few sentences to get started.
                </p>
                <div className="bg-vantyge-light p-6 rounded-lg text-lg vantyge-gray italic border-l-4 border-vantyge-primary">
                  "Just finished reading about the impact of AI on B2B sales cycles..."
                </div>
              </CardContent>
            </Card>
            
            <Card className="workflow-step bg-white p-12 shadow-lg">
              <CardContent className="pt-8">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-vantyge-accent text-black rounded-full flex items-center justify-center font-bold text-xl mr-6">
                    80%
                  </div>
                  <h3 className="text-2xl font-bold vantyge-black">AI <span className="text-highlight-accent">Crafts Content</span></h3>
                </div>
                <p className="vantyge-gray mb-8 text-lg leading-relaxed">
                  Our AI expands your idea into engaging, authentic LinkedIn content that matches your voice.
                </p>
                <div className="bg-vantyge-light p-6 rounded-lg border-l-4 border-vantyge-accent">
                  <div className="flex items-center vantyge-success mb-2">
                    <CheckCircle className="w-5 h-5 mr-3" />
                    <span className="text-lg font-medium">Draft generated in seconds</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="workflow-step bg-white p-12 shadow-lg">
              <CardContent className="pt-8">
                <div className="flex items-center mb-8">
                  <div className="w-16 h-16 bg-vantyge-primary text-black rounded-full flex items-center justify-center font-bold text-xl mr-6">
                    10%
                  </div>
                  <h3 className="text-2xl font-bold vantyge-black">Review & <span className="text-highlight">Publish</span></h3>
                </div>
                <p className="vantyge-gray mb-8 text-lg leading-relaxed">
                  Quick review, light edits if needed, then schedule or publish directly to LinkedIn.
                </p>
                <div className="bg-vantyge-light p-6 rounded-lg border-l-4 border-vantyge-primary">
                  <div className="flex items-center text-vantyge-primary mb-2">
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
            <h2 className="text-4xl md:text-6xl font-bold vantyge-black mb-8 leading-tight">
              Let AI Handle <span className="text-highlight">80%</span> — You Focus on the <span className="text-highlight-accent">20% That Matters</span>
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
              <div key={index} className="flex items-start space-x-6 p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-vantyge-primary rounded-full flex items-center justify-center flex-shrink-0 mt-2">
                  <CheckCircle className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-xl font-bold vantyge-black mb-4 leading-tight">
                    {index === 0 && <span>Post <span className="text-highlight">consistently</span> and grow your following</span>}
                    {index === 1 && <span>Turn employees into <span className="text-highlight-accent">trusted industry voices</span></span>}
                    {index === 2 && <span>Attract your <span className="text-highlight">ideal customers</span></span>}
                    {index === 3 && <span>Build <span className="text-highlight-accent">engagement and brand trust</span></span>}
                    {index === 4 && <span>Generate <span className="text-highlight">inbound leads</span> — without extra workload</span>}
                    {index === 5 && <span>Start turning your team into <span className="text-highlight-accent">LinkedIn powerhouses</span></span>}
                  </h3>
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
            <h2 className="text-4xl md:text-6xl font-bold vantyge-black mb-8 leading-tight">
              <span className="text-highlight">What You Get</span>
            </h2>
            <p className="text-xl md:text-2xl vantyge-gray leading-relaxed">
              Everything you need to transform your team into <span className="text-highlight-accent">LinkedIn thought leaders</span>
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              {[
                { icon: FileText, title: "Personalized LinkedIn Templates", desc: "Proven, high-engagement formats updated regularly to match current trends", color: "bg-vantyge-primary" },
                { icon: Shield, title: "Full Editorial Control", desc: "Every post can be reviewed or edited before publishing to maintain your brand voice", color: "bg-vantyge-accent" },
                { icon: BarChart3, title: "Insightful Metrics", desc: "See what's working and measure real marketing impact across your entire team", color: "bg-vantyge-primary" },
                { icon: Zap, title: "Autopilot Mode", desc: "Train the AI, then automate up to 95% of post creation — with team review still in control", color: "bg-vantyge-accent" }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-6 p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                  <div className={`w-16 h-16 ${feature.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <feature.icon className="w-8 h-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold vantyge-black mb-4 leading-tight">
                      {index === 0 && <span><span className="text-highlight">Personalized</span> LinkedIn Templates</span>}
                      {index === 1 && <span>Full <span className="text-highlight-accent">Editorial Control</span></span>}
                      {index === 2 && <span><span className="text-highlight">Insightful</span> Metrics</span>}
                      {index === 3 && <span><span className="text-highlight-accent">Autopilot</span> Mode</span>}
                    </h3>
                    <p className="vantyge-gray text-lg leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Card className="bg-white p-10 shadow-2xl border-2 border-vantyge-primary/20">
              <CardContent className="pt-8">
                <div className="border-2 border-gray-200 rounded-lg p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-vantyge-primary rounded-full flex items-center justify-center text-black font-bold text-xl">
                      JS
                    </div>
                    <div className="ml-4">
                      <div className="font-bold vantyge-black text-lg">John Smith</div>
                      <div className="text-base vantyge-gray">Head of Growth at TechCorp • 2h</div>
                    </div>
                  </div>
                  
                  <div className="vantyge-black mb-6 text-lg leading-relaxed">
                    Just wrapped up our Q4 planning session and I'm excited about the <span className="text-highlight">AI initiatives</span> we're rolling out.
                    <br /><br />
                    Here are 3 key insights I learned about implementing <span className="text-highlight-accent">AI in B2B operations</span>:
                    <br /><br />
                    1️⃣ Start small and iterate quickly<br />
                    2️⃣ Focus on user experience, not just efficiency<br />
                    3️⃣ Always keep the human element in the loop
                    <br /><br />
                    What's your experience with AI adoption? I'd love to hear your thoughts! 👇
                    <br /><br />
                    #AI #B2B #GrowthStrategy #TechLeadership
                  </div>
                  
                  <div className="flex items-center space-x-8 vantyge-gray text-base">
                    <span>24 likes</span>
                    <span>8 comments</span>
                    <span>3 shares</span>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Badge variant="secondary" className="bg-vantyge-primary/10 text-vantyge-primary border border-vantyge-primary/30 px-4 py-2 text-base">
                    <Bot className="w-5 h-5 mr-2" />
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
            <h2 className="text-4xl md:text-6xl font-bold vantyge-black mb-8 leading-tight">
              Built for <span className="text-highlight">Teams</span>, Not Just Creators
            </h2>
            <p className="text-xl md:text-2xl vantyge-gray max-w-5xl mx-auto leading-relaxed">
              <span className="text-highlight-accent">Vantyge Social</span> is designed for marketing teams managing content across multiple employees. One marketer can drive visibility for dozens of team members — <span className="text-highlight">no account chasing or manual effort required</span>.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Card className="bg-vantyge-light p-6">
              <CardContent className="pt-6">
                <h4 className="font-semibold vantyge-black mb-4">Team Dashboard</h4>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <Card className="bg-white p-4 text-center">
                    <div className="text-2xl font-bold vantyge-primary">127</div>
                    <div className="text-sm vantyge-gray">Posts Published</div>
                  </Card>
                  <Card className="bg-white p-4 text-center">
                    <div className="text-2xl font-bold vantyge-success">12</div>
                    <div className="text-sm vantyge-gray">Active Members</div>
                  </Card>
                  <Card className="bg-white p-4 text-center">
                    <div className="text-2xl font-bold vantyge-accent">89%</div>
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
                { step: "1", title: "Centralized Management", desc: "Manage all team members' LinkedIn content from one dashboard", color: "bg-vantyge-primary" },
                { step: "2", title: "Scale Effortlessly", desc: "One marketer can handle content for dozens of team members", color: "bg-vantyge-accent" },
                { step: "3", title: "Maintain Brand Consistency", desc: "Ensure all content aligns with your company's voice and values", color: "bg-vantyge-primary" }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`w-8 h-8 ${item.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <span className="text-black font-bold text-sm">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold vantyge-black mb-2">{item.title}</h3>
                    <p className="vantyge-gray">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Voice Section */}
      <section className="py-20 bg-vantyge-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold vantyge-black mb-6">
              AI That Writes Like You
            </h2>
            <p className="text-xl vantyge-gray max-w-4xl mx-auto">
              Our tuned AI captures each person's voice, making posts sound authentic and personal — never robotic. Your team's ideas, elevated.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="bg-white p-8 shadow-lg">
              <CardContent className="pt-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold vantyge-black mb-2">Before: Generic AI</h3>
                  <p className="vantyge-gray text-sm">Robotic, templated content</p>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <p className="text-gray-700 italic">
                    "Artificial Intelligence is transforming the business landscape. Companies that adopt AI early will gain competitive advantages. Here are 5 ways AI can benefit your organization: 1) Increased efficiency 2) Better analytics..."
                  </p>
                </div>
                
                <div className="mt-4 flex items-center text-red-600 text-sm">
                  <X className="w-4 h-4 mr-2" />
                  Sounds robotic and impersonal
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white p-8 shadow-lg">
              <CardContent className="pt-6">
                <div className="mb-6">
                  <h3 className="text-xl font-bold vantyge-black mb-2">After: Vantyge Social</h3>
                  <p className="vantyge-gray text-sm">Personal, authentic voice</p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <p className="text-gray-700">
                    "I've been skeptical about AI tools, but after 6 months of testing different platforms, I'm finally seeing real ROI. The key isn't replacing human creativity—it's amplifying it. Our team saves 10+ hours/week on content while actually improving quality. What's your experience? 🤔"
                  </p>
                </div>
                
                <div className="mt-4 flex items-center vantyge-success text-sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Authentic and engaging
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-vantyge-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Turn Your Team Into a Marketing Channel
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            In just weeks, Vantyge Social activates your employees on LinkedIn — boosting visibility, generating leads, and building real audience trust.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg"
              onClick={() => setIsContactOpen(true)}
              className="bg-vantyge-blue text-white px-8 py-4 text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all"
            >
              Start Free 14-Day Trial
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => setIsContactOpen(true)}
              className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-black transition-all"
            >
              Schedule Demo
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold vantyge-blue mb-2 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 mr-2" />
                10x
              </div>
              <div className="text-gray-300">Faster Content Creation</div>
            </div>
            <div>
              <div className="text-3xl font-bold vantyge-success mb-2 flex items-center justify-center">
                <Bot className="w-8 h-8 mr-2" />
                95%
              </div>
              <div className="text-gray-300">Automation Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2 flex items-center justify-center">
                <Clock className="w-8 h-8 mr-2" />
                2 weeks
              </div>
              <div className="text-gray-300">To See Results</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold vantyge-black mb-4">Vantyge Social</div>
              <p className="vantyge-gray mb-4 max-w-md">
                Transform your team into LinkedIn thought leaders with AI-powered content creation that sounds authentically human.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold vantyge-black mb-4">Product</h3>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('features')} className="vantyge-gray hover:text-black">Features</button></li>
                <li><button onClick={() => scrollToSection('workflow')} className="vantyge-gray hover:text-black">How It Works</button></li>
                <li><button onClick={() => scrollToSection('benefits')} className="vantyge-gray hover:text-black">Benefits</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold vantyge-black mb-4">Company</h3>
              <ul className="space-y-2">
                <li><button onClick={() => setIsContactOpen(true)} className="vantyge-gray hover:text-black">Contact</button></li>
                <li><button onClick={() => setIsContactOpen(true)} className="vantyge-gray hover:text-black">Demo</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="vantyge-gray text-sm">© 2024 Vantyge Social. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <button className="vantyge-gray hover:text-black text-sm">Privacy Policy</button>
              <button className="vantyge-gray hover:text-black text-sm">Terms of Service</button>
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
