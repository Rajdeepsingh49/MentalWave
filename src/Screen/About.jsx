import React, { useState, useEffect } from 'react';
import { Brain, Shield, Zap, Heart, Sparkles, Globe2, Award, ChevronRight, TrendingUp } from 'lucide-react';

// Animated counter hook
const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    setHasAnimated(true);
    
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [end, duration, hasAnimated]);

  return count;
};

export default function About() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [expandedStep, setExpandedStep] = useState(null);

  const postsCount = useCounter(1200000, 2000);
  const accuracyCount = useCounter(85, 2000);
  const countriesCount = useCounter(50, 2000);

  const features = [
    {
      icon: Shield,
      title: "Privacy by Design",
      desc: "Zero personal data collection. All insights derived from aggregated, anonymized public data.",
      color: { from: '#10b981', to: '#14b8a6' },
      metric: "100% Anonymous"
    },
    {
      icon: Zap,
      title: "Real-Time Intelligence",
      desc: "Lightning-fast AI processes millions of posts per hour with sub-second latency.",
      color: { from: '#f59e0b', to: '#ef4444' },
      metric: "< 1s Response"
    },
    {
      icon: Heart,
      title: "Human-Centered AI",
      desc: "85% accuracy validated by mental health professionals and continuously improving.",
      color: { from: '#ec4899', to: '#f472b6' },
      metric: "85%+ Accuracy"
    },
    {
      icon: Globe2,
      title: "Global Reach",
      desc: "Multi-language support covering 50+ countries and diverse cultural contexts.",
      color: { from: '#3b82f6', to: '#8b5cf6' },
      metric: "50+ Countries"
    }
  ];

  const steps = [
    {
      num: 1,
      title: "Collect",
      desc: "Monitor public social media conversations about mental health topics",
      detail: "Our AI scans Twitter and Reddit 24/7, identifying posts related to mental health using advanced keyword detection and context analysis."
    },
    {
      num: 2,
      title: "Analyze",
      desc: "Advanced NLP models detect sentiment, emotion, and context",
      detail: "State-of-the-art transformer models analyze each post for sentiment polarity, emotional tone, and contextual nuances with 85%+ accuracy."
    },
    {
      num: 3,
      title: "Aggregate",
      desc: "Anonymize and compile data into meaningful patterns",
      detail: "All personal identifiers are stripped. Data is aggregated by region, sentiment, and keywords to reveal population-level trends."
    },
    {
      num: 4,
      title: "Visualize",
      desc: "Real-time dashboards reveal trends and geographic insights",
      detail: "Interactive charts and maps update in real-time, allowing researchers to spot emerging trends and allocate resources effectively."
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: '#000',
      color: '#fff',
      margin: '0',
      padding: '0',
      position: 'relative',
      left: '50%',
      right: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw',
      overflowX: 'hidden'
    }}>
      
      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        width: '100%',
        background: '#000'
      }}>
        {/* Animated background orbs */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', width: '100%' }}>
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.15), transparent)',
            filter: 'blur(60px)',
            animation: 'float 8s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '10%',
            right: '10%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236,72,153,0.15), transparent)',
            filter: 'blur(60px)',
            animation: 'float 10s ease-in-out infinite reverse'
          }} />
        </div>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', textAlign: 'center', width: '100%' }}>
          <div style={{
            display: 'inline-flex',
            padding: '16px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(236,72,153,0.2))',
            border: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '24px'
          }}>
            <Brain style={{ width: '48px', height: '48px', color: '#a78bfa' }} />
          </div>

          <h1 style={{
            fontSize: '64px',
            fontWeight: '900',
            lineHeight: '1.1',
            marginBottom: '24px'
          }}>
            Understanding<br />
            <span style={{
              background: 'linear-gradient(90deg, #a78bfa, #ec4899)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}>
              Mental Health
            </span><br />
            At Scale
          </h1>

          <p style={{
            fontSize: '20px',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '700px',
            margin: '0 auto 40px',
            lineHeight: '1.6'
          }}>
            AI-powered sentiment analysis that helps researchers and organizations understand global mental health trends in real-time.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              padding: '16px 32px',
              borderRadius: '12px',
              background: '#fff',
              color: '#000',
              fontSize: '16px',
              fontWeight: '700',
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              Get Started <ChevronRight style={{ width: '20px', height: '20px' }} />
            </button>
            <button style={{
              padding: '16px 32px',
              borderRadius: '12px',
              background: 'transparent',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
              border: '1px solid rgba(255,255,255,0.2)',
              cursor: 'pointer'
            }}>
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section style={{
        width: '100%',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(255,255,255,0.02)',
        padding: '60px 24px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          textAlign: 'center'
        }}>
          <div>
            <TrendingUp style={{ width: '32px', height: '32px', color: '#a78bfa', margin: '0 auto 16px' }} />
            <div style={{
              fontSize: '48px',
              fontWeight: '900',
              background: 'linear-gradient(90deg, #a78bfa, #ec4899)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '8px'
            }}>
              {postsCount > 0 ? postsCount.toLocaleString() + '+' : '1.2M+'}
            </div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Posts Analyzed Daily</div>
          </div>

          <div>
            <Award style={{ width: '32px', height: '32px', color: '#a78bfa', margin: '0 auto 16px' }} />
            <div style={{
              fontSize: '48px',
              fontWeight: '900',
              background: 'linear-gradient(90deg, #a78bfa, #ec4899)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '8px'
            }}>
              {accuracyCount > 0 ? accuracyCount + '%' : '85%'}
            </div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Accuracy Rate</div>
          </div>

          <div>
            <Globe2 style={{ width: '32px', height: '32px', color: '#a78bfa', margin: '0 auto 16px' }} />
            <div style={{
              fontSize: '48px',
              fontWeight: '900',
              background: 'linear-gradient(90deg, #a78bfa, #ec4899)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '8px'
            }}>
              {countriesCount > 0 ? countriesCount + '+' : '50+'}
            </div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Countries Covered</div>
          </div>

          <div>
            <Zap style={{ width: '32px', height: '32px', color: '#a78bfa', margin: '0 auto 16px' }} />
            <div style={{
              fontSize: '48px',
              fontWeight: '900',
              background: 'linear-gradient(90deg, #a78bfa, #ec4899)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '8px'
            }}>
              24/7
            </div>
            <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Real-Time Monitoring</div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section style={{ maxWidth: '1200px', margin: '100px auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '16px' }}>Built Different</h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)' }}>Privacy-first intelligence that actually works</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isHovered = hoveredCard === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  position: 'relative',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '24px',
                  padding: '32px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                  borderColor: isHovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)'
                }}
              >
                <div style={{
                  display: 'inline-flex',
                  padding: '12px',
                  borderRadius: '16px',
                  background: `linear-gradient(135deg, ${feature.color.from}, ${feature.color.to})`,
                  marginBottom: '20px',
                  transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
                  transition: 'transform 0.3s ease'
                }}>
                  <Icon style={{ width: '28px', height: '28px', color: '#fff' }} />
                </div>

                <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>{feature.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', marginBottom: '16px' }}>{feature.desc}</p>
                <div style={{
                  display: 'inline-block',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: feature.color.from
                }}>
                  {feature.metric}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ maxWidth: '900px', margin: '100px auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '16px' }}>How It Works</h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)' }}>Four steps to meaningful insights</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {steps.map((step, i) => (
            <div
              key={i}
              onClick={() => setExpandedStep(expandedStep === i ? null : i)}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(236,72,153,0.2))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: '900'
                }}>
                  {step.num}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '4px' }}>{step.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px' }}>{step.desc}</p>
                </div>
                <ChevronRight style={{
                  width: '24px',
                  height: '24px',
                  color: 'rgba(255,255,255,0.4)',
                  transform: expandedStep === i ? 'rotate(90deg)' : 'rotate(0)',
                  transition: 'transform 0.3s ease'
                }} />
              </div>
              {expandedStep === i && (
                <p style={{
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: '1.6',
                  fontSize: '14px'
                }}>
                  {step.detail}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{
        position: 'relative',
        width: '100%',
        background: 'linear-gradient(180deg, transparent, rgba(124,58,237,0.08))',
        padding: '100px 24px',
        textAlign: 'center'
      }}>
        <Sparkles style={{ width: '48px', height: '48px', color: '#a78bfa', margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '16px' }}>Ready to Make a Difference?</h2>
        <p style={{
          fontSize: '18px',
          color: 'rgba(255,255,255,0.7)',
          maxWidth: '600px',
          margin: '0 auto 40px'
        }}>
          Join leading researchers and organizations using MindSight to understand and improve mental health outcomes worldwide.
        </p>
      </section>

      {/* FOOTER */}
      <footer style={{
        width: '100%',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '32px 24px',
        textAlign: 'center',
        color: 'rgba(255,255,255,0.4)',
        fontSize: '14px',
        background: '#000'
      }}>
        MindSight © 2025 — Empowering mental health awareness through AI
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
      `}</style>
    </div>
  );
}
