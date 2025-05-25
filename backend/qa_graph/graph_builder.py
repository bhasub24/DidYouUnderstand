import networkx as nx
from datetime import datetime
import uuid

class QAInteractionGraph:
    def __init__(self):
        self.graph = nx.DiGraph()

    def add_interaction(self, student_id, question, answer, parent_id=None, metadata=None):
        node_id = f"{student_id}_{uuid.uuid4().hex[:8]}"
        timestamp = datetime.now()

        node_data = {
            "student_id": student_id,
            "question": question,
            "answer": answer,
            "timestamp": timestamp,
            **(metadata or {})
        }

        self.graph.add_node(node_id, **node_data)

        if parent_id:
            self.graph.add_edge(parent_id, node_id)

        return node_id

    def get_path_to_root(self, node_id):
        path = []
        current = node_id
        while True:
            preds = list(self.graph.predecessors(current))
            if not preds:
                break
            current = preds[0]
            path.insert(0, current)
        path.append(node_id)
        return path

    def get_node(self, node_id):
        return self.graph.nodes[node_id]

    def get_sibling_clarifications(self, node_id):
        preds = list(self.graph.predecessors(node_id))
        if not preds:
            return []
        parent = preds[0]
        children = list(self.graph.successors(parent))
        return [c for c in children if c != node_id]