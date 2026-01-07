import 'dotenv/config';

// console.log("Test app.config == ", process.env.SUPABASE_URL);
// Deprecated (Cf hiding sensible var env int that context)
export default ({ config }) => ({
  ...config,
  extra: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseApiKey: process.env.SUPABASE_API_KEY,
  },
});
