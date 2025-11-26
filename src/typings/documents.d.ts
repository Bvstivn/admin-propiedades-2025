interface Doc {
    id: string;
    created_at: string;
    created_by: string;
    updated_at: string | null;
    updated_by: string | null;
}

interface DocSet {
  id?: string;
  created_at?: string;
  created_by?: string | null;
  updated_at?: null;
  updated_by?: null;
}

interface DocPatch {
  id: string;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  updated_by?: string | null;
}