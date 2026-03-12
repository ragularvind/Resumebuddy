// Type definitions for Express to extend the Request interface

import { User } from '@supabase/supabase-js';

declare global {
  namespace Express {
    interface Request {
      user?: User; // Depending on what Supabase returns, you might want to type this more strictly
    }
  }
}
