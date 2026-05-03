import pickle
import os
from collections import Counter

# Path to the knowledge base
KNOWLEDGE_BASE_PATH = 'knowledge_base.pkl'

def analyze_knowledge_base():
    if not os.path.exists(KNOWLEDGE_BASE_PATH):
        print(f"Knowledge base not found at {KNOWLEDGE_BASE_PATH}")
        return

    with open(KNOWLEDGE_BASE_PATH, 'rb') as f:
        knowledge_base = pickle.load(f)

    print(f"Total roles in KB: {len(knowledge_base)}")

    # 1. Most common skills across ALL roles
    all_skill_counts = Counter()
    for role, skills in knowledge_base.items():
        for skill in skills:
            all_skill_counts[skill.lower().strip()] += 1

    print("\n--- Top 50 Most Frequent Skills Across All Roles ---")
    for skill, count in all_skill_counts.most_common(50):
        print(f"{skill}: {count} roles")

    # 2. Identify skills that are identical or very similar to their roles
    vague_candidates = set()
    for role, skills in knowledge_base.items():
        role_lower = role.lower().strip()
        for skill in skills:
            skill_lower = skill.lower().strip()
            if skill_lower == role_lower:
                vague_candidates.add(skill_lower)
            # Check if skill is a major part of the role name
            if skill_lower in role_lower and len(skill_lower) > 5:
                vague_candidates.add(skill_lower)

    print("\n--- Potential Vague Skills (matching role names) ---")
    for skill in sorted(list(vague_candidates))[:50]:
        print(skill)

if __name__ == "__main__":
    analyze_knowledge_base()
