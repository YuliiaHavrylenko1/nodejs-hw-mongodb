import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    isFavourite: { type: Boolean, default: false },
    contactType: { type: String, default: 'personal' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ✅ додано userId
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
