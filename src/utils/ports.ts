/**
 * Safe Development Port Ranges Guide
 * Organized by typical usage and likelihood of conflicts
 */

const PORT_RANGES = {
  // Very Safe (8000-8999) - Rarely used by system services
  VERY_SAFE: {
    FRONTEND: [8080, 8081, 8082, 8088, 8089],
    BACKEND: [8000, 8001, 8002, 8003, 8004],
    API: [8443, 8444, 8445, 8446],
    WEBSOCKET: [8800, 8801, 8802],
  },

  // Safe (3000-3999) - Common for development
  COMMON_DEV: {
    FRONTEND: [3000, 3001, 3002], // React default
    BACKEND: [3030, 3031, 3032],
    API: [3333, 3334, 3335],
    DATABASE: [3306, 3307], // MySQL default
  },

  // Modern Dev (4000-4999) - Popular with newer frameworks
  MODERN_DEV: {
    FRONTEND: [4000, 4001, 4002],
    BACKEND: [4040, 4041, 4042],
    API: [4444, 4445, 4446],
    SERVICES: [4200, 4201], // Angular default
  },

  // High Range (9000-9999) - Very unlikely to conflict
  HIGH_RANGE: {
    FRONTEND: [9000, 9001, 9002],
    BACKEND: [9090, 9091, 9092],
    API: [9443, 9444, 9445],
    WEBSOCKET: [9500, 9501, 9502],
  },

  // Vite Specific (5000-5999) - Modern build tools
  VITE_RANGE: {
    DEV: [5173, 5174, 5175], // Vite default
    PREVIEW: [4173, 4174, 4175],
    HMR: [5000, 5001, 5002],
  },

  // System Ports to AVOID (0-1023)
  SYSTEM_RESERVED: {
    AVOID: [80, 443, 22, 21, 25, 587, 3306, 5432],
    // HTTP, HTTPS, SSH, FTP, SMTP, etc.
  },
};

// Example usage in config files
const config = {
  development: {
    frontend: PORT_RANGES.VERY_SAFE.FRONTEND[0], // 8080
    backend: PORT_RANGES.VERY_SAFE.BACKEND[0], // 8000
    api: PORT_RANGES.VERY_SAFE.API[0], // 8443
  },
  testing: {
    frontend: PORT_RANGES.HIGH_RANGE.FRONTEND[0], // 9000
    backend: PORT_RANGES.HIGH_RANGE.BACKEND[0], // 9090
  },
  vite: {
    dev: PORT_RANGES.VITE_RANGE.DEV[0], // 5173
  },
};
