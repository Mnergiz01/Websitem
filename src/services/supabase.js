// src/services/supabase.js
import { createClient } from '@supabase/supabase-js';

// Çevresel değişkenleri al
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Kontrol: Gerekli değişkenler var mı?
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase URL veya anonim anahtar eksik. .env dosyasına VITE_SUPABASE_URL ve VITE_SUPABASE_ANON_KEY ekleyin.'
  );
}

// Supabase istemcisi oluştur
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Supabase API hatalarını işler.
 * @param {Object} error - Supabase'den dönen hata objesi
 * @param {string} [defaultMessage='Bir hata oluştu'] - Varsayılan hata mesajı
 * @returns {Error} - Standardize edilmiş hata objesi
 */
export const handleSupabaseError = (error, defaultMessage = 'Bir hata oluştu') => {
  console.error('Supabase hatası:', error);

  const message = error?.message || error?.error_description || defaultMessage;
  const customError = new Error(message);

  // Ek hata bilgilerini ekle
  if (error?.code) customError.code = error.code;
  if (error?.details) customError.details = error.details;

  return customError;
};
