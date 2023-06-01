#!/usr/bin/env python
# coding: utf-8

# In[1]:


#!/usr/bin/env python

# For this script to run, you'll need the GAME_MASTER.json file from:
#
# https://raw.githubusercontent.com/pokemongo-dev-contrib/pokemongo-game-master/master/versions/latest/GAME_MASTER.json
#
# ... in the current directory.

import csv
from collections import defaultdict
import json
import re


# In[2]:


TYPES_IN_ORDER = [
    'Normal',
    'Fighting',
    'Flying',
    'Poison',
    'Ground',
    'Rock',
    'Bug',
    'Ghost',
    'Steel',
    'Fire',
    'Water',
    'Grass',
    'Electric',
    'Psychic',
    'Ice',
    'Dragon',
    'Dark',
    'Fairy',
]


# In[12]:


def simplify_name(s):
    return re.sub(r'^POKEMON_TYPE_', '', s).title()

def make_effectiveness_array(attack_scalars):
    return [
        (TYPES_IN_ORDER[i], attack_scalar)
        for i, attack_scalar
        in enumerate(attack_scalars)
    ]

def make_scalar_lookup(type_templates):
    scalar_lookup = defaultdict(dict)
    for e in type_templates:
        attack_scalars = e['data']['typeEffective']['attackScalar']
        from_type = simplify_name(e['templateId'])
        for to_type, scalar in make_effectiveness_array(attack_scalars):
            scalar_lookup[from_type][to_type] = scalar
    return scalar_lookup

def include_non_neutral(scalar_lookup, from_type, to_type):
    a_scalar = scalar_lookup[from_type][to_type]
    b_scalar = scalar_lookup[to_type][from_type]
    if a_scalar == b_scalar and a_scalar == 1:
        return False
    return True

def include_any_supereffective(scalar_lookup, from_type, to_type):
    a_scalar = scalar_lookup[from_type][to_type]
    b_scalar = scalar_lookup[to_type][from_type]
    if a_scalar > 1 or b_scalar > 1:
        return True
    return False

def include_supereffective_to_neutral_or_worse(scalar_lookup, from_type, to_type):
    a_scalar = scalar_lookup[from_type][to_type]
    b_scalar = scalar_lookup[to_type][from_type]
    if (a_scalar > 1 and b_scalar <= 1) or (a_scalar <= 1 and b_scalar > 1):
        return True
    return False

def include_all(_scalar_lookup, _from_type, _to_type):
    return True

def include_only_dominant(scalar_lookup, from_type, to_type):
    a_scalar = scalar_lookup[from_type][to_type]
    b_scalar = scalar_lookup[to_type][from_type]
    if (a_scalar > 1 and b_scalar < 1) or (a_scalar < 1 and b_scalar > 1):
        return True
    return False

def generate_csv(filename, scalar_lookup, include_p):
    with open(filename, 'w') as f:
        writer = csv.writer(f)
        writer.writerow(['From', 'To', 'Effectiveness'])
        for from_type in TYPES_IN_ORDER:
            for to_type in TYPES_IN_ORDER:
                if not include_p(scalar_lookup, from_type, to_type):
                    continue
                scalar = scalar_lookup[from_type][to_type]
                writer.writerow([from_type, to_type, scalar])


# In[10]:


with open('V2_GAME_MASTER.json') as fr:
    data = json.load(fr)
    type_templates = [
        e for e in data['template']
        if e['templateId'].startswith('POKEMON_TYPE_')
    ]


# In[13]:


scalar_lookup = make_scalar_lookup(type_templates)


# In[15]:


generate_csv('all.csv', scalar_lookup, include_all)
generate_csv('dominant.csv', scalar_lookup, include_only_dominant)
generate_csv('supereffective.csv', scalar_lookup, include_supereffective_to_neutral_or_worse)
generate_csv('any-supereffective.csv', scalar_lookup, include_any_supereffective)
generate_csv('non-neutral.csv', scalar_lookup, include_non_neutral)

