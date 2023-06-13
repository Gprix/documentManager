export function convertToJSON(node: any): any {
  if (!node) return null;

  const jsonNode: any = {};

  // Assign properties of the node to the JSON representation
  jsonNode.type = node.type;
  // Add any other properties you need in your JSON representation

  // If the node has child nodes, convert them recursively
  if (node.nodes && node.nodes.length > 0) {
    jsonNode.nodes = node.nodes.map((childNode: any) =>
      convertToJSON(childNode)
    );
  }

  return jsonNode;
}

export function getDocumentJSON(documentData: any): any {
  const json: any = {};

  json.docRows = documentData.docRows.map((docRow: any) => {
    return {
      nodes: docRow.nodes.map((node: any) => convertToJSON(node)),
    };
  });

  return json;
}
