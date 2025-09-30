export type Language = {
    code: string
    name: string
    flag: string
  }
  
  export const EN: Language = {
    code: "en",
    name: "English",
    flag: "🇺🇸"
  }
  
  export const VI: Language = {
    code: "vi", 
    name: "Tiếng Việt",
    flag: "🇻🇳"
  }
  
  export const LANGUAGES = [EN, VI]