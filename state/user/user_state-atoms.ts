import { atom, selector } from "recoil";
import { UserProfile } from '@/types';
import { useUserId } from "@/lib/user/useUserProfile"; // assuming you have a function to fetch user profile

// Atom definitions
export const currentUserIdState = atom<string | null> ({
  key: "currentUserIdState",
  default: null,
});

export const userProfileState = atom<UserProfile | null> ({
  key: "userProfileState",
  default: {
    id: null,
    full_name: "",
    username: "",
    avatar_url: "",
    website: "",
    email: "",
  },
});

export const userProfileSelector = selector({
  key: 'userProfileSelector',
  get: async ({ get }) => {
    const currentUserId = get(currentUserIdState);
    console.log("userProfileSelector (setting current user):", currentUserId);
    try {
      // Fetch user profile data
      const { userProfileData } = await useUserId(currentUserId);
      const { id, full_name, username, avatar_url, website, email } = userProfileData();
      console.log("userProfileSelector (fetching data): ", userProfileData);
      // Assuming userProfileData is the user profile we need
      if (userProfileData) {
        return {
        id: currentUserId,
        full_name: userProfileData.id || "",
        username: userProfileData.username || "",
        avatar_url: userProfileData.avatar_url || "",
        website: userProfileData.website || "",
        email: userProfileData.email || "",
      }
    }} catch (error) {
      console.error('Error fetching user profile data:', error);
      return {
        
      };
    }
  },
});

export const viewModeState = atom ({
  key: 'viewModeState',
  default: 'tabs'
})

export const currentPageState = atom({
  key: 'currentPageState',
  default: ''
})