const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransferCommenceRequestMessage = new Schema({
  message_type: { type: String, required: true },
  originator_pubkey: { type: String, required: true },
  beneficiary_pubkey: { type: String, required: true },
  sender_dlt_system: { type: String, required: true },
  recipient_dlt_system: { type: String, required: true },
  client_identity_pubkey: { type: String, required: true },
  server_identity_pubkey: { type: String, required: true },
  hash_asset_profile: { type: String, required: true },
  asset_unit: { type: String, required: false },
  hash_prev_message: { type: String, required: true },
  client_transfer_number: { type: String, required: false },
  client_signature: { type: String, required: true }
});

const TransferCommenceResponseMessage = new Schema({
  message_type: { type: String, required: true },
  client_identity_pubkey: { type: String, required: true },
  server_identity_pubkey: { type: String, required: true },
  hash_commence_request: { type: String, required: true },
  server_transfer_number: { type: String, required: false },
  server_signature: { type: String, required: true }
});

mongoose.model("TransferCommenceRequestMessage", TransferCommenceRequestMessage);
mongoose.model("TransferCommenceResponseMessage", TransferCommenceResponseMessage);