export const quickServices = [
  {
    id: 'qs1',
    name: 'Flat Tire Replacement',
    icon: 'Tire.png', // Updated to match the PNG file in src/assets
    description: 'Fast replacement for your flat tire. Get back on the road quickly.',
    price: 25, // Example price
    duration: 'Approx. 30 mins',
    isSameDay: true,
  },
  {
    id: 'qs2',
    name: 'Brake Adjustment',
    icon: 'Brake.png', // Updated to match the PNG file in src/assets
    description: 'Quick check and adjustment for optimal braking performance.',
    price: 30,
    duration: 'Approx. 20 mins',
    isSameDay: true,
  },
  {
    id: 'qs3',
    name: 'Gear Indexing',
    icon: 'Gear.png', // Updated to match the PNG file in src/assets
    description: 'Smooth out your gear shifting with a quick tune-up.',
    price: 35,
    duration: 'Approx. 25 mins',
    isSameDay: true,
  },
];

export const servicePackages = [
  {
    id: 'pkg1',
    name: 'Basic Tune-Up',
    price: 40,
    shortDescription: 'Check brakes, inflate tires, basic safety check.',
    fullDescription: 'Our Basic Tune-Up includes a thorough safety inspection, brake check and adjustment, tire inflation to optimal pressure, and a quick lubrication of key components. Ideal for bikes that need a little TLC.',
    items: ['Safety Inspection', 'Brake Check & Adjustment', 'Tire Inflation', 'Key Component Lubrication'],
    duration: 'Approx. 1 hour'
  },
  {
    id: 'pkg2',
    name: 'Full Tune-Up',
    price: 70,
    shortDescription: 'Brake adjustment, gear alignment, chain lubrication, safety check.',
    fullDescription: 'Our Full Tune-Up includes a comprehensive check of brakes, precise gear alignment, thorough chain cleaning and lubrication, wheel truing (minor), and a complete safety inspection. Perfect for regular riders and ensuring your bike is in top condition.',
    items: ['Comprehensive Brake Adjustment', 'Precise Gear Alignment', 'Chain Clean & Lube', 'Minor Wheel Truing', 'Full Safety Inspection'],
    duration: 'Approx. 2 hours'
  },
  {
    id: 'pkg3',
    name: 'Premium Overhaul',
    price: 120,
    shortDescription: 'Full Tune-Up + deep clean and component check.',
    fullDescription: 'The Premium Overhaul is our most comprehensive service. It includes everything in the Full Tune-Up, plus a deep clean of the drivetrain, detailed inspection of all components for wear, and headset/bottom bracket adjustment. Parts extra if needed.',
    items: ['All Full Tune-Up items', 'Drivetrain Deep Clean', 'Detailed Component Wear Inspection', 'Headset & Bottom Bracket Adjustment'],
    duration: 'Approx. 3-4 hours'
  },
];

export const allServices = [
  ...quickServices.map(s => ({ ...s, type: 'quick' })),
  ...servicePackages.map(s => ({ ...s, type: 'package' }))
];

export const findServiceById = (id) => {
  return allServices.find(service => service.id === id);
};