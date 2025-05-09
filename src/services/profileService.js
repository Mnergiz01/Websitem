import { supabase, handleSupabaseError } from './supabase';

export const profileService = {
  /**
   * Fetch the profile data
   * @returns {Promise<Object>} Profile data
   */
  async getProfile() {
    try {
      const { data, error } = await supabase
        .from('profile')
        .select('*')
        .maybeSingle();
      
      if (error) throw handleSupabaseError(error, 'Failed to fetch profile');
      
      // Return empty object if no profile exists yet
      return data || {};
    } catch (error) {
      throw handleSupabaseError(error, 'Failed to fetch profile');
    }
  },
  
  /**
   * Update the profile data
   * If profile doesn't exist, it will be created
   * @param {Object} profileData - Profile data
   * @returns {Promise<Object>} Updated profile
   */
  async updateProfile(profileData) {
    try {
      // Add updated_at timestamp
      const dataWithTimestamp = {
        ...profileData,
        updated_at: new Date().toISOString()
      };
      
      // Format birth date if exists
      if (dataWithTimestamp.birthDate) {
        dataWithTimestamp.birthDate = new Date(dataWithTimestamp.birthDate).toISOString();
      }
      
      // Check if profile already exists
      const { data: existingProfile } = await supabase
        .from('profile')
        .select('id')
        .maybeSingle();
      
      let result;
      
      if (existingProfile) {
        // Update existing profile
        const { data, error } = await supabase
          .from('profile')
          .update(dataWithTimestamp)
          .eq('id', existingProfile.id)
          .select()
          .single();
        
        if (error) throw handleSupabaseError(error, 'Failed to update profile');
        
        result = data;
      } else {
        // Create new profile
        const { data, error } = await supabase
          .from('profile')
          .insert([{ ...dataWithTimestamp, created_at: new Date().toISOString() }])
          .select()
          .single();
        
        if (error) throw handleSupabaseError(error, 'Failed to create profile');
        
        result = data;
      }
      
      return result;
    } catch (error) {
      throw handleSupabaseError(error, 'Failed to update profile');
    }
  }
};
