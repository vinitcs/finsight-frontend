/**
 * Theme Color System - Professional Blue + Green
 * 
 * CENTRALIZED COLOR CONFIGURATION
 * All colors are defined in src/theme/colors.js
 * 
 * ===== PRIMARY COLORS =====
 * Navy (#1E3A5F) - Deep Navy - Primary dark color for headers, navbars, sidebars
 * Primary Blue (#2563EB) - For UI elements, buttons, interactive components, links
 * Positive Green (#16A34A) - For income/profit indicators, success states, borders (on navy)
 * Background Gray (#F3F4F6) - Light background for main content areas
 * 
 * ===== USAGE GUIDE =====
 * 
 * 1. IMPORTING COLORS:
 *    import { COLORS } from '../theme/colors'
 * 
 * 2. IN TAILWIND CLASSES:
 *    // Note: If color is not directly in Tailwind, use inline styles
 *    className="bg-slate-950" // for very dark backgrounds
 *    className="border border-slate-200" // for light borders
 * 
 * 3. INLINE STYLES (Recommended for theme colors):
 *    style={{ backgroundColor: '#1E3A5F' }} // Navy background
 *    style={{ backgroundColor: '#2563EB' }} // Primary button
 *    style={{ backgroundColor: '#16A34A' }} // Success state
 *    style={{ backgroundColor: '#F3F4F6' }} // Light background
 *    style={{ color: '#1E3A5F' }} // Navy text
 *    style={{ color: '#2563EB' }} // Blue text
 *    style={{ borderColor: '#16A34A' }} // Green borders
 * 
 * ===== COMPONENT USAGE EXAMPLES =====
 * 
 * BUTTONS:
 *   <Button style={{ backgroundColor: '#2563EB' }}>Click me</Button>
 * 
 * NAVBAR:
 *   <div style={{ backgroundColor: '#1E3A5F', borderColor: '#16A34A' }}>
 *     Navbar content
 *   </div>
 * 
 * CARDS:
 *   <div className="bg-white border border-slate-200 rounded-xl p-6">
 *     Card content with navy headers
 *   </div>
 * 
 * LINKS:
 *   <Link style={{ color: '#2563EB' }}>Link text</Link>
 * 
 * STATUS COLORS:
 *   - Success (Green): #16A34A
 *   - Error (Red): #DC2626
 *   - Warning (Yellow): #F59E0B
 *   - Info (Blue): #2563EB
 * 
 * BACKGROUND:
 *   - Light: #F3F4F6 (main background)
 *   - White: #FFFFFF (card backgrounds)
 *   - Navy: #1E3A5F (navbar, sidebar)
 * 
 * TEXT COLORS:
 *   - Primary: #FFFFFF (white text on dark backgrounds)
 *   - Dark: #0F172A (dark text on light backgrounds)
 *   - Secondary: #E2E8F0 (light gray text)
 *   - Muted: #94A3B8 (muted gray text)
 * 
 * ===== TAILWIND CONFIG =====
 * The tailwind.config.js has been updated to include custom colors:
 * - navy: { 950: '#1E3A5F' }
 * - Custom utilities for primary, success, light backgrounds
 * 
 * ===== FILES UPDATED WITH NEW THEME =====
 * 
 * Auth Pages:
 *   - src/pages/Auth/Login.jsx
 *   - src/pages/Auth/Register.jsx
 * 
 * Layout Components:
 *   - src/components/layout/Navbar.jsx
 *   - src/components/layout/Sidebar.jsx
 *   - src/components/layout/PageWrapper.jsx
 * 
 * Common Components:
 *   - src/components/common/Button.jsx
 *   - src/components/common/Input.jsx
 *   - src/components/common/Badge.jsx
 *   - src/components/common/EmptyState.jsx
 *   - src/components/common/Modal.jsx
 *   - src/components/common/Toast.jsx
 * 
 * Chart Components:
 *   - src/components/charts/BarChartWidget.jsx
 *   - src/components/charts/PieChartWidget.jsx
 *   - src/components/charts/LineChartWidget.jsx
 * 
 * Pages:
 *   - src/pages/Dashboard/Dashboard.jsx
 * 
 * ===== COLOR PALETTE REFERENCE =====
 * 
 * PRIMARY (Navy):
 *   - Hex: #1E3A5F
 *   - RGB: 30, 58, 95
 *   - Use for: Headers, navbars, sidebars, primary text headings
 * 
 * PRIMARY (Blue):
 *   - Hex: #2563EB
 *   - RGB: 37, 99, 235
 *   - Use for: Buttons, links, interactive elements, focus states
 * 
 * SUCCESS (Green):
 *   - Hex: #16A34A
 *   - RGB: 22, 163, 74
 *   - Use for: Income/profit, positive indicators, success messages
 * 
 * BACKGROUND (Light Gray):
 *   - Hex: #F3F4F6
 *   - RGB: 243, 244, 246
 *   - Use for: Main page backgrounds
 * 
 * DANGER (Red):
 *   - Hex: #DC2626
 *   - RGB: 220, 38, 38
 *   - Use for: Errors, deletions, warnings
 * 
 * WARNING (Yellow):
 *   - Hex: #F59E0B
 *   - RGB: 245, 158, 11
 *   - Use for: Warnings, cautions, alerts
 * 
 * ===== BEST PRACTICES =====
 * 
 * 1. Always use the theme colors from src/theme/colors.js for consistency
 * 2. Use Tailwind classes for common utilities (padding, margins, spacing)
 * 3. Use inline styles for custom theme colors
 * 4. Maintain contrast ratios for accessibility
 * 5. Use white cards (bg-white) on the light gray background (#F3F4F6)
 * 6. Maintain the navy color for headers and navigation
 * 7. Use blue for all calls-to-action (buttons, links)
 * 8. Use green to highlight positive financial metrics
 * 9. Use red for expenses/debits
 * 10. Ensure sufficient spacing between different UI elements
 */
