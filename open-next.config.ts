import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Bez nastavené incrementalCache spadne OpenNext na výchozí S3 cache z AWS.
 * Na Cloudflare žádné S3 není, takže čtení vždycky selže a předrenderovaná
 * stránka se místo servírování zkusí vyrenderovat znovu ve workeru - a tam
 * padne na tom, že /blog čte články ze souborů (500), případně skončí na 404.
 *
 * Tahle cache čte předrenderované stránky rovnou z Workers Assets. Přesně
 * sedí na blog, který se celý generuje při buildu a nic se v něm nereviduje.
 */
export default defineCloudflareConfig({
	incrementalCache: staticAssetsIncrementalCache,
});
