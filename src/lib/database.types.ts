// Auto-generated types for Supabase tables
// Run `supabase gen types typescript` to regenerate after schema changes

export type Database = {
  public: {
    Tables: {
      events: {
        Row: {
          id: string;
          title: string;
          date: string;
          location: string;
          description: string;
          status: "upcoming" | "past";
          luma_url: string;
          image: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["events"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["events"]["Insert"]>;
      };
      members: {
        Row: {
          id: string;
          name: string;
          role: string;
          company: string;
          skills: string[];
          lane: string;
          twitter: string;
          avatar: string | null;
          achievements: string[];
          featured: boolean;
          connection_count: number;
          hackathon_wins: number;
          projects_built: number;
          grants_received: number;
          bounties_earned: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["members"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["members"]["Insert"]>;
      };
      partners: {
        Row: {
          id: string;
          name: string;
          logo_src: string;
          url: string;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["partners"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["partners"]["Insert"]>;
      };
      projects: {
        Row: {
          id: string;
          name: string;
          url: string;
          logo: string;
          category: "DeFi" | "Infrastructure" | "Consumer" | "Community";
          description: string;
          founder: string;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["projects"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
      };
      site_content: {
        Row: {
          id: string;
          key: string;
          value: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["site_content"]["Row"], "id" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["site_content"]["Insert"]>;
      };
    };
  };
};
