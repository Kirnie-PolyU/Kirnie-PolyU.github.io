/**
 * Navigation Injection Script
 * Adds a Contact link to the navigation menu dynamically
 */

(function() {
  'use strict';
  
  function addContactLink() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', addContactLink);
      return;
    }
    
    // Try to find navigation elements
    const selectors = [
      'nav',
      'header nav',
      '[role="navigation"]',
      'div[class*="nav"]',
      'header'
    ];
    
    let navElement = null;
    for (const selector of selectors) {
      navElement = document.querySelector(selector);
      if (navElement) break;
    }
    
    if (!navElement) {
      console.log('Navigation element not found, retrying...');
      setTimeout(addContactLink, 500);
      return;
    }
    
    // Check if Contact link already exists
    const existingContact = Array.from(navElement.querySelectorAll('a')).find(
      a => a.textContent.includes('Contact') || a.href.includes('contact')
    );
    
    if (existingContact) {
      console.log('Contact link already exists');
      return;
    }
    
    // Create Contact link
    const contactLink = document.createElement('a');
    contactLink.href = '/contact';
    contactLink.textContent = '📬 Contact';
    contactLink.style.cssText = `
      color: inherit;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: all 0.2s ease;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 0.95rem;
      letter-spacing: 0.025em;
    `;
    
    // Add hover effect
    contactLink.addEventListener('mouseenter', function() {
      this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      this.style.transform = 'translateY(-2px)';
    });
    
    contactLink.addEventListener('mouseleave', function() {
      this.style.backgroundColor = 'transparent';
      this.style.transform = 'translateY(0)';
    });
    
    // Try to find the best place to insert
    const navLinks = navElement.querySelectorAll('a');
    if (navLinks.length > 0) {
      // Add after the last link
      const lastLink = navLinks[navLinks.length - 1];
      lastLink.parentNode.insertBefore(contactLink, lastLink.nextSibling);
    } else {
      // Just append to nav
      navElement.appendChild(contactLink);
    }
    
    console.log('Contact link added to navigation');
  }
  
  // Start the process
  addContactLink();
  
  // Also try after a delay in case the React app hasn't fully loaded
  setTimeout(addContactLink, 1000);
  setTimeout(addContactLink, 2000);
})();
