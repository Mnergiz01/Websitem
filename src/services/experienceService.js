import { supabase, handleSupabaseError } from './supabase';

export const experienceService = {
  /**
   * Fetch all experiences
   * @returns {Promise<Array>} Array of experiences
   */
  async getExperiences() {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('start_date', { ascending: false });
      
      if (error) throw handleSupabaseError(error, 'Failed to fetch experiences');
      
      return data || [];
    } catch (error) {
      throw handleSupabaseError(error, 'Failed to fetch experiences');
    }
  },
  
  /**
   * Fetch an experience by ID
   * @param {string|number} id - Experience ID
   * @returns {Promise<Object>} Experience data
   */
  async getExperienceById(id) {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw handleSupabaseError(error, `Failed to fetch experience with ID: ${id}`);
      
      return data;
    } catch (error) {
      throw handleSupabaseError(error, `Failed to fetch experience with ID: ${id}`);
    }
  },
  
  /**
   * Create a new experience
   * @param {Object} experienceData - Experience data
   * @returns {Promise<Object>} Created experience
   */
  async createExperience(experienceData) {
    try {
      // Format dates and add created_at timestamp
      const formattedData = {
        ...experienceData,
        startDate: new Date(experienceData.startDate).toISOString(),
        endDate: experienceData.endDate ? new Date(experienceData.endDate).toISOString() : null,
        created_at: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('experiences')
        .insert([formattedData])
        .select()
        .single();
      
      if (error) throw handleSupabaseError(error, 'Failed to create experience');
      
      return data;
    } catch (error) {
      throw handleSupabaseError(error, 'Failed to create experience');
    }
  },
  
  /**
   * Update an existing experience
   * @param {Object} experienceData - Experience data with ID
   * @returns {Promise<Object>} Updated experience
   */
  async updateExperience(experienceData) {
    try {
      const { id, ...updateData } = experienceData;
      
      // Format dates and add updated_at timestamp
      if (updateData.startDate) {
        updateData.startDate = new Date(updateData.startDate).toISOString();
      }
      
      if (updateData.endDate) {
        updateData.endDate = new Date(updateData.endDate).toISOString();
      }
      
      updateData.updated_at = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('experiences')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw handleSupabaseError(error, `Failed to update experience with ID: ${id}`);
      
      return data;
    } catch (error) {
      throw handleSupabaseError(error, `Failed to update experience with ID: ${experienceData.id}`);
    }
  },
  
  /**
   * Delete an experience
   * @param {string|number} id - Experience ID
   * @returns {Promise<void>}
   */
  async deleteExperience(id) {
    try {
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id);
      
      if (error) throw handleSupabaseError(error, `Failed to delete experience with ID: ${id}`);
    } catch (error) {
      throw handleSupabaseError(error, `Failed to delete experience with ID: ${id}`);
    }
  }
};
