import networkx as nx
import matplotlib.pyplot as plt

# Create the graph
G = nx.DiGraph()

# Example interactions (simplified)
interactions = {
    "Q1": {
        "question": "What is gradient descent?",
        "answer": "It is an optimization method to minimize functions.",
    },
    "Q2": {
        "question": "Why do we take the negative gradient?",
        "answer": "Because it points in the direction of steepest descent.",
    },
    "Q3": {
        "question": "How is the learning rate chosen?",
        "answer": "It is a hyperparameter that controls step size.",
    },
    "Q4": {
        "question": "Can gradient descent get stuck?",
        "answer": "Yes, in local minima or saddle points.",
    }
}

# Add nodes
for node_id, content in interactions.items():
    G.add_node(node_id, label=content["question"])

# Add edges (Q1 → Q2, Q1 → Q3, Q3 → Q4)
G.add_edge("Q1", "Q2")
G.add_edge("Q1", "Q3")
G.add_edge("Q3", "Q4")

# Draw the graph
pos = nx.spring_layout(G, seed=42)
labels = {node: f"{node}: {G.nodes[node]['label']}" for node in G.nodes}
plt.figure(figsize=(10, 6))
nx.draw(G, pos, with_labels=True, node_color='lightblue', node_size=3000, font_size=8, arrows=True)
nx.draw_networkx_labels(G, pos, labels, font_size=9)
plt.title("Sample Q&A Interaction Graph")
plt.axis("off")
plt.show()