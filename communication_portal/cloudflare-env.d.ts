declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    MOM_PASSWORD?: string;
    JJ_PASSWORD?: string;
    SESSION_SECRET?: string;
  }
}
