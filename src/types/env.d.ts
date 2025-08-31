interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string
  readonly PUBLIC_API_URL: string
  readonly PUBLIC_SEARCH_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

export {}
