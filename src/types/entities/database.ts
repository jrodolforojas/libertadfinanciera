export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      roles: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          auth_id: string | null
          created_at: string
          email: string
          id: string
          isActive: boolean
          name: string
          roleId: string | null
        }
        Insert: {
          auth_id?: string | null
          created_at?: string
          email: string
          id?: string
          isActive?: boolean
          name: string
          roleId?: string | null
        }
        Update: {
          auth_id?: string | null
          created_at?: string
          email?: string
          id?: string
          isActive?: boolean
          name?: string
          roleId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'users_auth_id_fkey'
            columns: ['auth_id']
            referencedRelation: 'users'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'users_roleId_fkey'
            columns: ['roleId']
            referencedRelation: 'roles'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
