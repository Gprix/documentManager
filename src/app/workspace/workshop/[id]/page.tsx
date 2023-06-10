import React from "react";

const DocumentViewPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <div>{id}</div>;
};

export default DocumentViewPage;
