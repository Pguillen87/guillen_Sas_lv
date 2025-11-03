-- Migration: Create test admin user
-- This migration creates a test admin user with email 'admin@test.com' and password '12346'
-- NOTE: This uses Supabase's admin API functions which may require special permissions

-- First, we'll create the user in auth.users using the admin API
-- Note: This requires service_role key access or running via Supabase Dashboard

-- Step 1: Create user in auth.users (if not exists)
-- This is typically done via Supabase Dashboard or Management API
-- But we can try using the admin functions if available

DO $$
DECLARE
  v_user_id UUID;
  v_email TEXT := 'admin@test.com';
BEGIN
  -- Check if user already exists in auth.users
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = v_email;

  -- If user doesn't exist, we'll need to create it
  -- Note: Creating users in auth.users via SQL requires special setup
  -- For now, we'll just ensure the users table record exists if auth user exists
  IF v_user_id IS NOT NULL THEN
    -- User exists in auth, ensure users table record exists with admin role
    INSERT INTO public.users (id, email, role, created_at, updated_at)
    VALUES (v_user_id, v_email, 'super_admin', NOW(), NOW())
    ON CONFLICT (id) 
    DO UPDATE SET 
      role = 'super_admin',
      updated_at = NOW();

    RAISE NOTICE 'Admin user % already exists in auth. Updated role to super_admin', v_email;
  ELSE
    RAISE NOTICE 'User % does not exist in auth.users. Please create it via Supabase Dashboard first.', v_email;
    RAISE NOTICE 'After creating the user, run this SQL again to set the role.';
  END IF;
END $$;

-- Add comment
COMMENT ON TABLE public.users IS 'Users table. Use role=''super_admin'' for admin users.';

