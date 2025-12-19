/**
 * Visitor Tracking System with Persistent Storage
 * Tracks visitor locations and displays them on a world map
 */

class VisitorTracker {
  constructor() {
    this.storageKey = 'visitorData';
    this.sessionKey = 'currentSession';
    this.map = null;
    this.markers = [];
    this.init();
  }

  /**
   * Initialize the visitor tracking system
   */
  async init() {
    // Load existing data
    this.loadVisitorData();
    
    // Track current visitor
    await this.trackCurrentVisitor();
    
    // Initialize map
    this.initializeMap();
    
    // Update statistics
    this.updateStatistics();
    
    // Display visitor markers
    this.displayVisitors();
  }

  /**
   * Load visitor data from localStorage
   */
  loadVisitorData() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        this.visitorData = JSON.parse(stored);
      } catch (e) {
        console.error('Error loading visitor data:', e);
        this.visitorData = {
          totalVisits: 0,
          uniqueVisitors: 0,
          visitors: [],
          countries: new Set()
        };
      }
    } else {
      this.visitorData = {
        totalVisits: 0,
        uniqueVisitors: 0,
        visitors: [],
        countries: []
      };
    }
    
    // Convert countries array back to Set
    if (Array.isArray(this.visitorData.countries)) {
      this.visitorData.countries = new Set(this.visitorData.countries);
    }
  }

  /**
   * Save visitor data to localStorage
   */
  saveVisitorData() {
    // Convert Set to Array for storage
    const dataToSave = {
      ...this.visitorData,
      countries: Array.from(this.visitorData.countries)
    };
    localStorage.setItem(this.storageKey, JSON.stringify(dataToSave));
  }

  /**
   * Get visitor's geolocation using IP
   */
  async getVisitorLocation() {
    try {
      // Using ipapi.co for geolocation (free tier: 1000 requests/day)
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) {
        throw new Error('Geolocation API error');
      }
      const data = await response.json();
      
      return {
        ip: data.ip,
        city: data.city || 'Unknown',
        country: data.country_name || 'Unknown',
        countryCode: data.country_code || 'XX',
        latitude: data.latitude || 0,
        longitude: data.longitude || 0,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching location:', error);
      // Return default location if API fails
      return this.getDefaultLocation();
    }
  }

  /**
   * Get default location (fallback)
   */
  getDefaultLocation() {
    // Return a random major city as fallback
    const cities = [
      { city: 'New York', country: 'United States', countryCode: 'US', lat: 40.7128, lng: -74.0060 },
      { city: 'London', country: 'United Kingdom', countryCode: 'GB', lat: 51.5074, lng: -0.1278 },
      { city: 'Tokyo', country: 'Japan', countryCode: 'JP', lat: 35.6762, lng: 139.6503 },
      { city: 'Paris', country: 'France', countryCode: 'FR', lat: 48.8566, lng: 2.3522 },
      { city: 'Sydney', country: 'Australia', countryCode: 'AU', lat: -33.8688, lng: 151.2093 },
      { city: 'Hong Kong', country: 'Hong Kong', countryCode: 'HK', lat: 22.3193, lng: 114.1694 },
      { city: 'Singapore', country: 'Singapore', countryCode: 'SG', lat: 1.3521, lng: 103.8198 },
      { city: 'Dubai', country: 'UAE', countryCode: 'AE', lat: 25.2048, lng: 55.2708 }
    ];
    
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    
    return {
      ip: 'unknown',
      city: randomCity.city,
      country: randomCity.country,
      countryCode: randomCity.countryCode,
      latitude: randomCity.lat,
      longitude: randomCity.lng,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Check if this is a new session
   */
  isNewSession() {
    const lastSession = sessionStorage.getItem(this.sessionKey);
    return !lastSession;
  }

  /**
   * Mark current session
   */
  markSession() {
    sessionStorage.setItem(this.sessionKey, new Date().toISOString());
  }

  /**
   * Track current visitor
   */
  async trackCurrentVisitor() {
    // Only track if this is a new session
    if (!this.isNewSession()) {
      console.log('Existing session, not tracking again');
      return;
    }

    const location = await this.getVisitorLocation();
    
    // Check if this is a unique visitor (by IP)
    const isUnique = !this.visitorData.visitors.some(v => v.ip === location.ip);
    
    // Add visitor data
    this.visitorData.visitors.push(location);
    this.visitorData.totalVisits++;
    
    if (isUnique) {
      this.visitorData.uniqueVisitors++;
    }
    
    // Add country to set
    this.visitorData.countries.add(location.country);
    
    // Save to localStorage
    this.saveVisitorData();
    
    // Mark this session
    this.markSession();
    
    console.log('Visitor tracked:', location);
  }

  /**
   * Initialize Leaflet map
   */
  initializeMap() {
    const container = document.getElementById('world-map-container');
    if (!container) {
      console.error('Map container not found');
      return;
    }

    // Initialize map
    this.map = L.map('world-map-container', {
      center: [20, 0],
      zoom: 2,
      minZoom: 2,
      maxZoom: 10,
      worldCopyJump: true,
      maxBounds: [[-90, -180], [90, 180]]
    });

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      noWrap: false
    }).addTo(this.map);

    // Style the map for academic look
    container.style.filter = 'grayscale(20%) brightness(0.95)';
  }

  /**
   * Display visitor markers on map
   */
  displayVisitors() {
    if (!this.map) return;

    // Clear existing markers
    this.markers.forEach(marker => marker.remove());
    this.markers = [];

    // Create custom red dot icon
    const redDotIcon = L.divIcon({
      className: 'custom-marker',
      html: '<div style="width: 12px; height: 12px; background-color: #dc2626; border: 2px solid white; border-radius: 50%; box-shadow: 0 2px 8px rgba(220, 38, 38, 0.5);"></div>',
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    });

    // Add marker for each visitor
    this.visitorData.visitors.forEach(visitor => {
      if (visitor.latitude && visitor.longitude) {
        const marker = L.marker([visitor.latitude, visitor.longitude], {
          icon: redDotIcon
        }).addTo(this.map);

        // Add popup with visitor info
        const popupContent = `
          <div style="font-family: 'Inter', sans-serif; min-width: 150px;">
            <h4 style="margin: 0 0 8px 0; color: #1a365d; font-size: 14px;">
              ${visitor.city}, ${visitor.country}
            </h4>
            <p style="margin: 4px 0; font-size: 12px; color: #4a5568;">
              <strong>Country:</strong> ${visitor.countryCode}
            </p>
            <p style="margin: 4px 0; font-size: 12px; color: #4a5568;">
              <strong>Date:</strong> ${new Date(visitor.timestamp).toLocaleDateString()}
            </p>
          </div>
        `;
        
        marker.bindPopup(popupContent);
        this.markers.push(marker);
      }
    });

    console.log(`Displayed ${this.markers.length} visitor markers`);
  }

  /**
   * Update statistics display
   */
  updateStatistics() {
    const totalVisitsEl = document.getElementById('total-visits');
    const uniqueVisitorsEl = document.getElementById('unique-visitors');
    const countriesCountEl = document.getElementById('countries-count');

    if (totalVisitsEl) {
      this.animateNumber(totalVisitsEl, this.visitorData.totalVisits);
    }
    if (uniqueVisitorsEl) {
      this.animateNumber(uniqueVisitorsEl, this.visitorData.uniqueVisitors);
    }
    if (countriesCountEl) {
      this.animateNumber(countriesCountEl, this.visitorData.countries.size);
    }
  }

  /**
   * Animate number counting up
   */
  animateNumber(element, target) {
    const duration = 1000; // 1 second
    const steps = 30;
    const increment = target / steps;
    let current = 0;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, stepTime);
  }

  /**
   * Reset all visitor data (for testing)
   */
  resetData() {
    localStorage.removeItem(this.storageKey);
    sessionStorage.removeItem(this.sessionKey);
    this.visitorData = {
      totalVisits: 0,
      uniqueVisitors: 0,
      visitors: [],
      countries: new Set()
    };
    this.saveVisitorData();
    this.updateStatistics();
    this.markers.forEach(marker => marker.remove());
    this.markers = [];
    console.log('Visitor data reset');
  }

  /**
   * Get visitor statistics
   */
  getStats() {
    return {
      totalVisits: this.visitorData.totalVisits,
      uniqueVisitors: this.visitorData.uniqueVisitors,
      countries: Array.from(this.visitorData.countries),
      countriesCount: this.visitorData.countries.size,
      visitors: this.visitorData.visitors
    };
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.visitorTracker = new VisitorTracker();
  });
} else {
  window.visitorTracker = new VisitorTracker();
}

// Expose reset function for debugging
window.resetVisitorData = () => {
  if (window.visitorTracker) {
    window.visitorTracker.resetData();
    location.reload();
  }
};

// Expose stats function for debugging
window.getVisitorStats = () => {
  if (window.visitorTracker) {
    return window.visitorTracker.getStats();
  }
};
