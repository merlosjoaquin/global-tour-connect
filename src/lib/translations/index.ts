import es from './es.json'
import en from './en.json'
import fr from './fr.json'
import pt from './pt.json'
import ja from './ja.json'
import zh from './zh.json'

export type Language = 'es' | 'en' | 'fr' | 'pt' | 'ja' | 'zh'

export const translations: Record<Language, typeof es> = {
  es,
  en,
  fr,
  pt,
  ja,
  zh,
}
