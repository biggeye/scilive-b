export type AuthProvider =
  | 'apple'
  | 'azure'
  | 'bitbucket'
  | 'discord'
  | 'facebook'
  | 'github'
  | 'gitlab'
  | 'google'
  | 'keycloak'
  | 'linkedin'
  | 'notion'
  | 'slack'
  | 'spotify'
  | 'twitch'
  | 'twitter'
  | 'workos';



// User State
export interface UserProfile {
  id: string | null;
  full_name: string | "" | null;
  username: string | "" | null;
  avatar_url: string | "" | null;
  website: string | "" | null;
  email: string | "" | null;
}

export interface UserState {
  profile: boolean;
  loading: boolean;
  error: string | null;
}
// UserProvider.tsx
export interface UserContextType {
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

export interface UserDetailsResponse {
  userId?: string;
  profile?: UserProfile;
  error?: string;
}

// Gallery State

export interface ModalProps {
  isOpen: boolean,
  onClose: boolean,
  content_id: string,
  url: string,
  handleDelete: object,
}

export interface GalleryProps {
  items: {
    content_id: string;
    url?: string;
    script?: string;
    content_type: string;
    model_id: string;
    friendly_name: string;
    title?: string;
    name?: string;
    prompt?: string;
    content?: string;
  }[];
  onEdit: (url: string) => void;
  onDelete: (id: string) => void;
}

export interface GalleryItem {
  content_id: string; // Adjust types according to your actual data structure
  content_type: string;
  model_id: string;
  friendly_name: string;
  url?: string;
  script?: string;
  title?: string
  name?: string;
  prompt?: string;
  content?: string;
}

export interface DisplayResultsProps {
  localPage: string | null,
}



export type currentIndex = {
  content_id: string;
  url: string;
  content_type: string;
  prompt?: string;
  model_id?: string;

};

// Replicate
export interface SelectedModel {
  id: string,
  name: string,
  friendlyName: string,
  example?: string,
  url?: string,
  shortDesc: string,
  inputType: string,
}

export type ModelList = {
  id: string,
  name: string,
  friendlyName: string,
  shortDesc: string
}

export interface ModelInputs {
  variable: string,
  default_value: string,
  description: string,
  validation_rules: "boolean" | "integer" | "uri",
  is_required: boolean,
}

// Interface for prediction preparation inputs
export interface PredictionPreparationState {
  imageNarrativeUploadState: File | null;
  userImagePreviewState: string | null;
  userImageUploadState: File | null;
  userImageDataUriState: string;
  predictionId: string; // Assuming predictionId is needed for prediction preparation
}

// Interface for prediction instance state
export interface PredictionInstanceState {
  globalLoadingState: boolean;
  cancelRunningPredictionState: string | null;
  modelBootResultState: string | null;
  predictionErrorState: string | null;
  predictionProgressState: number;
  predictionStatusState: string;
  finalPredictionState: string | null;
  finalPredictionPromptState: string;
  // Add other properties as needed
}

export interface PredictionResponsePostBody {
  id: string;
  model: string;
  version: string;
  input: {
    image: string; // Assuming base64 image data is a string
    prompt: string;
  };
  logs: string;
  output: string[];
  error: null | string;
  status: 'starting' | 'processing' | 'succeeded' | 'failed' | 'cancelled'; // Adjust based on possible values
  created_at: string;
  started_at: string;
  completed_at: string;
  webhook: string;
  urls: {
    cancel: string;
    get: string;
  };

  metrics: {
    predict_time: number;
  };
}
// Leap AI
export type WorkflowStatus = 'completed' | 'running' | 'failed';

export interface WorkflowOutput {
  images: string[],
  user_id: string,
  avatar_name: string,
  photo_style: string,
  frame_style: string,
  avatar_description: string
}

export interface WorkflowWebhookRequestBody {
  id: string;
  version_id: string;
  status: WorkflowStatus;
  created_at: string;
  started_at: string | null;
  ended_at: string | null;
  workflow_id: string;
  error: string | null;
  input: Record<string, any>;
  output: WorkflowOutput | null;
}

export interface UploadAvatarProps {
  image: File[] | File,
  userId: string,
  name: string,
  modelId: string,
  predictionId: string,
  prompt: string
}

export interface UploadWebsiteSummaryProps {
  content: string,
  userId: string,
  modelId: string,
  predictionId: string,
  prompt: string
}


// D-ID
export interface VoiceData {
  id: string,
  name: string,
  gender: string,
  locale: string,
  language: string,
  access: string,
  provider: string,
  styles: [],
  config: {
    modelId: string
  }
}

export interface ClientLayoutProps {
  children: React.ReactNode;
}

export interface NavbarAlphaProps {
  parentRef: React.RefObject<HTMLDivElement>;
}