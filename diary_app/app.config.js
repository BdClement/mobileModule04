import 'dotenv/config';

// console.log("Test app.config == ", process.env.SUPABASE_URL);
// Deprecated (Cf hiding sensible var env int that context)
export default ({ config }) => ({
  ...config,
  extra: {
    // supabaseUrl: process.env.SUPABASE_URL,
    // supabaseApiKey: process.env.SUPABASE_API_KEY,
      "eas": {
        "projectId": "3d95c5fc-9066-4798-baef-0e6ee896d773"
      }
  },
});
