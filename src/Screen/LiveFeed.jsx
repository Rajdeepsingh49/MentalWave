import React, { useState, useEffect, useMemo } from 'react';
import {
  Play,
  Pause,
  RefreshCw,
  Search,
  Clock,
  MapPin,
  TrendingUp,
  AlertCircle,
  Flame,
  X,
  ExternalLink,
  Hash,
} from 'lucide-react';

// ============================================================================
// MOCK DATA GENERATOR
// ============================================================================

const PLATFORMS = ['Twitter', 'Reddit'];
const SENTIMENTS = ['positive', 'negative', 'neutral'];
const REGIONS = ['United States', 'United Kingdom', 'Canada', 'Australia', 'India', 'Germany', 'Japan', 'Brazil'];

const SAMPLE_TEXTS = [
  "Finally feeling better after weeks of struggle. Small wins matter.",
  "Anyone else dealing with constant worry? Need some advice.",
  "Therapy session today was really helpful. Progress feels good.",
  "Struggling to sleep lately. Anxiety keeps me up at night.",
  "Grateful for the support system I have. Things are looking up.",
  "Having a rough day. Just need to vent for a moment.",
  "Meditation has been a game changer for my mental health.",
  "Feeling overwhelmed with work stress. Need better coping strategies.",
  "Started journaling daily. It's helping me process emotions better.",
  "Sometimes it's okay to not be okay. Being gentle with myself today.",
];

const generatePost = () => {
  const id = `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const text = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
  const sentiment = SENTIMENTS[Math.floor(Math.random() * SENTIMENTS.length)];
  const platform = PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)];
  const region = REGIONS[Math.floor(Math.random() * REGIONS.length)];
  const confidence = Math.floor(75 + Math.random() * 25);
  const engagement = Math.floor(Math.random() * 100);
  const timestamp = Date.now() - Math.floor(Math.random() * 3600000);
  
  return { id, text, sentiment, platform, region, confidence, engagement, timestamp };
};

// ============================================================================
// SENTIMENT BADGE
// ============================================================================

const SentimentBadge = ({ sentiment }) => {
  const config = {
    positive: { bg: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', dot: '#10b981' },
    negative: { bg: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', dot: '#ef4444' },
    neutral: { bg: 'rgba(148,163,184,0.1)', border: '1px solid rgba(148,163,184,0.3)', color: '#94a3b8', dot: '#64748b' },
  }[sentiment];

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 10px',
      borderRadius: '999px',
      background: config.bg,
      border: config.border,
      fontSize: '11px',
      fontWeight: '700',
      color: config.color,
      textTransform: 'capitalize'
    }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: config.dot, animation: 'pulse 2s infinite' }} />
      {sentiment}
    </div>
  );
};

// ============================================================================
// POST CARD
// ============================================================================

const PostCard = ({ post, searchTerm, onClick }) => {
  const formatTime = (timestamp) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  const highlightText = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, i) => 
      regex.test(part) ? (
        <mark key={i} style={{ background: '#facc15', color: '#000', padding: '2px 4px', borderRadius: '3px', fontWeight: '600' }}>{part}</mark>
      ) : part
    );
  };

  return (
    <article
      onClick={onClick}
      style={{
        position: 'relative',
        background: 'rgba(15,20,25,0.6)',
        backdropFilter: 'blur(12px)',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.06)',
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        animation: 'fadeIn 0.4s ease-out'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: '700',
            background: post.platform === 'Twitter' ? 'rgba(59,130,246,0.15)' : 'rgba(251,146,60,0.15)',
            color: post.platform === 'Twitter' ? '#3b82f6' : '#fb923c',
            border: post.platform === 'Twitter' ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(251,146,60,0.3)'
          }}>
            {post.platform === 'Twitter' ? 'T' : 'R'}
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff', marginBottom: '2px' }}>{post.platform}</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock style={{ width: '12px', height: '12px' }} />
              {formatTime(post.timestamp)}
            </div>
          </div>
        </div>
        <SentimentBadge sentiment={post.sentiment} />
      </div>

      {/* Content */}
      <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: '1.6', marginBottom: '16px', fontSize: '15px' }}>
        {highlightText(post.text)}
      </p>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin style={{ width: '14px', height: '14px' }} />
            {post.region}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp style={{ width: '14px', height: '14px' }} />
            {post.confidence}% confident
          </span>
        </div>
        {post.engagement > 70 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontSize: '12px', fontWeight: '600' }}>
            <Flame style={{ width: '14px', height: '14px' }} />
            Trending
          </div>
        )}
      </div>
    </article>
  );
};

// ============================================================================
// LOADING SKELETON
// ============================================================================

const LoadingSkeleton = () => (
  <div style={{ background: 'rgba(15,20,25,0.4)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', padding: '20px', animation: 'pulse 1.5s infinite' }}>
    <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)' }} />
      <div style={{ flex: 1 }}>
        <div style={{ height: '14px', width: '80px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '6px' }} />
        <div style={{ height: '12px', width: '60px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} />
      </div>
    </div>
    <div style={{ height: '14px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '8px' }} />
    <div style={{ height: '14px', width: '70%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} />
  </div>
);

// ============================================================================
// MAIN LIVE FEED
// ============================================================================

export default function LiveFeed() {
  const [posts, setPosts] = useState([]);
  const [running, setRunning] = useState(true);
  const [platform, setPlatform] = useState('all');
  const [sentiment, setSentiment] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [postsPerMin, setPostsPerMin] = useState(0);

  // Initial load
  useEffect(() => {
    setLoading(true);
    const initialPosts = Array.from({ length: 8 }, generatePost);
    setPosts(initialPosts);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Simulate streaming
  useEffect(() => {
    if (!running) return;
    let count = 0;
    const interval = setInterval(() => {
      setPosts(prev => [generatePost(), ...prev].slice(0, 40));
      count++;
      setPostsPerMin(count);
    }, 2000);
    
    const resetCounter = setInterval(() => {
      setPostsPerMin(0);
    }, 60000);
    
    return () => {
      clearInterval(interval);
      clearInterval(resetCounter);
    };
  }, [running]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      if (platform !== 'all' && post.platform !== platform) return false;
      if (sentiment !== 'all' && post.sentiment !== sentiment) return false;
      if (searchTerm && !post.text.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
  }, [posts, platform, sentiment, searchTerm]);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #07090d 0%, #0a0d12 100%)', color: '#fff', padding: '24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', animation: 'pulse 2s infinite' }} />
              {postsPerMin} posts/min • Real-time mental health sentiment
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setRunning(!running)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
                background: running ? '#ef4444' : '#10b981',
                color: '#fff',
                transition: 'all 0.2s ease'
              }}
            >
              {running ? <><Pause style={{ width: '18px', height: '18px' }} /> Pause</> : <><Play style={{ width: '18px', height: '18px' }} /> Resume</>}
            </button>
            <button
              onClick={() => setPosts(prev => [generatePost(), ...prev])}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <RefreshCw style={{ width: '18px', height: '18px' }} />
              Refresh
            </button>
          </div>
        </div>

        {/* Quick Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', padding: '20px', background: 'rgba(12,15,20,0.7)', backdropFilter: 'blur(12px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: '600' }}>Platform:</span>
          {['all', 'Twitter', 'Reddit'].map(p => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              style={{
                padding: '8px 16px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: '600',
                border: platform === p ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.1)',
                background: platform === p ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: platform === p ? '#fff' : 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textTransform: 'capitalize'
              }}
            >
              {p}
            </button>
          ))}
          
          <span style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)', margin: '0 8px' }} />
          
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: '600' }}>Sentiment:</span>
          {['all', 'positive', 'negative', 'neutral'].map(s => (
            <button
              key={s}
              onClick={() => setSentiment(s)}
              style={{
                padding: '8px 16px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: '600',
                border: sentiment === s ? (s === 'positive' ? '1px solid rgba(16,185,129,0.4)' : s === 'negative' ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(148,163,184,0.4)') : '1px solid rgba(255,255,255,0.1)',
                background: sentiment === s ? (s === 'positive' ? 'rgba(16,185,129,0.15)' : s === 'negative' ? 'rgba(239,68,68,0.15)' : s === 'neutral' ? 'rgba(148,163,184,0.15)' : 'rgba(255,255,255,0.1)') : 'transparent',
                color: sentiment === s ? (s === 'positive' ? '#10b981' : s === 'negative' ? '#ef4444' : s === 'neutral' ? '#94a3b8' : '#fff') : 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textTransform: 'capitalize'
              }}
            >
              {s}
            </button>
          ))}
          
          <div style={{ flex: 1, minWidth: '200px', position: 'relative', marginLeft: 'auto' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: 'rgba(255,255,255,0.4)' }} />
            <input
              type="text"
              placeholder="Search keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 36px',
                borderRadius: '12px',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Posts Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <LoadingSkeleton key={i} />)
            : filteredPosts.length === 0
            ? (
              <div style={{ gridColumn: '1 / -1', padding: '60px 20px', textAlign: 'center', background: 'rgba(12,15,20,0.5)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <AlertCircle style={{ width: '48px', height: '48px', margin: '0 auto 16px', color: 'rgba(255,255,255,0.3)' }} />
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', fontWeight: '600' }}>No posts found</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '8px' }}>Try adjusting your filters or search term</p>
              </div>
            )
            : filteredPosts.map(post => <PostCard key={post.id} post={post} searchTerm={searchTerm} onClick={() => {}} />)}
        </div>

        {/* Load More - Sleek Minimalist */}
{!loading && filteredPosts.length > 0 && (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', marginBottom: '40px' }}>
    <button
      onClick={() => setPosts(prev => [...prev, ...Array.from({ length: 6 }, generatePost)])}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
      }}
      style={{
        padding: '12px 28px',
        borderRadius: '12px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.15)',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      <span>Load More</span>
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M12 5v14M19 12l-7 7-7-7"/>
      </svg>
    </button>
  </div>
)}

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
