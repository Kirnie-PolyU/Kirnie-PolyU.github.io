# Visitor Map & Tracking System Guide

## 📋 Overview

This visitor tracking system provides:
- **Real-time visitor location tracking** using IP geolocation
- **Persistent data storage** using browser localStorage
- **Interactive world map** with red dot markers
- **Statistics dashboard** showing total visits, unique visitors, and countries
- **Session-based tracking** to avoid counting page refreshes

## 🚀 Features

### 1. Data Persistence
- All visitor data is stored in browser's `localStorage`
- Data persists across page refreshes and browser restarts
- Session-based tracking ensures one visit per browser session

### 2. Visitor Statistics
- **Total Visits**: All page visits (new sessions only)
- **Unique Visitors**: Unique IP addresses
- **Countries**: Number of different countries visited from

### 3. Interactive Map
- Red dot markers for each visitor location
- Click markers to see visitor details (city, country, date)
- Grayscale academic-style map design
- Responsive design for all screen sizes

## 📦 Installation

### Option 1: Add to Existing Page

Add these lines to your HTML `<head>`:

```html
<!-- Leaflet CSS -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
```

Add before closing `</body>` tag:

```html
<!-- Visitor Map Section -->
<section id="visitor-map-section">
  <h2>📍 Visitor Map & Statistics</h2>
  
  <!-- Statistics Dashboard -->
  <div id="visitor-stats">
    <div class="stat-item">
      <span class="stat-number" id="total-visits">0</span>
      <span class="stat-label">Total Visits</span>
    </div>
    <div class="stat-item">
      <span class="stat-number" id="unique-visitors">0</span>
      <span class="stat-label">Unique Visitors</span>
    </div>
    <div class="stat-item">
      <span class="stat-number" id="countries-count">0</span>
      <span class="stat-label">Countries</span>
    </div>
  </div>
  
  <!-- World Map Container -->
  <div id="world-map-container"></div>
</section>

<!-- Leaflet JavaScript -->
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<!-- Visitor Tracking Script -->
<script src="visitor-tracker.js"></script>
```

### Option 2: Use Pre-configured Page

Use the provided `index-with-map.html` which includes everything pre-configured.

## 🔧 Configuration

### Geolocation API

The system uses **ipapi.co** for geolocation:
- Free tier: 1,000 requests per day
- No API key required
- Automatic fallback to random major cities if API fails

To use a different API, modify `getVisitorLocation()` in `visitor-tracker.js`:

```javascript
async getVisitorLocation() {
  const response = await fetch('YOUR_API_ENDPOINT');
  const data = await response.json();
  // Map your API response to required format
}
```

### Storage Keys

Data is stored in localStorage with these keys:
- `visitorData`: Main visitor data object
- `currentSession`: Session marker (in sessionStorage)

### Customizing Map Appearance

In `visitor-tracker.js`, modify the `initializeMap()` function:

```javascript
// Change initial view
this.map = L.map('world-map-container', {
  center: [20, 0],  // Change center coordinates
  zoom: 2,           // Change zoom level
  // ... other options
});

// Change map tiles
L.tileLayer('YOUR_TILE_SERVER_URL', {
  // ... tile options
}).addTo(this.map);
```

### Customizing Marker Style

Modify the `redDotIcon` in `displayVisitors()`:

```javascript
const redDotIcon = L.divIcon({
  className: 'custom-marker',
  html: '<div style="width: 12px; height: 12px; background-color: #dc2626; ..."></div>',
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});
```

## 📊 Data Structure

### Visitor Data Object

```javascript
{
  totalVisits: 42,           // Total number of visits
  uniqueVisitors: 28,        // Unique IP addresses
  countries: ['USA', 'UK', 'Japan', ...], // Set of countries
  visitors: [                // Array of visitor objects
    {
      ip: '123.45.67.89',
      city: 'New York',
      country: 'United States',
      countryCode: 'US',
      latitude: 40.7128,
      longitude: -74.0060,
      timestamp: '2024-12-19T12:00:00.000Z'
    },
    // ... more visitors
  ]
}
```

## 🎯 API Reference

### Global Functions

#### `window.visitorTracker`
The main VisitorTracker instance.

#### `window.resetVisitorData()`
Resets all visitor data and refreshes the page.

```javascript
// In browser console
resetVisitorData()
```

#### `window.getVisitorStats()`
Returns current visitor statistics.

```javascript
// In browser console
getVisitorStats()
// Returns:
// {
//   totalVisits: 42,
//   uniqueVisitors: 28,
//   countries: ['USA', 'UK', ...],
//   countriesCount: 15,
//   visitors: [...]
// }
```

### VisitorTracker Methods

#### `constructor()`
Initializes the tracker and loads existing data.

#### `init()`
Async initialization: loads data, tracks visitor, creates map.

#### `getVisitorLocation()`
Fetches visitor's geolocation from IP.

#### `trackCurrentVisitor()`
Records the current visitor (once per session).

#### `initializeMap()`
Creates and configures the Leaflet map.

#### `displayVisitors()`
Adds markers to the map for all visitors.

#### `updateStatistics()`
Updates the statistics display with animation.

#### `saveVisitorData()`
Persists data to localStorage.

#### `resetData()`
Clears all stored visitor data.

## 🐛 Debugging

### Check if tracking is working:

```javascript
// In browser console
console.log(window.visitorTracker.getStats())
```

### View stored data:

```javascript
// In browser console
console.log(localStorage.getItem('visitorData'))
```

### Force a new visit:

```javascript
// In browser console
sessionStorage.clear()
location.reload()
```

### Reset everything:

```javascript
// In browser console
resetVisitorData()
```

## 🔒 Privacy Considerations

### Data Collection
- Only collects: IP address (hashed in production), city, country, coordinates
- No personal information stored
- All data stored locally in visitor's browser

### GDPR Compliance
For production use, consider:
1. Adding a cookie consent banner
2. Providing opt-out mechanism
3. Adding privacy policy
4. Anonymizing IP addresses

Example privacy notice:

```html
<div style="margin-top: 1rem; font-size: 0.875rem; color: #718096;">
  <p>
    This site uses browser-based tracking to display visitor locations. 
    No personal data is sent to servers. 
    <a href="/privacy">Privacy Policy</a>
  </p>
</div>
```

## 🎨 Styling

The visitor map section uses these CSS classes:
- `#visitor-map-section`: Main container
- `#visitor-stats`: Statistics dashboard
- `.stat-item`: Individual statistic
- `.stat-number`: Number display
- `.stat-label`: Label text
- `#world-map-container`: Map container

Customize in `academic-override.css`:

```css
#visitor-map-section {
  /* Your custom styles */
}
```

## 📱 Responsive Design

The map automatically adjusts for different screen sizes:
- **Desktop** (>768px): 500px height, horizontal stats
- **Mobile** (<768px): 350px height, stacked stats

## 🔄 Backup & Export

### Export visitor data:

```javascript
// In browser console
const data = localStorage.getItem('visitorData')
console.log(data)
// Copy the output to save
```

### Import visitor data:

```javascript
// In browser console
const importedData = '{"totalVisits":42,...}' // Your saved data
localStorage.setItem('visitorData', importedData)
location.reload()
```

## 🚨 Troubleshooting

### Map not showing
- Check browser console for errors
- Verify Leaflet CSS and JS are loaded
- Check if `#world-map-container` exists in DOM

### No location data
- Check network tab for ipapi.co request
- Verify you haven't exceeded API limits (1000/day)
- Check for CORS errors

### Data not persisting
- Check if localStorage is enabled
- Verify no browser extensions are blocking storage
- Check storage quota isn't exceeded

### Markers not appearing
- Verify visitor data has valid coordinates
- Check browser console for JavaScript errors
- Ensure map is initialized before adding markers

## 📈 Performance

- **Initial Load**: ~2-3 seconds (includes API call)
- **Subsequent Loads**: <1 second (from cache)
- **Storage Size**: ~1KB per 10 visitors
- **API Calls**: 1 per unique browser session

## 🔮 Future Enhancements

Possible improvements:
- Server-side storage for cross-device persistence
- Real-time visitor counter
- Visit history timeline
- Country flags in statistics
- Heatmap overlay
- Export data as CSV/JSON
- Admin dashboard
- Visitor journey tracking

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Verify all files are loaded correctly
3. Test with `getVisitorStats()` function
4. Check localStorage for data

---

**Version**: 1.0.0  
**Last Updated**: December 19, 2024  
**License**: MIT
