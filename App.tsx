import React, { useState } from 'react';

// SUPABASE CONFIGURATION KEYS
const SUPABASE_URL = "https://cckcexzahqiwziisggmx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNja2NleHphaHFpd3ppaXNnZ214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwMjQxMDMsImV4cCI6MjEwMTYwMDEwM30.TbO-BkRPE28y76ZhNqHnVkfP9TdVRuEmsjATKMw8_Y8";

export default function App() {
  const [activeTab, setActiveTab] = useState<'radar' | 'events' | 'perks'>('radar');
  const [vibeMode, setVibeMode] = useState('High Energy');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('All');
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<any>(null);

  // Sample seed data for preview
  const venues = [
    { id: 1, name: "The Chandelier", zone: "The Strip", perk: "2-for-1 Signature Cocktails", category: "Lounge" },
    { id: 2, name: "Velveteen Rabbit", zone: "Arts District", perk: "15% Off Check + Free Craft App", category: "Speakeasy" },
    { id: 3, name: "Golden Tiki", zone: "Chinatown", perk: "Complimentary Dole Whip Shot", category: "Tiki Bar" },
    { id: 4, name: "Honey Salt", zone: "Summerlin", perk: "Free Dessert with 2 Entrees", category: "Dining" }
  ];

  const events = [
    { id: 1, title: "Residency Concert at Caesars", venue: "The Colosseum", offer: "I Have an Extra Ticket", tag: "Show" },
    { id: 2, title: "Late Night Sushi & Drinks", venue: "Catch at ARIA", offer: "Looking to Split Bill", tag: "Dining" },
    { id: 3, title: "Dayclub Pool Party Crew", venue: "LIV Beach", offer: "Ticket Covered (My Guest)", tag: "Pool Party" }
  ];

  const filteredVenues = selectedNeighborhood === 'All' 
    ? venues 
    : venues.filter(v => v.zone === selectedNeighborhood);

  const handleOpenPass = (venue: any) => {
    setSelectedVenue(venue);
    setShowQRModal(true);
  };

  return (
    <div style={{ backgroundColor: '#0D0221', color: '#FFFFFF', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', padding: '16px' }}>
      
      {/* HEADER */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2A085C', paddingBottom: '12px', marginBottom: '20px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '900', background: 'linear-[#FF007A, #7B2CBF]', WebkitBackgroundClip: 'text', color: '#FF007A' }}>
            LAS VEGAS VIBE
          </h1>
          <p style={{ margin: 0, fontSize: '12px', color: '#A0A0B2' }}>⚡ 1,420 Active Beacons in Vegas Tonight</p>
        </div>
        <div style={{ backgroundColor: '#1A0B36', padding: '6px 12px', borderRadius: '20px', border: '1px solid #7B2CBF', fontSize: '12px', fontWeight: 'bold', color: '#FFD700' }}>
          {vibeMode}
        </div>
      </header>

      {/* VIBE MODE SELECTOR */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto' }}>
        {['High Energy', 'Curated Lounge', 'Classic & Chill'].map(mode => (
          <button 
            key={mode} 
            onClick={() => setVibeMode(mode)}
            style={{ 
              padding: '8px 16px', 
              borderRadius: '20px', 
              border: 'none', 
              backgroundColor: vibeMode === mode ? '#FF007A' : '#1A0B36', 
              color: '#FFF', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* NAVIGATION TABS */}
      <div style={{ display: 'flex', borderBottom: '2px solid #1A0B36', marginBottom: '20px' }}>
        {[
          { id: 'radar', label: '📍 Real-Time Radar' },
          { id: 'events', label: '🎟️ Live Events & +1s' },
          { id: 'perks', label: '🍸 Dining Perks' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '3px solid #FF007A' : 'none',
              color: activeTab === tab.id ? '#FF007A' : '#A0A0B2',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: RADAR & VENUE MAP */}
      {activeTab === 'radar' && (
        <div>
          {/* NEIGHBORHOOD FILTER */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {['All', 'The Strip', 'Arts District', 'Chinatown', 'Summerlin'].map(zone => (
              <button
                key={zone}
                onClick={() => setSelectedNeighborhood(zone)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '12px',
                  border: '1px solid #7B2CBF',
                  backgroundColor: selectedNeighborhood === zone ? '#7B2CBF' : '#0D0221',
                  color: '#FFF',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                {zone}
              </button>
            ))}
          </div>

          {/* VENUE LIST */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredVenues.map(venue => (
              <div key={venue.id} style={{ backgroundColor: '#1A0B36', borderRadius: '12px', padding: '16px', border: '1px solid #2A085C' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', color: '#FFF' }}>{venue.name}</h3>
                  <span style={{ fontSize: '11px', backgroundColor: '#2A085C', color: '#FFD700', padding: '4px 8px', borderRadius: '8px' }}>{venue.zone}</span>
                </div>
                <p style={{ color: '#FF007A', fontWeight: 'bold', margin: '8px 0', fontSize: '14px' }}>🎁 Perk: {venue.perk}</p>
                <button 
                  onClick={() => handleOpenPass(venue)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: '#7B2CBF', color: '#FFF', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' }}
                >
                  Generate Vibe Pass QR
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: EVENTS BOARD */}
      {activeTab === 'events' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {events.map(ev => (
            <div key={ev.id} style={{ backgroundColor: '#1A0B36', borderRadius: '12px', padding: '16px', border: '1px solid #2A085C' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', color: '#A0A0B2' }}>{ev.venue}</span>
                <span style={{ fontSize: '11px', color: '#FFD700', backgroundColor: '#2A085C', padding: '2px 8px', borderRadius: '6px' }}>{ev.tag}</span>
              </div>
              <h3 style={{ margin: '8px 0', fontSize: '16px', color: '#FFF' }}>{ev.title}</h3>
              <p style={{ margin: '4px 0', fontSize: '13px', color: '#FF007A', fontWeight: 'bold' }}>{ev.offer}</p>
              <button style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: '#FF007A', color: '#FFF', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' }}>
                Send Vibe Pitch
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: DINING PERKS */}
      {activeTab === 'perks' && (
        <div style={{ backgroundColor: '#1A0B36', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
          <h2 style={{ color: '#FFD700', marginTop: 0 }}>Partner Dining Perks</h2>
          <p style={{ color: '#A0A0B2', fontSize: '14px' }}>Show your Vibe Pass QR Code to your server or bartender when you meet your date to unlock exclusive house discounts.</p>
        </div>
      )}

      {/* VIBE PASS QR MODAL */}
      {showQRModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#1A0B36', borderRadius: '20px', padding: '24px', maxWidth: '320px', width: '100%', textAlign: 'center', border: '2px solid #FF007A' }}>
            <h3 style={{ margin: 0, color: '#FF007A' }}>OFFICIAL VIBE PASS</h3>
            <p style={{ color: '#FFF', fontWeight: 'bold', margin: '8px 0' }}>{selectedVenue?.name}</p>
            
            {/* Simulated QR Code Box */}
            <div style={{ backgroundColor: '#FFF', padding: '20px', borderRadius: '12px', margin: '16px 0', display: 'inline-block' }}>
              <div style={{ width: '140px', height: '140px', backgroundColor: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#FFF', fontSize: '10px' }}>
                [ SCAN FOR PERK ]
              </div>
            </div>

            <p style={{ color: '#FFD700', fontSize: '12px', margin: 0 }}>{selectedVenue?.perk}</p>
            <p style={{ color: '#A0A0B2', fontSize: '11px', marginTop: '4px' }}>Expires in 3 hours</p>

            <button 
              onClick={() => setShowQRModal(false)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', backgroundColor: '#2A085C', color: '#FFF', border: 'none', fontWeight: 'bold', cursor: 'pointer', marginTop: '16px' }}
            >
              Close Pass
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
