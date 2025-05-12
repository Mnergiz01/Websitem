import { supabase, handleSupabaseError } from './supabase';

export const projectService = {
  /**
   * Fetch all projects
   * @returns {Promise<Array>} Array of projects
   */
  async getProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw handleSupabaseError(error, 'Failed to fetch projects');
      }

      return data || [];
    } catch (error) {
      throw handleSupabaseError(error, 'Error occurred while fetching projects');
    }
  },

  /**
   * Fetch a project by ID
   * @param {string|number} id - Project ID
   * @returns {Promise<Object>} Project data
   */
  async getProjectById(id) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        throw handleSupabaseError(error, `Failed to fetch project with ID: ${id}`);
      }

      return data;
    } catch (error) {
      throw handleSupabaseError(error, `Error occurred while fetching project with ID: ${id}`);
    }
  },

  /**
   * Create a new project
   * @param {Object} projectData - Project data
   * @returns {Promise<Object>} Created project
   */
  async createProject(projectData) {
    try {
      // Add created_at timestamp
      const dataWithTimestamp = {
        ...projectData,
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('projects')
        .insert([dataWithTimestamp])
        .select()
        .single();

      if (error) {
        throw handleSupabaseError(error, 'Failed to create project');
      }

      return data;
    } catch (error) {
      throw handleSupabaseError(error, 'Error occurred while creating project');
    }
  },

  /**
   * Update an existing project
   * @param {Object} projectData - Project data with ID
   * @returns {Promise<Object>} Updated project
   */
  async updateProject(projectData) {
    try {
      const { id, ...updateData } = projectData;

      // Add updated_at timestamp
      updateData.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw handleSupabaseError(error, `Failed to update project with ID: ${id}`);
      }

      return data;
    } catch (error) {
      throw handleSupabaseError(error, `Error occurred while updating project with ID: ${projectData.id}`);
    }
  },

  /**
   * Delete a project
   * @param {string|number} id - Project ID
   * @returns {Promise<void>}
   */
  async deleteProject(id) {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) {
        throw handleSupabaseError(error, `Failed to delete project with ID: ${id}`);
      }
    } catch (error) {
      throw handleSupabaseError(error, `Error occurred while deleting project with ID: ${id}`);
    }
  }
};
