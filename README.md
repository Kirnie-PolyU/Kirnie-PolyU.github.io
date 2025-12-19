# Academic Personal Homepage

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://kirnie-polyu.github.io/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> A professional academic personal homepage with visitor tracking and statistics

## 🌟 Features

### 📚 Academic Design
- Professional serif typography (Crimson Text, Merriweather)
- Clean white background with navy blue accents
- Responsive layout for all devices
- Print-friendly styles for academic papers

### 🗺️ Visitor Tracking System
- **Interactive world map** showing visitor locations
- **Real-time statistics**: Total visits, unique visitors, countries
- **Persistent data storage** using localStorage
- **Session-based tracking** (no duplicate counting on refresh)
- **Privacy-friendly** (all data stored locally in visitor's browser)

### 📊 Statistics Dashboard
- Total page visits
- Number of unique visitors
- Countries visited from
- Animated number counters

## 🚀 Live Demo

Visit the live site: **[https://kirnie-polyu.github.io/](https://kirnie-polyu.github.io/)**

### Additional Pages
- **Test Interface**: [/test-visitor-map.html](https://kirnie-polyu.github.io/test-visitor-map.html)
- **Example Integration**: [/index-with-map.html](https://kirnie-polyu.github.io/index-with-map.html)

## 📖 Documentation

- 📘 [Quick Start Guide](QUICK_START.md) - Get started quickly
- 📗 [Visitor Map Guide](VISITOR_MAP_GUIDE.md) - Complete visitor tracking documentation
- 📕 [Academic Style Guide](ACADEMIC_STYLE_GUIDE.md) - Design system documentation

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Mapping**: [Leaflet.js](https://leafletjs.com/)
- **Geolocation**: [ipapi.co](https://ipapi.co/)
- **Map Tiles**: OpenStreetMap
- **Hosting**: GitHub Pages
- **Fonts**: Google Fonts (Inter, Merriweather, Crimson Text)

## 📦 Project Structure

```
.
├── index.html                    # Main homepage with visitor map
├── index-with-map.html          # Example integration
├── test-visitor-map.html        # Testing interface
├── visitor-tracker.js           # Visitor tracking system
├── visitor-map.html             # Map HTML component
├── academic-override.css        # Academic styling
├── assets/                      # Compiled assets
│   ├── index-6U7VlNuQ.js
│   └── index-C6Id4bHB.css
├── Images/                      # Image assets
├── QUICK_START.md              # Quick start guide
├── VISITOR_MAP_GUIDE.md        # Visitor map documentation
├── ACADEMIC_STYLE_GUIDE.md     # Style guide
└── README.md                   # This file
```

## 🔧 Local Development

### Prerequisites
- Node.js (optional, for local server)
- Modern web browser
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kirnie-PolyU/Kirnie-PolyU.github.io.git
   cd Kirnie-PolyU.github.io
   ```

2. **Start a local server**
   ```bash
   # Using Python 3
   python -m http.server 8080
   
   # Or using Node.js
   npx http-server -p 8080
   ```

3. **Open in browser**
   ```
   http://localhost:8080
   ```

## 🗺️ Visitor Map Usage

### How It Works

1. When a visitor loads the page, the system checks if it's a new session
2. If new, it fetches the visitor's location via IP geolocation
3. The location is stored in browser's localStorage
4. A red dot marker is added to the world map
5. Statistics are updated and displayed

### Browser Console Commands

```javascript
// View current statistics
getVisitorStats()

// Reset all visitor data
resetVisitorData()

// Access tracker instance
window.visitorTracker
```

### Data Structure

```javascript
{
  totalVisits: 42,
  uniqueVisitors: 28,
  countries: ['USA', 'UK', 'Japan', ...],
  visitors: [
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

## 🎨 Customization

### Change Color Scheme

Edit `academic-override.css`:

```css
:root {
  --academic-primary: #1a365d;    /* Navy blue */
  --academic-secondary: #2c5282;  /* Medium blue */
  --academic-accent: #2b6cb0;     /* Bright blue */
  /* ... change to your colors */
}
```

### Modify Map Appearance

Edit `visitor-tracker.js`:

```javascript
// Change map tiles
L.tileLayer('YOUR_TILE_SERVER_URL', {
  attribution: 'Your attribution'
}).addTo(this.map);

// Change marker color
const redDotIcon = L.divIcon({
  html: '<div style="background-color: #your-color; ..."></div>'
});
```

### Update Typography

Edit `academic-override.css`:

```css
body {
  font-family: 'Your-Font', serif !important;
}
```

## 🔒 Privacy & Security

### Data Collection
- Only collects: IP address (for uniqueness), city, country, coordinates
- No personal information stored
- All data stored locally in visitor's browser

### GDPR Compliance
For production use, consider:
- Adding a cookie consent banner
- Providing an opt-out mechanism
- Including a privacy policy
- Anonymizing IP addresses

## 📊 API Limits

- **ipapi.co**: 1,000 requests per day (free tier)
- **OpenStreetMap tiles**: No strict limit, but please use responsibly

## 🐛 Troubleshooting

### Map not showing
1. Check browser console for errors
2. Verify Leaflet CSS and JS are loaded
3. Ensure container exists: `document.getElementById('world-map-container')`

### No visitor data
1. Check localStorage: `localStorage.getItem('visitorData')`
2. Verify API call: Check Network tab in DevTools
3. Clear session: `sessionStorage.clear()` then reload

### Statistics not updating
1. Open console: `getVisitorStats()`
2. Check if tracking is enabled
3. Try resetting: `resetVisitorData()`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Kirnie (PolyU)**
- GitHub: [@Kirnie-PolyU](https://github.com/Kirnie-PolyU)
- Website: [https://kirnie-polyu.github.io/](https://kirnie-polyu.github.io/)

## 🙏 Acknowledgments

- [Leaflet.js](https://leafletjs.com/) - Interactive map library
- [OpenStreetMap](https://www.openstreetmap.org/) - Map tiles
- [ipapi.co](https://ipapi.co/) - IP geolocation service
- [Google Fonts](https://fonts.google.com/) - Typography

## 📞 Support

If you have any questions or need help:
1. Check the [documentation files](QUICK_START.md)
2. Review the [issues](https://github.com/Kirnie-PolyU/Kirnie-PolyU.github.io/issues)
3. Open a new issue with your question

## ⭐ Star History

If you find this project helpful, please consider giving it a star! ⭐

---

**Built with ❤️ using modern web technologies**

Last Updated: December 19, 2024
