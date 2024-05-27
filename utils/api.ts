import supabase from '../app/supabaseClient';

export const fetchUser = async (userId: string): Promise<{ data: any, error: any }> => {
  console.log('Mock fetchUser', userId);
  return { data: { id: userId, name: 'Mock User' }, error: null };
};

export const storePrediction = async (prediction: any): Promise<{ data: any[], error: any }> => {
  console.log('Mock storePrediction', prediction);
  return { data: [prediction], error: null };
};
