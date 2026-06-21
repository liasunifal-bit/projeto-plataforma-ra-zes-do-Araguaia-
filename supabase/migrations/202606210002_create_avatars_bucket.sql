-- Migration: Create 'avatars' storage bucket and set policies
-- Description: Creates the 'avatars' bucket for user profile pictures and configures RLS policies.

-- Create the avatars bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Set up access controls for storage.
-- Ensure RLS is enabled on storage.objects (it is by default in Supabase)
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow public access to read files in the "avatars" bucket
CREATE POLICY "Avatar Images are publicly accessible" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'avatars' );

-- Allow authenticated users to upload files to the "avatars" bucket
CREATE POLICY "Users can upload their own avatar" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'avatars' AND auth.uid() = owner );

-- Allow users to update their own files
CREATE POLICY "Users can update their own avatar" 
ON storage.objects FOR UPDATE 
USING ( bucket_id = 'avatars' AND auth.uid() = owner )
WITH CHECK ( bucket_id = 'avatars' AND auth.uid() = owner );

-- Allow users to delete their own files
CREATE POLICY "Users can delete their own avatar" 
ON storage.objects FOR DELETE 
USING ( bucket_id = 'avatars' AND auth.uid() = owner );
