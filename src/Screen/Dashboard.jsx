import React, { useEffect, useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from 'recharts';
import {
  Heart,
  Activity,
  MessageSquare,
  Users,
  Brain,
  Eye,
  Calendar,
  Zap,
  ChevronRight,
  Filter,
} from 'lucide-react';

// ============================================================================
// MOCK DATA
// ============================================================================

const mockData = {
  '24h': [
    { date: '12AM', positive: 25, negative: 48, neutral: 18 },
    { date: '4AM', positive: 22, negative: 52, neutral: 16 },
    { date: '8AM', positive: 30, negative: 45, neutral: 15 },
    { date: '12PM', positive: 35, negative: 42, neutral: 14 },
    { date: '4PM', positive: 38, negative: 40, neutral: 12 },
    { date: '8PM', positive: 32, negative: 46, neutral: 13 },
  ],
  '7d': [
    { date: 'Mon', positive: 28, negative: 45, neutral: 15 },
    { date: 'Tue', positive: 32, negative: 42, neutral: 14 },
    { date: 'Wed', positive: 35, negative: 48, neutral: 12 },
    { date: 'Thu', positive: 30, negative: 52, neutral: 13 },
    { date: 'Fri', positive: 38, negative: 50, neutral: 11 },
    { date: 'Sat', positive: 42, negative: 46, neutral: 10 },
    { date: 'Sun', positive: 45, negative: 43, neutral: 12 },
  ],
  '30d': [
    { date: 'Week 1', positive: 30, negative: 50, neutral: 14 },
    { date: 'Week 2', positive: 35, negative: 48, neutral: 12 },
    { date: 'Week 3', positive: 38, negative: 45, neutral: 11 },
    { date: 'Week 4', positive: 42, negative: 42, neutral: 10 },
  ],
};

const keywords = [
  { word: 'Anxious', freq: 18900, sentiment: 'negative' },
  { word: 'Stressed', freq: 15300, sentiment: 'negative' },
  { word: 'Overwhelmed', freq: 14200, sentiment: 'negative' },
  { word: 'Happy', freq: 12500, sentiment: 'positive' },
  { word: 'Worried', freq: 10800, sentiment: 'negative' },
  { word: 'Frustrated', freq: 9600, sentiment: 'negative' },
  { word: 'Grateful', freq: 8200, sentiment: 'positive' },
  { word: 'Hopeful', freq: 7100, sentiment: 'positive' },
  { word: 'Content', freq: 6400, sentiment: 'positive' },
  { word: 'Peaceful', freq: 5800, sentiment: 'positive' },
];

const geographicData = [
  { region: 'North America', intensity: 52, tone: 'negative' },
  { region: 'Europe', intensity: 45, tone: 'neutral' },
  { region: 'Asia', intensity: 38, tone: 'positive' },
  { region: 'South America', intensity: 48, tone: 'negative' },
  { region: 'Africa', intensity: 41, tone: 'neutral' },
  { region: 'Oceania', intensity: 35, tone: 'positive' },
];

// ============================================================================
// ANIMATED COUNTER
// ============================================================================

const useCounter = (target = 0, duration = 900) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      setVal(Math.round(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return val;
};

const num = (n) => Intl.NumberFormat('en', { notation: 'compact' }).format(n);

// ============================================================================
// REDESIGNED KPI CARD
// ============================================================================

const KPICard = ({ title, valuePct, delta, deltaDir, subtitle, icon: Icon, color }) => {
  const val = useCounter(valuePct);
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const progress = (valuePct / 100) * circumference;

  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '16px',
      background: 'rgba(12,15,20,0.6)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255,255,255,0.06)',
      padding: '20px',
      transition: 'all 0.3s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
    }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: color === 'green' ? 'rgba(16,185,129,0.1)' : 
                      color === 'red' ? 'rgba(239,68,68,0.1)' : 
                      color === 'blue' ? 'rgba(59,130,246,0.1)' : 'rgba(148,163,184,0.1)',
          border: color === 'green' ? '1px solid rgba(16,185,129,0.2)' : 
                  color === 'red' ? '1px solid rgba(239,68,68,0.2)' : 
                  color === 'blue' ? '1px solid rgba(59,130,246,0.2)' : '1px solid rgba(148,163,184,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon style={{
            width: '24px',
            height: '24px',
            color: color === 'green' ? '#10b981' : 
                   color === 'red' ? '#ef4444' : 
                   color === 'blue' ? '#3b82f6' : '#94a3b8'
          }} />
        </div>

        <div style={{ position: 'relative', width: '72px', height: '72px' }}>
          <svg width="72" height="72" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="36" cy="36" r={radius} stroke="rgba(148,163,184,0.1)" strokeWidth="6" fill="transparent" />
            <circle
              cx="36" cy="36" r={radius}
              stroke={color === 'green' ? '#10b981' : color === 'red' ? '#ef4444' : color === 'blue' ? '#3b82f6' : '#64748b'}
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              strokeLinecap="round"
              fill="transparent"
              style={{ transition: 'stroke-dashoffset 0.6s ease' }}
            />
          </svg>
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: '800',
            color: color === 'green' ? '#10b981' : color === 'red' ? '#ef4444' : color === 'blue' ? '#3b82f6' : '#94a3b8'
          }}>
            {val}%
          </div>
        </div>
      </div>

      <div style={{
        fontSize: '11px',
        fontWeight: '700',
        color: 'rgba(255,255,255,0.5)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '8px'
      }}>
        {title}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <span style={{
          fontSize: '28px',
          fontWeight: '900',
          color: color === 'green' ? '#34d399' : color === 'red' ? '#fb7185' : color === 'blue' ? '#93c5fd' : '#94a3b8'
        }}>
          {val}<span style={{ fontSize: '18px' }}>%</span>
        </span>
        <span style={{
          fontSize: '12px',
          fontWeight: '700',
          padding: '4px 8px',
          borderRadius: '6px',
          background: color === 'green' ? 'rgba(16,185,129,0.1)' : 
                      color === 'red' ? 'rgba(239,68,68,0.1)' : 
                      color === 'blue' ? 'rgba(59,130,246,0.1)' : 'rgba(148,163,184,0.1)',
          color: color === 'green' ? '#34d399' : color === 'red' ? '#fb7185' : color === 'blue' ? '#93c5fd' : '#94a3b8'
        }}>
          {deltaDir === 'up' ? '▲' : '▼'} {delta}
        </span>
      </div>

      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
        {subtitle}
      </div>
    </div>
  );
};

// ============================================================================
// KEYWORD CARD WITH STUNNING HOVER EFFECTS
// ============================================================================

const KeywordCard = ({ word, freq, sentiment }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '12px',
        padding: '12px',
        border: '1px solid rgba(255,255,255,0.06)',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        background: sentiment === 'positive' 
          ? (isHovered ? 'rgba(16,185,129,0.12)' : 'rgba(16,185,129,0.03)') 
          : (isHovered ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.03)'),
        transform: isHovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
        borderColor: isHovered 
          ? (sentiment === 'positive' ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)') 
          : 'rgba(255,255,255,0.06)',
        boxShadow: isHovered 
          ? (sentiment === 'positive' 
            ? '0 12px 32px rgba(16,185,129,0.2), 0 0 0 1px rgba(16,185,129,0.3)' 
            : '0 12px 32px rgba(239,68,68,0.2), 0 0 0 1px rgba(239,68,68,0.3)')
          : 'none',
        overflow: 'hidden'
      }}
    >
      {/* Animated gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: sentiment === 'positive' 
          ? 'linear-gradient(135deg, rgba(16,185,129,0.2), transparent)' 
          : 'linear-gradient(135deg, rgba(239,68,68,0.2), transparent)',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.4s ease'
      }} />

      {/* Shine effect */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
        transform: isHovered ? 'translate(50%, 50%)' : 'translate(-100%, -100%)',
        transition: 'transform 0.6s ease',
        pointerEvents: 'none'
      }} />

      {/* Content */}
      <div style={{ 
        position: 'relative', 
        zIndex: 1,
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <p style={{ 
            fontWeight: '700',
            fontSize: isHovered ? '15px' : '14px',
            whiteSpace: 'nowrap', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            color: sentiment === 'positive' ? '#34d399' : '#fb7185',
            transition: 'all 0.3s ease',
            marginBottom: '4px'
          }}>
            {word}
          </p>
          <p style={{ 
            fontSize: '11px', 
            color: 'rgba(255,255,255,0.6)',
            transition: 'color 0.3s ease'
          }}>
            {num(freq)} mentions
          </p>
        </div>
        
        <ChevronRight style={{ 
          width: '18px', 
          height: '18px', 
          flexShrink: 0, 
          color: sentiment === 'positive' ? '#34d399' : '#fb7185',
          transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
          transition: 'all 0.3s ease',
          opacity: isHovered ? 1 : 0.5
        }} />
      </div>

      {/* Pulse ring on hover */}
      {isHovered && (
        <div style={{
          position: 'absolute',
          inset: '-2px',
          borderRadius: '12px',
          border: `2px solid ${sentiment === 'positive' ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}`,
          animation: 'pulse-ring 1.5s ease-out infinite',
          pointerEvents: 'none'
        }} />
      )}
    </div>
  );
};

// ============================================================================
// CHART TOOLTIP
// ============================================================================

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div style={{
      background: 'rgba(11,14,19,0.95)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '12px',
      padding: '12px',
      backdropFilter: 'blur(8px)'
    }}>
      <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '12px', marginBottom: '8px' }}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '24px', marginBottom: '4px' }}>
          <span style={{ fontSize: '12px', textTransform: 'capitalize', color: p.color }}>{p.name}</span>
          <span style={{ fontSize: '13px', fontWeight: '700', color: p.color }}>{p.value}%</span>
        </div>
      ))}
    </div>
  );
};

// ============================================================================
// MAIN DASHBOARD
// ============================================================================

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const [sentimentFilter, setSentimentFilter] = useState('all');

  const chartData = mockData[timeRange];

  const filteredKeywords = useMemo(() => {
    const filtered = sentimentFilter === 'all' ? keywords : keywords.filter(k => k.sentiment === sentimentFilter);
    return filtered.sort((a, b) => b.freq - a.freq);
  }, [sentimentFilter]);

  return (
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Status row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar style={{ width: '14px', height: '14px' }} />
            <span>Updated: just now</span>
          </div>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Eye style={{ width: '14px', height: '14px' }} />
            <span>Real-time overview</span>
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <KPICard title="Positive" valuePct={34} delta="+5.2%" deltaDir="up" subtitle="Happiness & Gratitude" icon={Heart} color="green" />
          <KPICard title="Negative" valuePct={52} delta="+2.8%" deltaDir="up" subtitle="Anxiety & Stress" icon={Activity} color="red" />
          <KPICard title="Neutral" valuePct={14} delta="-1.5%" deltaDir="down" subtitle="Informational Posts" icon={MessageSquare} color="gray" />
          <KPICard title="Posts Analyzed" valuePct={80} delta="+12.3%" deltaDir="up" subtitle="1.2M in last 7d" icon={Users} color="blue" />
        </div>

        {/* Charts */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
          <div style={{ background: 'rgba(12,15,20,0.7)', backdropFilter: 'blur(8px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div>
                <h3 style={{ fontWeight: '600', fontSize: '16px' }}>Sentiment over time</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Track how emotions evolve day by day</p>
              </div>
              <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} style={{ background: 'rgba(11,14,19,1)', border: '1px solid rgba(255,255,255,0.08)', padding: '8px 12px', borderRadius: '12px', color: 'rgba(255,255,255,0.85)', cursor: 'pointer' }}>
                <option value="24h">Last 24h</option>
                <option value="7d">Last 7d</option>
                <option value="30d">Last 30d</option>
              </select>
            </div>
            <div style={{ padding: '18px' }}>
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="pos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.06} />
                    </linearGradient>
                    <linearGradient id="neg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.06} />
                    </linearGradient>
                    <linearGradient id="neu" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#64748b" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#64748b" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 4" stroke="#334155" opacity={0.25} />
                  <XAxis dataKey="date" stroke="#94a3b8" tickLine={false} style={{ fontSize: '12px' }} />
                  <YAxis stroke="#94a3b8" tickLine={false} style={{ fontSize: '12px' }} />
                  <RechartsTooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2.5} fill="url(#neg)" name="negative" />
                  <Area type="monotone" dataKey="positive" stroke="#10b981" strokeWidth={2.5} fill="url(#pos)" name="positive" />
                  <Area type="monotone" dataKey="neutral" stroke="#64748b" strokeWidth={2} fill="url(#neu)" name="neutral" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ background: 'rgba(12,15,20,0.7)', backdropFilter: 'blur(8px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div>
                <h3 style={{ fontWeight: '600', fontSize: '16px' }}>Trending keywords</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Most mentioned emotions</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setSentimentFilter('all')} style={{ padding: '6px 10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', background: sentimentFilter === 'all' ? 'rgba(255,255,255,0.04)' : 'transparent', color: sentimentFilter === 'all' ? '#fff' : 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>All</button>
                <button onClick={() => setSentimentFilter('positive')} style={{ padding: '6px 10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', background: sentimentFilter === 'positive' ? 'rgba(16,185,129,0.08)' : 'transparent', color: sentimentFilter === 'positive' ? '#34d399' : 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Positive</button>
                <button onClick={() => setSentimentFilter('negative')} style={{ padding: '6px 10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', background: sentimentFilter === 'negative' ? 'rgba(239,68,68,0.08)' : 'transparent', color: sentimentFilter === 'negative' ? '#fb7185' : 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Negative</button>
              </div>
            </div>
            <div style={{ padding: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '12px' }}>
                {filteredKeywords.map((k, i) => (
                  <KeywordCard key={i} word={k.word} freq={k.freq} sentiment={k.sentiment} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Geographic section */}
        <div style={{ background: 'rgba(12,15,20,0.7)', backdropFilter: 'blur(8px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <div>
              <h3 style={{ fontWeight: '600', fontSize: '16px' }}>Geographic sentiment</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>Regional patterns and intensity</p>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', background: 'transparent', color: 'rgba(255,255,255,0.8)', cursor: 'pointer' }}>
              <Filter style={{ width: '16px', height: '16px' }} />
              <span style={{ fontSize: '13px' }}>Filter</span>
            </button>
          </div>
          <div style={{ padding: '18px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              {geographicData.map((r, i) => (
                <div key={i} style={{ background: 'rgba(11,14,19,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontWeight: '600', fontSize: '15px', color: '#fff' }}>{r.region}</span>
                    <span style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '999px', background: r.tone === 'positive' ? 'rgba(16,185,129,0.08)' : r.tone === 'negative' ? 'rgba(239,68,68,0.08)' : 'rgba(148,163,184,0.06)', color: r.tone === 'positive' ? '#34d399' : r.tone === 'negative' ? '#fb7185' : '#94a3b8', fontWeight: '600' }}>{r.tone}</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.04)', borderRadius: '999px', overflow: 'hidden', marginBottom: '12px' }}>
                    <div style={{ height: '100%', width: `${r.intensity}%`, background: r.tone === 'positive' ? '#34d399' : r.tone === 'negative' ? '#fb7185' : '#94a3b8', borderRadius: '999px' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.5)' }}>Intensity</span>
                    <span style={{ fontWeight: '700', color: r.tone === 'positive' ? '#34d399' : r.tone === 'negative' ? '#fb7185' : '#94a3b8' }}>{r.intensity}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.05);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
