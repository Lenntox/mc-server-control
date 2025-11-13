export interface Mcstatus {
  /** Whether the server is online or offline 
   * Not used since we get the status directly from the machine */
  online: boolean;

  /** Resolved hostname of the server */
  host: string;

  /** Resolved port of the server */
  port: number;

  /** Resolved IP address of the hostname (can be null if resolution failed) */
  ip_address: string | null;

  /** Whether this address is blocked by Mojang (EULA violation) */
  eula_blocked: boolean;

  /** Unix ms timestamp when the status was retrieved */
  retrieved_at: number;

  /** Unix ms timestamp when this status cache expires */
  expires_at: number;

  /** Server version data (missing if server is offline) */
  version?: MinecraftVersion;

  /** Player information (missing if server is offline) */
  players?: MinecraftPlayers;

  /** Message of the day / description (missing if server is offline) */
  motd?: MinecraftMotd;

  /**
   * Base64-encoded PNG data of the 64x64 server icon.
   * May be null if no icon is set. Missing if server is offline.
   */
  icon?: string | null;

  /**
   * Forge mods loaded on the server.
   * Usually empty if no Forge is installed.
   */
  mods: MinecraftMod[];

  /**
   * Software the server is running (null if query lookup fails).
   * Missing if server is offline.
   */
  software?: string | null;

  /**
   * Plugins running on the server (missing if server is offline).
   */
  plugins?: MinecraftPlugin[];

  /**
   * Result of SRV record lookup.
   * Always present but can be null if no SRV record was found.
   */
  srv_record: MinecraftSrvRecord | null;
}

export interface MinecraftVersion {
  /** Raw version name with formatting codes */
  name_raw: string;
  /** Clean version name without formatting codes */
  name_clean: string;
  /** HTML-formatted version name */
  name_html: string;
  /** Protocol version used to identify supported client versions */
  protocol: number;
}

export interface MinecraftPlayers {
  /** Online player count */
  online: number;
  /** Maximum allowed players */
  max: number;
  /** Sample list of online players (may be empty) */
  list: MinecraftPlayerSample[];
}

export interface MinecraftPlayerSample {
  /** UUID of the player */
  uuid: string;
  /** Username with possible formatting codes */
  name_raw: string;
  /** Username without formatting codes */
  name_clean: string;
  /** HTML-formatted username */
  name_html: string;
}

export interface MinecraftMotd {
  /** Raw MOTD with formatting codes */
  raw: string;
  /** Clean text-only MOTD */
  clean: string;
  /** HTML representation of the MOTD */
  html: string;
}

export interface MinecraftMod {
  /** Name of the mod */
  name: string;
  /** Version of the mod */
  version: string;
}

export interface MinecraftPlugin {
  /** Name of the plugin */
  name: string;
  /** Semantic version of the plugin (can be null) */
  version: string | null;
}

export interface MinecraftSrvRecord {
  /** Hostname returned by the SRV lookup */
  host: string;
  /** Port returned by the SRV lookup */
  port: number;
}
