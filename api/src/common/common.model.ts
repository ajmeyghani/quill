const commonModel = oid => {
  if (!oid) {
    throw new Error("Expected ObjectId.");
  }

  return {
    orgId: { type: String, required: true },
    userId: { type: oid, required: true }
  };
};

export default commonModel;
