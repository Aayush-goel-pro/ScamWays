/*
  # Create articles table and security policies

  1. New Tables
    - `articles`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `image_url` (text, optional)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)
      - `user_id` (uuid, foreign key to auth.users)

  2. Security
    - Enable RLS on articles table
    - Add policies for:
      - Anyone can read articles
      - Authenticated users can create articles
      - Users can update and delete their own articles
*/

CREATE TABLE articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NOT NULL
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Everyone can read articles
CREATE POLICY "Articles are viewable by everyone"
  ON articles
  FOR SELECT
  USING (true);

-- Authenticated users can create articles
CREATE POLICY "Authenticated users can create articles"
  ON articles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own articles
CREATE POLICY "Users can update their own articles"
  ON articles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own articles
CREATE POLICY "Users can delete their own articles"
  ON articles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);