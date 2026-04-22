const packages = [
  {
    id: 1,
    name: "Goa Beach Escape",
    location: "Goa",
    days: 3,
    price: 12000,
    rating: 4.3,
    image: "/images/goa.jpg",
    description: "Enjoy beaches, nightlife and water sports.",

    // ➕ ADDED ONLY
    highlights: ["Beaches", "Nightlife", "Water Sports"],
    itinerary: ["Day 1: Arrival", "Day 2: Beaches & Activities", "Day 3: Departure"],
    inclusions: ["Hotel Stay", "Breakfast", "Sightseeing"],
    exclusions: ["Flights", "Personal expenses"]
  },
  {
    id: 2,
    name: "Royal Rajasthan Tour",
    location: "Rajasthan",
    days: 5,
    price: 25000,
    rating: 4.5,
    image: "/images/rajasthan.jpg",
    description: "Explore forts, palaces and desert culture.",

    // ➕ ADDED ONLY
    highlights: ["Forts", "Palaces", "Desert Safari"],
    itinerary: ["Day 1: Jaipur Arrival", "Day 2: Fort Visit", "Day 3: Udaipur Travel", "Day 4: Sightseeing", "Day 5: Return"],
    inclusions: ["Hotel", "Meals", "Transport"],
    exclusions: ["Entry tickets", "Flights"]
  },
  {
    id: 3,
    name: "Kerala Backwaters",
    location: "Kerala",
    days: 4,
    price: 18000,
    rating: 4.6,
    image: "/images/kerala.jpg",
    description: "Relax in houseboats and beautiful backwaters.",

    highlights: ["Houseboat Stay", "Backwaters", "Nature"],
    itinerary: ["Day 1: Arrival", "Day 2: Houseboat", "Day 3: Sightseeing", "Day 4: Departure"],
    inclusions: ["Houseboat", "Meals", "Transport"],
    exclusions: ["Flights", "Personal expenses"]
  },
  {
    id: 4,
    name: "Himachal Adventure",
    location: "Himachal Pradesh",
    days: 6,
    price: 22000,
    rating: 4.8,
    image: "/images/himachal.jpg",
    description: "Snow mountains and trekking.",

    highlights: ["Snow Mountains", "Trekking", "Adventure"],
    itinerary: ["Day 1: Arrival", "Day 2-5: Adventure Activities", "Day 6: Return"],
    inclusions: ["Hotel", "Guide", "Transport"],
    exclusions: ["Flights", "Equipment rent"]
  },
  {
    id: 5,
    name: "Kashmir Paradise",
    location: "Kashmir",
    days: 5,
    price: 27000,
    rating: 4.9,
    image: "/images/kashmir.jpg",
    description: "Dal Lake, Gulmarg and snow views.",

    highlights: ["Dal Lake", "Snow Views", "Gulmarg"],
    itinerary: ["Day 1: Arrival", "Day 2: Srinagar", "Day 3: Gulmarg", "Day 4: Pahalgam", "Day 5: Return"],
    inclusions: ["Hotel", "Transport", "Breakfast"],
    exclusions: ["Flights", "Entry tickets"]
  },
  {
    id: 6,
    name: "Golden Triangle Tour",
    location: "Delhi - Agra - Jaipur",
    days: 4,
    price: 20000,
    rating: 4.4,
    image: "/images/golden-triangle.jpg",
    description: "Visit Taj Mahal and Jaipur forts.",

    highlights: ["Taj Mahal", "Red Fort", "Jaipur Palaces"],
    itinerary: ["Day 1: Delhi", "Day 2: Agra", "Day 3: Jaipur", "Day 4: Return"],
    inclusions: ["Hotel", "Transport", "Guide"],
    exclusions: ["Flights", "Entry tickets"]
  },
  {
    id: 7,
    name: "Andaman Island Trip",
    location: "Andaman",
    days: 5,
    price: 32000,
    rating: 4.8,
    image: "/images/andaman.jpg",
    description: "Clear water and coral reefs.",

    highlights: ["Beaches", "Scuba Diving", "Islands"],
    itinerary: ["Day 1: Arrival", "Day 2-4: Island Tours", "Day 5: Return"],
    inclusions: ["Hotel", "Ferry", "Breakfast"],
    exclusions: ["Flights", "Activities"]
  },
  {
    id: 8,
    name: "Uttarakhand Nature Tour",
    location: "Uttarakhand",
    days: 4,
    price: 15000,
    rating: 4.3,
    image: "/images/uttarakhand.jpg",
    description: "Mountains and temples.",

    highlights: ["Mountains", "Temples", "Nature"],
    itinerary: ["Day 1: Arrival", "Day 2-3: Sightseeing", "Day 4: Return"],
    inclusions: ["Hotel", "Transport"],
    exclusions: ["Meals", "Entry tickets"]
  },
  {
    id: 9,
    name: "Leh Ladakh Expedition",
    location: "Ladakh",
    days: 7,
    price: 35000,
    rating: 4.9,
    image: "/images/ladakh.jpg",
    description: "High altitude adventure and monasteries.",

    highlights: ["High Passes", "Monasteries", "Adventure"],
    itinerary: ["Day 1: Arrival", "Day 2-6: Exploration", "Day 7: Return"],
    inclusions: ["Hotel", "Transport", "Guide"],
    exclusions: ["Flights", "Bike rent"]
  },
  {
    id: 10,
    name: "Sikkim Scenic Tour",
    location: "Sikkim",
    days: 5,
    price: 21000,
    rating: 4.6,
    image: "/images/sikkim.jpg",
    description: "Beautiful valleys and lakes.",

    highlights: ["Lakes", "Valleys", "Mountains"],
    itinerary: ["Day 1: Arrival", "Day 2-4: Sightseeing", "Day 5: Return"],
    inclusions: ["Hotel", "Transport"],
    exclusions: ["Flights", "Meals"]
  },
  {
    id: 11,
    name: "Tamil Nadu Temple Tour",
    location: "Tamil Nadu",
    days: 4,
    price: 17000,
    rating: 4.4,
    image: "/images/tamilnadu.jpg",
    description: "Historic temples and culture.",

    highlights: ["Temples", "Culture", "History"],
    itinerary: ["Day 1: Arrival", "Day 2-3: Temple Visit", "Day 4: Return"],
    inclusions: ["Hotel", "Guide"],
    exclusions: ["Meals", "Entry tickets"]
  },
  {
    id: 12,
    name: "Meghalaya Waterfalls Tour",
    location: "Meghalaya",
    days: 4,
    price: 19000,
    rating: 4.7,
    image: "/images/meghalaya.jpg",
    description: "Living root bridges and waterfalls.",

    highlights: ["Waterfalls", "Root Bridges", "Nature"],
    itinerary: ["Day 1: Arrival", "Day 2-3: Exploration", "Day 4: Return"],
    inclusions: ["Hotel", "Transport"],
    exclusions: ["Flights", "Meals"]
  }
];

export default packages;