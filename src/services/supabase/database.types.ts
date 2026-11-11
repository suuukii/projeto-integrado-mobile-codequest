// Espelha as tabelas definidas em supabase/migrations.

type Timestamp = string;

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; username: string; created_at: Timestamp };
        Insert: never;
        Update: never;
        Relationships: [];
      };
      languages: {
        Row: { id: string; slug: string; name: string; created_at: Timestamp };
        Insert: never;
        Update: never;
        Relationships: [];
      };
      tracks: {
        Row: {
          id: string;
          language_id: string;
          slug: string;
          title: string;
          description: string;
          position: number;
          created_at: Timestamp;
        };
        Insert: never;
        Update: never;
        Relationships: [
          {
            foreignKeyName: 'tracks_language_id_fkey';
            columns: ['language_id'];
            isOneToOne: false;
            referencedRelation: 'languages';
            referencedColumns: ['id'];
          },
        ];
      };
      stages: {
        Row: {
          id: string;
          track_id: string;
          position: number;
          title: string;
          description: string;
          created_at: Timestamp;
        };
        Insert: never;
        Update: never;
        Relationships: [
          {
            foreignKeyName: 'stages_track_id_fkey';
            columns: ['track_id'];
            isOneToOne: false;
            referencedRelation: 'tracks';
            referencedColumns: ['id'];
          },
        ];
      };
      questions: {
        Row: {
          id: string;
          stage_id: string;
          position: number;
          type: 'multiple_choice';
          prompt: string;
          code_snippet: string | null;
          explanation: string;
          created_at: Timestamp;
        };
        Insert: never;
        Update: never;
        Relationships: [
          {
            foreignKeyName: 'questions_stage_id_fkey';
            columns: ['stage_id'];
            isOneToOne: false;
            referencedRelation: 'stages';
            referencedColumns: ['id'];
          },
        ];
      };
      question_options: {
        Row: {
          id: string;
          question_id: string;
          position: number;
          text: string;
          is_correct: boolean;
        };
        Insert: never;
        Update: never;
        Relationships: [
          {
            foreignKeyName: 'question_options_question_id_fkey';
            columns: ['question_id'];
            isOneToOne: false;
            referencedRelation: 'questions';
            referencedColumns: ['id'];
          },
        ];
      };
      user_progress: {
        Row: {
          user_id: string;
          stage_id: string;
          first_try_correct: number;
          total_questions: number;
          completed_at: Timestamp;
        };
        Insert: {
          user_id: string;
          stage_id: string;
          first_try_correct: number;
          total_questions: number;
          completed_at?: Timestamp;
        };
        Update: {
          first_try_correct?: number;
          total_questions?: number;
          completed_at?: Timestamp;
        };
        Relationships: [
          {
            foreignKeyName: 'user_progress_stage_id_fkey';
            columns: ['stage_id'];
            isOneToOne: false;
            referencedRelation: 'stages';
            referencedColumns: ['id'];
          },
        ];
      };
      lesson_cards: {
        Row: {
          id: string;
          stage_id: string;
          position: number;
          visual: 'mascot' | 'code' | 'points' | 'variable';
          title: string;
          body: string;
          code_snippet: string | null;
          code_output: string | null;
          points: string[];
          created_at: Timestamp;
        };
        Insert: never;
        Update: never;
        Relationships: [
          {
            foreignKeyName: 'lesson_cards_stage_id_fkey';
            columns: ['stage_id'];
            isOneToOne: false;
            referencedRelation: 'stages';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      is_username_available: {
        Args: { candidate: string };
        Returns: boolean;
      };
    };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
