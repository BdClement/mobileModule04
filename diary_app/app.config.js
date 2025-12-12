import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseApiKey: process.env.SUPABASE_API_KEY,
  },
});
