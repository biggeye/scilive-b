// Mock Supabase Client with TypeScript types
const supabase = {
    auth: {
      user: null,
      signIn: async (credentials: { email: string; password: string }): Promise<{ user: { id: string } | null, error: null | Error }> => {
        console.log('Mock signIn', credentials);
        return { user: { id: 'mockUserId' }, error: null };
      },
      signOut: async (): Promise<{ error: null | Error }> => {
        console.log('Mock signOut');
        return { error: null };
      }
    },
    from: (table: string) => ({
      select: async (): Promise<{ data: any[], error: null | Error }> => {
        console.log('Mock select from', table);
        return { data: [], error: null };
      },
      insert: async (data: any): Promise<{ data: any, error: null | Error }> => {
        console.log('Mock insert into', table, data);
        return { data, error: null };
      },
      update: async (data: any): Promise<{ data: any, error: null | Error }> => {
        console.log('Mock update in', table, data);
        return { data, error: null };
      }
    })
  };
  
  export default supabase;
  