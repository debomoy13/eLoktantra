import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICandidate extends Document {
  name: string;
  party: string;
  partyId?: mongoose.Types.ObjectId;
  constituency: string;
  constituencyId?: mongoose.Types.ObjectId;
  photo_url?: string;
  age?: number;
  gender?: string;
  education?: string;
  net_worth?: string;
  criminal_cases: number;
  criminal_details?: string;
  manifesto_summary?: string;
  promises: Array<{
    title: string;
    status: 'Pending' | 'InProgress' | 'Completed';
  }>;
  previous_terms: number;
  social_links?: {
    twitter?: string;
    facebook?: string;
    website?: string;
  };
  election_id?: string;
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

const candidateSchema = new Schema<ICandidate>({
  name: { type: String, required: true },
  party: { type: String, required: true },
  partyId: { type: Schema.Types.ObjectId, ref: 'Party' },
  constituency: { type: String, required: true },
  constituencyId: { type: Schema.Types.ObjectId, ref: 'Constituency' },
  photo_url: { type: String },
  age: { type: Number },
  gender: { type: String },
  education: { type: String },
  net_worth: { type: String },
  criminal_cases: { type: Number, default: 0 },
  criminal_details: { type: String },
  manifesto_summary: { type: String },
  promises: [{
    title: { type: String },
    status: { type: String, default: 'Pending' }
  }],
  previous_terms: { type: Number, default: 0 },
  social_links: {
    twitter: { type: String },
    facebook: { type: String },
    website: { type: String }
  },
  election_id: { type: String },
  is_active: { type: Boolean, default: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Candidate: Model<ICandidate> = mongoose.models.Candidate || mongoose.model<ICandidate>('Candidate', candidateSchema);

export default Candidate;
