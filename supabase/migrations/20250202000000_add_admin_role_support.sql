-- Migration: Add super_admin role support
-- This migration ensures the users table supports the super_admin role
-- and optionally sets up a system to mark users as super admin

-- Ensure the role column exists and allows super_admin value
-- Note: If the column already exists, this will not modify it
DO $$ 
BEGIN
    -- Check if role column exists
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'users' 
        AND column_name = 'role'
    ) THEN
        -- Add role column if it doesn't exist
        ALTER TABLE public.users 
        ADD COLUMN role TEXT;
    END IF;
END $$;

-- Add check constraint to ensure role is one of valid values
-- You can adjust these values based on your requirements
DO $$
BEGIN
    -- Drop existing constraint if it exists
    IF EXISTS (
        SELECT 1 
        FROM pg_constraint 
        WHERE conname = 'users_role_check'
    ) THEN
        ALTER TABLE public.users DROP CONSTRAINT users_role_check;
    END IF;

    -- Add new constraint allowing super_admin and null
    ALTER TABLE public.users 
    ADD CONSTRAINT users_role_check 
    CHECK (role IS NULL OR role IN ('super_admin', 'user', 'admin'));
END $$;

-- Create index on role column for faster queries
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- Create a function to check if a user is super admin
-- This can be used in RLS policies
CREATE OR REPLACE FUNCTION public.is_super_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM public.users 
        WHERE id = user_id 
        AND role = 'super_admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.is_super_admin(UUID) TO authenticated;

-- Add comment
COMMENT ON FUNCTION public.is_super_admin(UUID) IS 'Check if a user has super_admin role';

