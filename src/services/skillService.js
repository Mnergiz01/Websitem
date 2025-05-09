import { supabase, handleSupabaseError } from './supabase';

export const skillService = {
  /**
   * Fetch all skills
   * @returns {Promise<Array>} Array of skills
   */
  async getSkills() {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category')
        .order('level', { ascending: false });
      
      if (error) throw handleSupabaseError(error, 'Failed to fetch skills');
      
      return data || [];
    } catch (error) {
      throw handleSupabaseError(error, 'Failed to fetch skills');
    }
  },
  
  /**
   * Fetch a skill by ID
   * @param {string|number} id - Skill ID
   * @returns {Promise<Object>} Skill data
   */
  async getSkillById(id) {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw handleSupabaseError(error, `Failed to fetch skill with ID: ${id}`);
      
      return data;
    } catch (error) {
      throw handleSupabaseError(error, `Failed to fetch skill with ID: ${id}`);
    }
  },
  
  /**
   * Create a new skill
   * @param {Object} skillData - Skill data
   * @returns {Promise<Object>} Created skill
   */
  async createSkill(skillData) {
    try {
      // Add created_at timestamp
      const dataWithTimestamp = {
        ...skillData,
        created_at: new Date().toISOString()
      };
      
      const { data, error } = await supabase
        .from('skills')
        .insert([dataWithTimestamp])
        .select()
        .single();
      
      if (error) throw handleSupabaseError(error, 'Failed to create skill');
      
      return data;
    } catch (error) {
      throw handleSupabaseError(error, 'Failed to create skill');
    }
  },
  
  /**
   * Update an existing skill
   * @param {Object} skillData - Skill data with ID
   * @returns {Promise<Object>} Updated skill
   */
  async updateSkill(skillData) {
    try {
      const { id, ...updateData } = skillData;
      
      // Add updated_at timestamp
      updateData.updated_at = new Date().toISOString();
      
      const { data, error } = await supabase
        .from('skills')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw handleSupabaseError(error, `Failed to update skill with ID: ${id}`);
      
      return data;
    } catch (error) {
      throw handleSupabaseError(error, `Failed to update skill with ID: ${skillData.id}`);
    }
  },
  
  /**
   * Delete a skill
   * @param {string|number} id - Skill ID
   * @returns {Promise<void>}
   */
  async deleteSkill(id) {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);
      
      if (error) throw handleSupabaseError(error, `Failed to delete skill with ID: ${id}`);
    } catch (error) {
      throw handleSupabaseError(error, `Failed to delete skill with ID: ${id}`);
    }
  }
};
