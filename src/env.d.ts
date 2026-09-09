/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly BESEDE_API_URL: string;
	readonly BESEDE_API_USER: string;
	readonly BESEDE_API_PASSWORD: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
