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

      if (error) {
        throw handleSupabaseError(error, 'Error occurred while fetching skills');
      }

      return data || [];
    } catch (error) {
      throw handleSupabaseError(error, 'Error occurred while fetching skills');
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

      if (error) {
        throw handleSupabaseError(error, `Error occurred while fetching skill with ID: ${id}`);
      }

      return data;
    } catch (error) {
      throw handleSupabaseError(error, `Error occurred while fetching skill with ID: ${id}`);
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
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('skills')
        .insert([dataWithTimestamp])
        .select()
        .single();

      if (error) {
        throw handleSupabaseError(error, 'Error occurred while creating skill');
      }

      return data;
    } catch (error) {
      throw handleSupabaseError(error, 'Error occurred while creating skill');
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

      if (error) {
        throw handleSupabaseError(error, `Error occurred while updating skill with ID: ${id}`);
      }

      return data;
    } catch (error) {
      throw handleSupabaseError(error, `Error occurred while updating skill with ID: ${skillData.id}`);
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

      if (error) {
        throw handleSupabaseError(error, `Error occurred while deleting skill with ID: ${id}`);
      }
    } catch (error) {
      throw handleSupabaseError(error, `Error occurred while deleting skill with ID: ${id}`);
    }
  }
};
