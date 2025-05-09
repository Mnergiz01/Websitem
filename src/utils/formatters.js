/**
 * Format a date string to locale format
 * @param {string} dateString - ISO date string
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date
 */
export const formatDate = (dateString, options = {}) => {
    if (!dateString) return '';
    
    const defaultOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('tr-TR', mergedOptions).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };
  
  /**
   * Format a date range
   * @param {string} startDate - Start date ISO string
   * @param {string} endDate - End date ISO string (optional)
   * @returns {string} Formatted date range
   */
  export const formatDateRange = (startDate, endDate) => {
    if (!startDate) return '';
    
    const start = formatDate(startDate, { year: 'numeric', month: 'short' });
    const end = endDate ? formatDate(endDate, { year: 'numeric', month: 'short' }) : 'Şu anda';
    
    return `${start} - ${end}`;
  };
  
  /**
   * Truncate text with ellipsis
   * @param {string} text - Text to truncate
   * @param {number} length - Maximum length
   * @returns {string} Truncated text
   */
  export const truncateText = (text, length = 100) => {
    if (!text) return '';
    if (text.length <= length) return text;
    
    return text.substring(0, length) + '...';
  };
  
  /**
   * Format file size
   * @param {number} bytes - Size in bytes
   * @returns {string} Formatted size
   */
  export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  /**
   * Extract first name and last name from full name
   * @param {string} fullName - Full name
   * @returns {Object} Object with firstName and lastName
   */
  export const extractNameParts = (fullName) => {
    if (!fullName) return { firstName: '', lastName: '' };
    
    const parts = fullName.trim().split(' ');
    
    if (parts.length === 1) {
      return { firstName: parts[0], lastName: '' };
    }
    
    const lastName = parts.pop();
    const firstName = parts.join(' ');
    
    return { firstName, lastName };
  };
  
  /**
   * Get skill level label based on percentage
   * @param {number} level - Skill level (0-100)
   * @returns {string} Level label
   */
  export const getSkillLevelLabel = (level) => {
    if (level >= 90) return 'Uzman';
    if (level >= 70) return 'İleri';
    if (level >= 40) return 'Orta';
    return 'Başlangıç';
  };
  