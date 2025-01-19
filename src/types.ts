export interface Location {
  id: string;
  name: string;
  type: 'shelter' | 'foodbank' | 'restaurant' | 'store';
  address: string;
  coordinates: [number, number];
  contactDetails: string;
  operatingHours: string;
  urgentNeeds?: string[];
}

export interface DonationItem {
  id: string;
  userId: string;
  itemName: string;
  quantity: number;
  expiryDate: string;
  category: string;
  status: 'pending' | 'scheduled' | 'completed';
  pickupTime?: string;
}

export interface CommunityStats {
  totalDonations: number;
  foodSaved: number;
  activeDonors: number;
  impactedPeople: number;
}

export interface UserAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  completed: boolean;
}