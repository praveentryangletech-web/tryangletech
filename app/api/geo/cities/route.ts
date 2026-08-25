import { NextResponse } from 'next/server';
import { LocationRegion } from '@/backend/services/geo/geo.types';

export const dynamic = 'force-dynamic';

export interface CitySearchResult {
  city: string;
  state: string;
  country: string;
  countryCode: string;
  region: LocationRegion;
  regionCode: string;
  slug: string;
  latitude: number;
  longitude: number;
  postalCode?: string;
  displayName: string;
}

// In-memory cache for fast search responses (TTL: 1 hour)
const searchCache = new Map<string, { data: CitySearchResult[]; timestamp: number }>();
const CACHE_TTL_MS = 60 * 60 * 1000;

// Curated instant static dataset for 0ms offline / instant autocomplete
const POPULAR_GLOBAL_CITIES: CitySearchResult[] = [
  // Gujarat Cities
  { city: 'Ahmedabad', state: 'Gujarat', country: 'India', countryCode: 'IN', region: 'Gujarat', regionCode: 'IN-GJ', slug: 'ahmedabad', latitude: 23.0225, longitude: 72.5714, displayName: 'Ahmedabad, Gujarat, India' },
  { city: 'Surat', state: 'Gujarat', country: 'India', countryCode: 'IN', region: 'Gujarat', regionCode: 'IN-GJ', slug: 'surat', latitude: 21.1702, longitude: 72.8311, displayName: 'Surat, Gujarat, India' },
  { city: 'Vadodara', state: 'Gujarat', country: 'India', countryCode: 'IN', region: 'Gujarat', regionCode: 'IN-GJ', slug: 'vadodara', latitude: 22.3072, longitude: 73.1812, displayName: 'Vadodara, Gujarat, India' },
  { city: 'Rajkot', state: 'Gujarat', country: 'India', countryCode: 'IN', region: 'Gujarat', regionCode: 'IN-GJ', slug: 'rajkot', latitude: 22.3039, longitude: 70.8022, displayName: 'Rajkot, Gujarat, India' },
  { city: 'Bhavnagar', state: 'Gujarat', country: 'India', countryCode: 'IN', region: 'Gujarat', regionCode: 'IN-GJ', slug: 'bhavnagar', latitude: 21.7645, longitude: 72.1519, displayName: 'Bhavnagar, Gujarat, India' },
  { city: 'Jamnagar', state: 'Gujarat', country: 'India', countryCode: 'IN', region: 'Gujarat', regionCode: 'IN-GJ', slug: 'jamnagar', latitude: 22.4707, longitude: 70.0577, displayName: 'Jamnagar, Gujarat, India' },
  { city: 'Gandhinagar', state: 'Gujarat', country: 'India', countryCode: 'IN', region: 'Gujarat', regionCode: 'IN-GJ', slug: 'gandhinagar', latitude: 23.2156, longitude: 72.6369, displayName: 'Gandhinagar, Gujarat, India' },
  { city: 'Junagadh', state: 'Gujarat', country: 'India', countryCode: 'IN', region: 'Gujarat', regionCode: 'IN-GJ', slug: 'junagadh', latitude: 21.5222, longitude: 70.4579, displayName: 'Junagadh, Gujarat, India' },
  { city: 'Anand', state: 'Gujarat', country: 'India', countryCode: 'IN', region: 'Gujarat', regionCode: 'IN-GJ', slug: 'anand', latitude: 22.5645, longitude: 72.9289, displayName: 'Anand, Gujarat, India' },
  { city: 'Navsari', state: 'Gujarat', country: 'India', countryCode: 'IN', region: 'Gujarat', regionCode: 'IN-GJ', slug: 'navsari', latitude: 20.9467, longitude: 72.9520, displayName: 'Navsari, Gujarat, India' },
  { city: 'Morbi', state: 'Gujarat', country: 'India', countryCode: 'IN', region: 'Gujarat', regionCode: 'IN-GJ', slug: 'morbi', latitude: 22.8120, longitude: 70.8378, displayName: 'Morbi, Gujarat, India' },
  { city: 'Vapi', state: 'Gujarat', country: 'India', countryCode: 'IN', region: 'Gujarat', regionCode: 'IN-GJ', slug: 'vapi', latitude: 20.3893, longitude: 72.9106, displayName: 'Vapi, Gujarat, India' },
  { city: 'Bharuch', state: 'Gujarat', country: 'India', countryCode: 'IN', region: 'Gujarat', regionCode: 'IN-GJ', slug: 'bharuch', latitude: 21.7051, longitude: 72.9959, displayName: 'Bharuch, Gujarat, India' },
  { city: 'Mehsana', state: 'Gujarat', country: 'India', countryCode: 'IN', region: 'Gujarat', regionCode: 'IN-GJ', slug: 'mehsana', latitude: 23.5880, longitude: 72.3693, displayName: 'Mehsana, Gujarat, India' },
  { city: 'Bhuj', state: 'Gujarat', country: 'India', countryCode: 'IN', region: 'Gujarat', regionCode: 'IN-GJ', slug: 'bhuj', latitude: 23.2420, longitude: 69.6669, displayName: 'Bhuj, Gujarat, India' },
  { city: 'Porbandar', state: 'Gujarat', country: 'India', countryCode: 'IN', region: 'Gujarat', regionCode: 'IN-GJ', slug: 'porbandar', latitude: 21.6417, longitude: 69.6293, displayName: 'Porbandar, Gujarat, India' },

  // Major India Metros & Cities
  { city: 'Mumbai', state: 'Maharashtra', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-MH', slug: 'mumbai', latitude: 19.0760, longitude: 72.8777, displayName: 'Mumbai, Maharashtra, India' },
  { city: 'Pune', state: 'Maharashtra', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-MH', slug: 'pune', latitude: 18.5204, longitude: 73.8567, displayName: 'Pune, Maharashtra, India' },
  { city: 'Nagpur', state: 'Maharashtra', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-MH', slug: 'nagpur', latitude: 21.1458, longitude: 79.0882, displayName: 'Nagpur, Maharashtra, India' },
  { city: 'Nashik', state: 'Maharashtra', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-MH', slug: 'nashik', latitude: 19.9975, longitude: 73.7898, displayName: 'Nashik, Maharashtra, India' },
  { city: 'Thane', state: 'Maharashtra', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-MH', slug: 'thane', latitude: 19.2183, longitude: 72.9781, displayName: 'Thane, Maharashtra, India' },
  { city: 'Navi Mumbai', state: 'Maharashtra', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-MH', slug: 'navi-mumbai', latitude: 19.0330, longitude: 73.0297, displayName: 'Navi Mumbai, Maharashtra, India' },
  { city: 'New Delhi', state: 'Delhi', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-DL', slug: 'new-delhi', latitude: 28.6139, longitude: 77.2090, displayName: 'New Delhi, Delhi, India' },
  { city: 'Delhi', state: 'Delhi', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-DL', slug: 'delhi', latitude: 28.7041, longitude: 77.1025, displayName: 'Delhi, India' },
  { city: 'Noida', state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-UP', slug: 'noida', latitude: 28.5355, longitude: 77.3910, displayName: 'Noida, Uttar Pradesh, India' },
  { city: 'Greater Noida', state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-UP', slug: 'greater-noida', latitude: 28.4744, longitude: 77.5040, displayName: 'Greater Noida, Uttar Pradesh, India' },
  { city: 'Gurgaon', state: 'Haryana', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-HR', slug: 'gurgaon', latitude: 28.4595, longitude: 77.0266, displayName: 'Gurgaon (Gurugram), Haryana, India' },
  { city: 'Faridabad', state: 'Haryana', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-HR', slug: 'faridabad', latitude: 28.4089, longitude: 77.3178, displayName: 'Faridabad, Haryana, India' },
  { city: 'Bengaluru', state: 'Karnataka', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-KA', slug: 'bengaluru', latitude: 12.9716, longitude: 77.5946, displayName: 'Bengaluru (Bangalore), Karnataka, India' },
  { city: 'Mysore', state: 'Karnataka', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-KA', slug: 'mysore', latitude: 12.2958, longitude: 76.6394, displayName: 'Mysore, Karnataka, India' },
  { city: 'Mangalore', state: 'Karnataka', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-KA', slug: 'mangalore', latitude: 12.9141, longitude: 74.8560, displayName: 'Mangalore, Karnataka, India' },
  { city: 'Hyderabad', state: 'Telangana', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-TG', slug: 'hyderabad', latitude: 17.3850, longitude: 78.4867, displayName: 'Hyderabad, Telangana, India' },
  { city: 'Warangal', state: 'Telangana', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-TG', slug: 'warangal', latitude: 17.9689, longitude: 79.5941, displayName: 'Warangal, Telangana, India' },
  { city: 'Chennai', state: 'Tamil Nadu', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-TN', slug: 'chennai', latitude: 13.0827, longitude: 80.2707, displayName: 'Chennai, Tamil Nadu, India' },
  { city: 'Coimbatore', state: 'Tamil Nadu', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-TN', slug: 'coimbatore', latitude: 11.0168, longitude: 76.9558, displayName: 'Coimbatore, Tamil Nadu, India' },
  { city: 'Madurai', state: 'Tamil Nadu', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-TN', slug: 'madurai', latitude: 9.9252, longitude: 78.1198, displayName: 'Madurai, Tamil Nadu, India' },
  { city: 'Kolkata', state: 'West Bengal', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-WB', slug: 'kolkata', latitude: 22.5726, longitude: 88.3639, displayName: 'Kolkata, West Bengal, India' },
  { city: 'Jaipur', state: 'Rajasthan', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-RJ', slug: 'jaipur', latitude: 26.9124, longitude: 75.7873, displayName: 'Jaipur, Rajasthan, India' },
  { city: 'Jodhpur', state: 'Rajasthan', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-RJ', slug: 'jodhpur', latitude: 26.2389, longitude: 73.0243, displayName: 'Jodhpur, Rajasthan, India' },
  { city: 'Udaipur', state: 'Rajasthan', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-RJ', slug: 'udaipur', latitude: 24.5854, longitude: 73.7125, displayName: 'Udaipur, Rajasthan, India' },
  { city: 'Kota', state: 'Rajasthan', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-RJ', slug: 'kota', latitude: 25.2138, longitude: 75.8648, displayName: 'Kota, Rajasthan, India' },
  { city: 'Varanasi', state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-UP', slug: 'varanasi', latitude: 25.3176, longitude: 82.9739, displayName: 'Varanasi, Uttar Pradesh, India' },
  { city: 'Lucknow', state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-UP', slug: 'lucknow', latitude: 26.8467, longitude: 80.9462, displayName: 'Lucknow, Uttar Pradesh, India' },
  { city: 'Kanpur', state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-UP', slug: 'kanpur', latitude: 26.4499, longitude: 80.3319, displayName: 'Kanpur, Uttar Pradesh, India' },
  { city: 'Agra', state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-UP', slug: 'agra', latitude: 27.1767, longitude: 78.0081, displayName: 'Agra, Uttar Pradesh, India' },
  { city: 'Prayagraj', state: 'Uttar Pradesh', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-UP', slug: 'prayagraj', latitude: 25.4358, longitude: 81.8463, displayName: 'Prayagraj (Allahabad), Uttar Pradesh, India' },
  { city: 'Indore', state: 'Madhya Pradesh', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-MP', slug: 'indore', latitude: 22.7196, longitude: 75.8577, displayName: 'Indore, Madhya Pradesh, India' },
  { city: 'Bhopal', state: 'Madhya Pradesh', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-MP', slug: 'bhopal', latitude: 23.2599, longitude: 77.4126, displayName: 'Bhopal, Madhya Pradesh, India' },
  { city: 'Gwalior', state: 'Madhya Pradesh', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-MP', slug: 'gwalior', latitude: 26.2183, longitude: 78.1828, displayName: 'Gwalior, Madhya Pradesh, India' },
  { city: 'Jabalpur', state: 'Madhya Pradesh', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-MP', slug: 'jabalpur', latitude: 23.1815, longitude: 79.9864, displayName: 'Jabalpur, Madhya Pradesh, India' },
  { city: 'Chandigarh', state: 'Chandigarh', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-CH', slug: 'chandigarh', latitude: 30.7333, longitude: 76.7794, displayName: 'Chandigarh, India' },
  { city: 'Ludhiana', state: 'Punjab', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-PB', slug: 'ludhiana', latitude: 30.9010, longitude: 75.8573, displayName: 'Ludhiana, Punjab, India' },
  { city: 'Amritsar', state: 'Punjab', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-PB', slug: 'amritsar', latitude: 31.6340, longitude: 74.8723, displayName: 'Amritsar, Punjab, India' },
  { city: 'Patna', state: 'Bihar', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-BR', slug: 'patna', latitude: 25.5941, longitude: 85.1376, displayName: 'Patna, Bihar, India' },
  { city: 'Ranchi', state: 'Jharkhand', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-JH', slug: 'ranchi', latitude: 23.3441, longitude: 85.3096, displayName: 'Ranchi, Jharkhand, India' },
  { city: 'Bhubaneswar', state: 'Odisha', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-OR', slug: 'bhubaneswar', latitude: 20.2961, longitude: 85.8245, displayName: 'Bhubaneswar, Odisha, India' },
  { city: 'Cuttack', state: 'Odisha', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-OR', slug: 'cuttack', latitude: 20.4625, longitude: 85.8828, displayName: 'Cuttack, Odisha, India' },
  { city: 'Kochi', state: 'Kerala', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-KL', slug: 'kochi', latitude: 9.9312, longitude: 76.2673, displayName: 'Kochi (Cochin), Kerala, India' },
  { city: 'Thiruvananthapuram', state: 'Kerala', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-KL', slug: 'thiruvananthapuram', latitude: 8.5241, longitude: 76.9366, displayName: 'Thiruvananthapuram, Kerala, India' },
  { city: 'Visakhapatnam', state: 'Andhra Pradesh', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-AP', slug: 'visakhapatnam', latitude: 17.6868, longitude: 83.2185, displayName: 'Visakhapatnam, Andhra Pradesh, India' },
  { city: 'Vijayawada', state: 'Andhra Pradesh', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-AP', slug: 'vijayawada', latitude: 16.5062, longitude: 80.6480, displayName: 'Vijayawada, Andhra Pradesh, India' },
  { city: 'Guwahati', state: 'Assam', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-AS', slug: 'guwahati', latitude: 26.1445, longitude: 91.7362, displayName: 'Guwahati, Assam, India' },
  { city: 'Dehradun', state: 'Uttarakhand', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-UT', slug: 'dehradun', latitude: 30.3165, longitude: 78.0322, displayName: 'Dehradun, Uttarakhand, India' },
  { city: 'Raipur', state: 'Chhattisgarh', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-CT', slug: 'raipur', latitude: 21.2514, longitude: 81.6296, displayName: 'Raipur, Chhattisgarh, India' },
  { city: 'Goa', state: 'Goa', country: 'India', countryCode: 'IN', region: 'India Metros', regionCode: 'IN-GA', slug: 'goa', latitude: 15.2993, longitude: 74.1240, displayName: 'Panaji, Goa, India' },

  // Middle East Hubs
  { city: 'Dubai', state: 'Dubai', country: 'United Arab Emirates', countryCode: 'AE', region: 'Middle East', regionCode: 'AE-DU', slug: 'dubai', latitude: 25.2048, longitude: 55.2708, displayName: 'Dubai, UAE' },
  { city: 'Abu Dhabi', state: 'Abu Dhabi', country: 'United Arab Emirates', countryCode: 'AE', region: 'Middle East', regionCode: 'AE-AZ', slug: 'abu-dhabi', latitude: 24.4539, longitude: 54.3773, displayName: 'Abu Dhabi, UAE' },
  { city: 'Sharjah', state: 'Sharjah', country: 'United Arab Emirates', countryCode: 'AE', region: 'Middle East', regionCode: 'AE-SH', slug: 'sharjah', latitude: 25.3463, longitude: 55.4209, displayName: 'Sharjah, UAE' },
  { city: 'Riyadh', state: 'Riyadh Province', country: 'Saudi Arabia', countryCode: 'SA', region: 'Middle East', regionCode: 'SA-01', slug: 'riyadh', latitude: 24.7136, longitude: 46.6753, displayName: 'Riyadh, Saudi Arabia' },
  { city: 'Jeddah', state: 'Makkah Province', country: 'Saudi Arabia', countryCode: 'SA', region: 'Middle East', regionCode: 'SA-02', slug: 'jeddah', latitude: 21.4858, longitude: 39.1925, displayName: 'Jeddah, Saudi Arabia' },
  { city: 'Doha', state: 'Ad Dawhah', country: 'Qatar', countryCode: 'QA', region: 'Middle East', regionCode: 'QA-DA', slug: 'doha', latitude: 25.2854, longitude: 51.5310, displayName: 'Doha, Qatar' },
  { city: 'Kuwait City', state: 'Al Asimah', country: 'Kuwait', countryCode: 'KW', region: 'Middle East', regionCode: 'KW-KU', slug: 'kuwait-city', latitude: 29.3759, longitude: 47.9774, displayName: 'Kuwait City, Kuwait' },
  { city: 'Muscat', state: 'Muscat', country: 'Oman', countryCode: 'OM', region: 'Middle East', regionCode: 'OM-MA', slug: 'muscat', latitude: 23.5880, longitude: 58.3829, displayName: 'Muscat, Oman' },
  { city: 'Manama', state: 'Capital Governorate', country: 'Bahrain', countryCode: 'BH', region: 'Middle East', regionCode: 'BH-13', slug: 'manama', latitude: 26.2285, longitude: 50.5860, displayName: 'Manama, Bahrain' },

  // USA & Canada
  { city: 'New York', state: 'New York', country: 'United States', countryCode: 'US', region: 'USA & Canada', regionCode: 'US-NY', slug: 'new-york', latitude: 40.7128, longitude: -74.0060, displayName: 'New York City, NY, USA' },
  { city: 'San Francisco', state: 'California', country: 'United States', countryCode: 'US', region: 'USA & Canada', regionCode: 'US-CA', slug: 'san-francisco', latitude: 37.7749, longitude: -122.4194, displayName: 'San Francisco, CA, USA' },
  { city: 'Los Angeles', state: 'California', country: 'United States', countryCode: 'US', region: 'USA & Canada', regionCode: 'US-CA', slug: 'los-angeles', latitude: 34.0522, longitude: -118.2437, displayName: 'Los Angeles, CA, USA' },
  { city: 'Chicago', state: 'Illinois', country: 'United States', countryCode: 'US', region: 'USA & Canada', regionCode: 'US-IL', slug: 'chicago', latitude: 41.8781, longitude: -87.6298, displayName: 'Chicago, IL, USA' },
  { city: 'Austin', state: 'Texas', country: 'United States', countryCode: 'US', region: 'USA & Canada', regionCode: 'US-TX', slug: 'austin', latitude: 30.2672, longitude: -97.7431, displayName: 'Austin, TX, USA' },
  { city: 'Dallas', state: 'Texas', country: 'United States', countryCode: 'US', region: 'USA & Canada', regionCode: 'US-TX', slug: 'dallas', latitude: 32.7767, longitude: -96.7970, displayName: 'Dallas, TX, USA' },
  { city: 'Seattle', state: 'Washington', country: 'United States', countryCode: 'US', region: 'USA & Canada', regionCode: 'US-WA', slug: 'seattle', latitude: 47.6062, longitude: -122.3321, displayName: 'Seattle, WA, USA' },
  { city: 'Boston', state: 'Massachusetts', country: 'United States', countryCode: 'US', region: 'USA & Canada', regionCode: 'US-MA', slug: 'boston', latitude: 42.3601, longitude: -71.0589, displayName: 'Boston, MA, USA' },
  { city: 'Miami', state: 'Florida', country: 'United States', countryCode: 'US', region: 'USA & Canada', regionCode: 'US-FL', slug: 'miami', latitude: 25.7617, longitude: -80.1918, displayName: 'Miami, FL, USA' },
  { city: 'Toronto', state: 'Ontario', country: 'Canada', countryCode: 'CA', region: 'USA & Canada', regionCode: 'CA-ON', slug: 'toronto', latitude: 43.6532, longitude: -79.3832, displayName: 'Toronto, ON, Canada' },
  { city: 'Vancouver', state: 'British Columbia', country: 'Canada', countryCode: 'CA', region: 'USA & Canada', regionCode: 'CA-BC', slug: 'vancouver', latitude: 49.2827, longitude: -123.1207, displayName: 'Vancouver, BC, Canada' },
  { city: 'Montreal', state: 'Quebec', country: 'Canada', countryCode: 'CA', region: 'USA & Canada', regionCode: 'CA-QC', slug: 'montreal', latitude: 45.5017, longitude: -73.5673, displayName: 'Montreal, QC, Canada' },

  // Europe & UK
  { city: 'London', state: 'England', country: 'United Kingdom', countryCode: 'GB', region: 'Europe & UK', regionCode: 'GB-ENG', slug: 'london', latitude: 51.5074, longitude: -0.1278, displayName: 'London, England, UK' },
  { city: 'Manchester', state: 'England', country: 'United Kingdom', countryCode: 'GB', region: 'Europe & UK', regionCode: 'GB-ENG', slug: 'manchester', latitude: 53.4808, longitude: -2.2426, displayName: 'Manchester, England, UK' },
  { city: 'Birmingham', state: 'England', country: 'United Kingdom', countryCode: 'GB', region: 'Europe & UK', regionCode: 'GB-ENG', slug: 'birmingham', latitude: 52.4862, longitude: -1.8904, displayName: 'Birmingham, England, UK' },
  { city: 'Berlin', state: 'Berlin', country: 'Germany', countryCode: 'DE', region: 'Europe & UK', regionCode: 'DE-BE', slug: 'berlin', latitude: 52.5200, longitude: 13.4050, displayName: 'Berlin, Germany' },
  { city: 'Munich', state: 'Bavaria', country: 'Germany', countryCode: 'DE', region: 'Europe & UK', regionCode: 'DE-BY', slug: 'munich', latitude: 48.1351, longitude: 11.5820, displayName: 'Munich, Germany' },
  { city: 'Frankfurt', state: 'Hesse', country: 'Germany', countryCode: 'DE', region: 'Europe & UK', regionCode: 'DE-HE', slug: 'frankfurt', latitude: 50.1109, longitude: 8.6821, displayName: 'Frankfurt, Germany' },
  { city: 'Paris', state: 'Île-de-France', country: 'France', countryCode: 'FR', region: 'Europe & UK', regionCode: 'FR-IDF', slug: 'paris', latitude: 48.8566, longitude: 2.3522, displayName: 'Paris, France' },
  { city: 'Amsterdam', state: 'North Holland', country: 'Netherlands', countryCode: 'NL', region: 'Europe & UK', regionCode: 'NL-NH', slug: 'amsterdam', latitude: 52.3676, longitude: 4.9041, displayName: 'Amsterdam, Netherlands' },
  { city: 'Dublin', state: 'Leinster', country: 'Ireland', countryCode: 'IE', region: 'Europe & UK', regionCode: 'IE-L', slug: 'dublin', latitude: 53.3498, longitude: -6.2603, displayName: 'Dublin, Ireland' },
  { city: 'Zurich', state: 'Zurich', country: 'Switzerland', countryCode: 'CH', region: 'Europe & UK', regionCode: 'CH-ZH', slug: 'zurich', latitude: 47.3769, longitude: 8.5417, displayName: 'Zurich, Switzerland' },
  { city: 'Stockholm', state: 'Stockholm', country: 'Sweden', countryCode: 'SE', region: 'Europe & UK', regionCode: 'SE-AB', slug: 'stockholm', latitude: 59.3293, longitude: 18.0686, displayName: 'Stockholm, Sweden' },

  // Global Hubs
  { city: 'Singapore', state: 'Singapore', country: 'Singapore', countryCode: 'SG', region: 'Global Hubs', regionCode: 'SG-01', slug: 'singapore', latitude: 1.3521, longitude: 103.8198, displayName: 'Singapore, Singapore' },
  { city: 'Sydney', state: 'New South Wales', country: 'Australia', countryCode: 'AU', region: 'Global Hubs', regionCode: 'AU-NSW', slug: 'sydney', latitude: -33.8688, longitude: 151.2093, displayName: 'Sydney, NSW, Australia' },
  { city: 'Melbourne', state: 'Victoria', country: 'Australia', countryCode: 'AU', region: 'Global Hubs', regionCode: 'AU-VIC', slug: 'melbourne', latitude: -37.8136, longitude: 144.9631, displayName: 'Melbourne, VIC, Australia' },
  { city: 'Tokyo', state: 'Tokyo', country: 'Japan', countryCode: 'JP', region: 'Global Hubs', regionCode: 'JP-13', slug: 'tokyo', latitude: 35.6762, longitude: 139.6503, displayName: 'Tokyo, Japan' },
  { city: 'Auckland', state: 'Auckland', country: 'New Zealand', countryCode: 'NZ', region: 'Global Hubs', regionCode: 'NZ-AUK', slug: 'auckland', latitude: -36.8485, longitude: 174.7633, displayName: 'Auckland, New Zealand' },
];

/**
 * Intelligent Region classifier
 */
function inferRegion(country: string, state?: string, city?: string): LocationRegion {
  const c = (country || '').toLowerCase().trim();
  const s = (state || '').toLowerCase().trim();
  const ci = (city || '').toLowerCase().trim();

  // 1. Gujarat check
  if (
    c === 'india' &&
    (s.includes('gujarat') ||
      ['ahmedabad', 'surat', 'vadodara', 'rajkot', 'bhavnagar', 'jamnagar', 'gandhinagar', 'junagadh', 'anand', 'navsari', 'morbi', 'vapi', 'bharuch', 'mehsana', 'bhuj', 'porbandar'].includes(ci))
  ) {
    return 'Gujarat';
  }

  // 2. India Metros
  if (c === 'india' || c === 'in') {
    return 'India Metros';
  }

  // 3. Middle East
  const middleEastCountries = ['united arab emirates', 'uae', 'saudi arabia', 'qatar', 'kuwait', 'oman', 'bahrain'];
  if (middleEastCountries.includes(c) || ['dubai', 'abu dhabi', 'sharjah', 'riyadh', 'jeddah', 'doha', 'kuwait city', 'muscat', 'manama'].includes(ci)) {
    return 'Middle East';
  }

  // 4. USA & Canada
  const usaCanada = ['united states', 'united states of america', 'usa', 'us', 'canada', 'ca'];
  if (usaCanada.includes(c)) {
    return 'USA & Canada';
  }

  // 5. Europe & UK
  const europeUK = ['united kingdom', 'uk', 'great britain', 'england', 'scotland', 'wales', 'germany', 'france', 'netherlands', 'ireland', 'spain', 'italy', 'switzerland', 'sweden', 'norway', 'denmark', 'poland', 'belgium', 'austria', 'finland', 'portugal'];
  if (europeUK.includes(c)) {
    return 'Europe & UK';
  }

  // 6. Global Hubs
  return 'Global Hubs';
}

function cleanSlug(cityName: string): string {
  return cityName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Fetch results from Photon OpenStreetMap Geocoding API
 */
async function fetchPhotonCities(query: string): Promise<CitySearchResult[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=10`, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'TryangleTechLocationSearch/1.0',
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) return [];

    const json = await res.json();
    const features = json?.features || [];

    const results: CitySearchResult[] = [];

    for (const f of features) {
      const props = f?.properties || {};
      const geom = f?.geometry?.coordinates || [];

      const rawCity = props.name || props.city || props.town || props.district || props.county || '';
      if (!rawCity) continue;

      const state = props.state || props.county || '';
      const country = props.country || '';
      const countryCode = (props.countrycode || '').toUpperCase() || 'IN';
      const lon = Array.isArray(geom) && geom.length >= 2 ? Number(geom[0]) : 72.8311;
      const lat = Array.isArray(geom) && geom.length >= 2 ? Number(geom[1]) : 21.1702;
      const postcode = props.postcode || undefined;

      const region = inferRegion(country, state, rawCity);
      const regionCode = countryCode === 'IN' ? (state ? `IN-${state.slice(0, 2).toUpperCase()}` : 'IN-GJ') : `${countryCode}-01`;

      const displayParts = [rawCity];
      if (state && state !== rawCity) displayParts.push(state);
      if (country) displayParts.push(country);

      results.push({
        city: rawCity,
        state: state || rawCity,
        country: country || 'India',
        countryCode,
        region,
        regionCode,
        slug: cleanSlug(rawCity),
        latitude: lat,
        longitude: lon,
        postalCode: postcode,
        displayName: displayParts.join(', '),
      });
    }

    return results;
  } catch {
    return [];
  }
}

/**
 * Fetch results from OpenStreetMap Nominatim as fallback
 */
async function fetchNominatimCities(query: string): Promise<CitySearchResult[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=8`, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'TryangleTechCitySearch/1.0',
      },
    });

    clearTimeout(timeoutId);
    if (!res.ok) return [];

    const list = await res.json();
    if (!Array.isArray(list)) return [];

    const results: CitySearchResult[] = [];

    for (const item of list) {
      const addr = item?.address || {};
      const rawCity = addr.city || addr.town || addr.municipality || addr.village || addr.suburb || addr.state_district || item.name || '';
      if (!rawCity) continue;

      const state = addr.state || addr.region || '';
      const country = addr.country || 'India';
      const countryCode = (addr.country_code || 'in').toUpperCase();
      const lat = parseFloat(item.lat) || 23.0225;
      const lon = parseFloat(item.lon) || 72.5714;
      const postcode = addr.postcode || undefined;

      const region = inferRegion(country, state, rawCity);
      const regionCode = countryCode === 'IN' ? (state ? `IN-${state.slice(0, 2).toUpperCase()}` : 'IN-GJ') : `${countryCode}-01`;

      const displayParts = [rawCity];
      if (state && state !== rawCity) displayParts.push(state);
      if (country) displayParts.push(country);

      results.push({
        city: rawCity,
        state: state || rawCity,
        country,
        countryCode,
        region,
        regionCode,
        slug: cleanSlug(rawCity),
        latitude: lat,
        longitude: lon,
        postalCode: postcode,
        displayName: displayParts.join(', '),
      });
    }

    return results;
  } catch {
    return [];
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = (searchParams.get('q') || '').trim();

    if (!query) {
      // Return top curated suggestions
      return NextResponse.json({
        success: true,
        data: POPULAR_GLOBAL_CITIES.slice(0, 15),
        count: 15,
      });
    }

    const cacheKey = query.toLowerCase();
    const cached = searchCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return NextResponse.json({
        success: true,
        data: cached.data,
        count: cached.data.length,
        source: 'cache',
      });
    }

    // 1. Instant local search from curated database
    const queryLower = query.toLowerCase();
    const localMatches = POPULAR_GLOBAL_CITIES.filter(
      (c) =>
        c.city.toLowerCase().includes(queryLower) ||
        c.state.toLowerCase().includes(queryLower) ||
        c.country.toLowerCase().includes(queryLower) ||
        c.displayName.toLowerCase().includes(queryLower)
    );

    // 2. Fetch live results from OpenStreetMap Photon Geocoder in parallel
    let liveResults = await fetchPhotonCities(query);

    // If Photon returned 0 results, query Nominatim Geocoder
    if (liveResults.length === 0 && localMatches.length === 0) {
      liveResults = await fetchNominatimCities(query);
    }

    // 3. Merge and deduplicate by city + country
    const seen = new Set<string>();
    const merged: CitySearchResult[] = [];

    // Prioritize exact/prefix local matches first
    for (const item of localMatches) {
      const key = `${item.city.toLowerCase()}_${item.country.toLowerCase()}`;
      if (!seen.has(key)) {
        seen.add(key);
        merged.push(item);
      }
    }

    // Add live geocoded results
    for (const item of liveResults) {
      const key = `${item.city.toLowerCase()}_${item.country.toLowerCase()}`;
      if (!seen.has(key)) {
        seen.add(key);
        merged.push(item);
      }
    }

    const finalResults = merged.slice(0, 10);
    if (finalResults.length > 0) {
      searchCache.set(cacheKey, { data: finalResults, timestamp: Date.now() });
    }

    return NextResponse.json({
      success: true,
      data: finalResults,
      count: finalResults.length,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Error searching cities',
        data: [],
      },
      { status: 500 }
    );
  }
}
