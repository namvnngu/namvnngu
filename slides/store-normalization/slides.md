---
transition: slide-left
hideInToc: true
info: |
  ## Store Normalization

  Structure application's state to minimize redundancy and maintain consistency
---

# Store Normalization

Structure application's state to minimize redundancy and maintain consistency

<div class="uppercase">Nam Nguyen</div>

<div class="abs-bl mx-14 my-12 text-sm opacity-50">Oct 8th, 2024</div>

---
hideInToc: true
---

# Table of contents

<Toc minDepth="1" maxDepth="2" />

---
hideInToc: true
transition: none
---

# Use case

<UnnormalizedTeamDashboard />

<arrow v-click="[1,3]" x1="260" y1="445" x2="260" y2="325" color="#953" width="2" arrowSize="1" />
<span v-click="[1,3]" class="absolute bottom-[75px] left-[180px] text-[#953]">Data from Teams API</span>
<div v-click="[1,3]" class="absolute top-[100px] left-[60px] w-[420px] h-[215px] border-2 border-[#953]"></div>

<arrow v-click="[2,3]" x1="700" y1="445" x2="700" y2="325" color="#953" width="2" arrowSize="1" />
<span v-click="[2,3]" class="absolute bottom-[75px] left-[600px] text-[#953]">Data from Employees API</span>
<div v-click="[2,3]" class="absolute top-[100px] left-[500px] w-[420px] h-[215px] border-2 border-[#953]"></div>

<v-click at="3">
<div class="absolute inset-0 bg-gray-500 opacity-50"></div>
<div class="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
```ts
const store = {
  employees: [ // from Employees API
    { id: "1", name: "Henry", position: "Full Stack Engineer", team: { id: "1", name: "Plutus" } },
    { id: "2", name: "Lance", position: "Full Stack Engineer", team: { id: "1", name: "Plutus" } },
    { id: "3", name: "Paul", position: "Full Stack Engineer", team: { id: "2", name: "Dune" } },
  ],
  teams: [ // from Teams API
    {
      id: "1",
      name: "Plutus",
      members: [
        { id: "1", name: "Henry", position: "Full Stack Engineer" },
        { id: "2", name: "Lance", position: "Full Stack Engineer" },
      ],
    },
    {
      id: "2",
      name: "Dune",
      members: [{ id: "3", name: "Paul", position: "Full Stack Engineer" }],
    },
  ],
};
```
</div>
</v-click>

---
hideInToc: true
---

# Use case

<UnnormalizedTeamDashboard />

---

# What is store normalization?

<v-click at="1">

- Organize and structure application’s state in a way that <span v-mark="{ color: '#d1423f', type: 'underline' }">minimizes redundancy</span> and <span v-mark="{ color: '#d1423f', type: 'underline' }">maintains consistency</span>.

</v-click>

<v-click at="3">

- Create a more <span v-mark="{ color: '#d1423f', type: 'underline' }">efficient, maintainable, and scalable application state</span> in a <span v-mark="{ color: '#d1423f', type: 'underline' }">flat, relational manner</span>.

</v-click>

<v-click at="5">

- <span v-mark="{ color: '#d1423f', type: 'underline' }">Easier</span> to <span v-mark="{ color: '#d1423f', type: 'underline' }">select</span> and <span v-mark="{ color: '#d1423f', type: 'underline' }">update</span> state.

</v-click>

<img v-click="8" src="/happy-face.png" class="mt-10 mx-auto" alt="Happy Face"/>

---
transition: none
---

# Why should store normalization be done?

<v-click at="1">

- Avoid nested and duplidated data.

</v-click>

<div v-if="$clicks >= 2 && $clicks <= 3" class="absolute top-[118px] left-[50%] translate-x-[-50%] z-1 px-4 py-1 border rounded-full bg-[#953] text-sm text-gray-50 text-center font-bold">Without Store Normalization</div>
<div v-if="$clicks >= 4" class="absolute top-[118px] left-[50%] translate-x-[-50%] z-1 px-4 py-1 border rounded-full bg-[#953] text-sm text-gray-50 text-center font-bold">With Store Normalization</div>

<v-click at="2">
````md magic-move {at: 3}
```ts {*|3-5,12,13,19}
const store = {
  employees: [ // from Employees API
    { id: "1", name: "Henry", position: "Full Stack Engineer", team: { id: "1", name: "Plutus" } },
    { id: "2", name: "Lance", position: "Full Stack Engineer", team: { id: "1", name: "Plutus" } },
    { id: "3", name: "Paul", position: "Full Stack Engineer", team: { id: "2", name: "Dune" } },
  ],
  teams: [ // from Teams API
    {
      id: "1",
      name: "Plutus",
      members: [
        { id: "1", name: "Henry", position: "Full Stack Engineer" },
        { id: "2", name: "Lance", position: "Full Stack Engineer" },
      ],
    },
    {
      id: "2",
      name: "Dune",
      members: [{ id: "3", name: "Paul", position: "Full Stack Engineer" }],
    },
  ],
};
```

```ts
const store = {
  employees: {
    1: { id: "1", name: "Henry", position: "Full Stack Engineer", team: "1" },
    2: { id: "2", name: "Lance", position: "Full Stack Engineer", team: "1" },
    3: { id: "3", name: "Paul", position: "Full Stack Engineer", team: "2" },
  },
  teams: {
    1: { id: "1", name: "Plutus", members: ["1", "2"] },
    2: { id: "2", name: "Dune", members: ["3"] },
  },
};
```
````
</v-click>

---
hideInToc: true
transition: none
---

# Why should store normalization be done?

- Improve performance.

<div v-click="1" class="text-center font-bold">Without Store Normalization</div>
<div v-click="1" class="text-center text-sm">What if Henry's position is updated temporarily in the front-end?</div>

<div v-click="1" class="grid grid-cols-2 gap-2">
```ts {*}{maxHeight:'320px'}
const store = {
  employees: [ // from Employees API
    { id: "1", name: "Henry", position: "Full Stack Engineer", team: { id: "1", name: "Plutus" } },
    { id: "2", name: "Lance", position: "Full Stack Engineer", team: { id: "1", name: "Plutus" } },
    { id: "3", name: "Paul", position: "Full Stack Engineer", team: { id: "2", name: "Dune" } },
  ],
  teams: [ // from Teams API
    {
      id: "1",
      name: "Plutus",
      members: [
        { id: "1", name: "Henry", position: "Full Stack Engineer" },
        { id: "2", name: "Lance", position: "Full Stack Engineer" },
      ],
    },
    {
      id: "2",
      name: "Dune",
      members: [{ id: "3", name: "Paul", position: "Full Stack Engineer" }],
    },
  ],
};
```
  <div>
```tsx {*|*|2-10,13}
const Team = ({ id }) => {
  const members = useSelector(
                    s => s.teams
                          .find(t => t.id === id));
  if (!members || members.length === 0) return null;
  return (
    <>
     {members.map(m => <Employee employee={m} />)}
    </>
  );
};
const Employee = ({ employee }) => {
    return <span>{employee.position}</span>;
}
```
  </div>
</div>

---
hideInToc: true
transition: none
---

# Why should store normalization be done?

- Improve performance.

<div class="text-center font-bold">With Store Normalization</div>
<div class="text-center text-sm">What if Henry's position is updated temporarily in the front-end?</div>

<div class="grid grid-cols-2 gap-2">
```ts
const store = {
  employees: {
    1: { id: "1", name: "Henry", position: "Full Stack Engineer", team: "1" },
    2: { id: "2", name: "Lance", position: "Full Stack Engineer", team: "1" },
    3: { id: "3", name: "Paul", position: "Full Stack Engineer", team: "2" },
  },
  teams: {
    1: { id: "1", name: "Plutus", members: ["1", "2"] },
    2: { id: "2", name: "Dune", members: ["3"] },
  },
};
```
  <div>
```tsx {*|14-16}
const Team = ({ id }) => {
  const members = useSelector(
                    s => s.teams[id]?.members,
                    shallowEqual,
                  );
  if (!members || members.length === 0) return null;
  return (
    <>
     {members.map(id => <Employee id={id} />)}
    </>
  );
};
const Employee = ({ id }) => {
  const position = useSelector(
                     s => s.employees[id]?.position);
  return position ? <span>{position}</span> : null;
}
```
  </div>
</div>

---
hideInToc: true
transition: none
---

# Why should store normalization be done?

- Simple reducer

<div v-click="1" class="text-center font-bold">Without Store Normalization</div>
<div v-click="1" class="text-center text-sm">What if Henry's position is updated temporarily in the front-end?</div>

<div v-click="1" class="grid grid-cols-2 gap-2">
```ts {*}{maxHeight:'320px'}
// assume `store` wrapped in `produce` of `immer`
const store = {
  employees: [ // from Employees API
    { id: "1", name: "Henry", position: "Full Stack Engineer", team: { id: "1", name: "Plutus" } },
    { id: "2", name: "Lance", position: "Full Stack Engineer", team: { id: "1", name: "Plutus" } },
    { id: "3", name: "Paul", position: "Full Stack Engineer", team: { id: "2", name: "Dune" } },
  ],
  teams: [ // from Teams API
    {
      id: "1",
      name: "Plutus",
      members: [
        { id: "1", name: "Henry", position: "Full Stack Engineer" },
        { id: "2", name: "Lance", position: "Full Stack Engineer" },
      ],
    },
    {
      id: "2",
      name: "Dune",
      members: [{ id: "3", name: "Paul", position: "Full Stack Engineer" }],
    },
  ],
};
```
  <div>
```ts
const action = {
  type: "UPDATE_POSITION",
  payload: {
    id: "1",
    position: "Senior Full Stack Developer",
  },
}
// reducer
const updated = action.payload;
const henry = store.employees
                   .find(e => e.id === updated.id);
if (!henry) return;
henry.position = updated.position;
const henryTeam = store.teams
                       .find(t => t.id === henry.team.id);
const _henry = henryTeam?.members
                         .find(m => m.id === henry.id);
if (_henry) _henry.position = updated.position;
```
  </div>
</div>

---
hideInToc: true
---

# Why should store normalization be done?

- Simple reducer

<div class="text-center font-bold">With Store Normalization</div>
<div class="text-center text-sm">What if Henry's position is updated temporarily in the front-end?</div>

<div class="grid grid-cols-2 gap-2">
```ts {*}
// assume `store` wrapped in `produce` of `immer`
const store = {
  employees: {
    1: { id: "1", name: "Henry", position: "Full Stack Engineer", team: "1" },
    2: { id: "2", name: "Lance", position: "Full Stack Engineer", team: "1" },
    3: { id: "3", name: "Paul", position: "Full Stack Engineer", team: "2" },
  },
  teams: {
    1: { id: "1", name: "Plutus", members: ["1", "2"] },
    2: { id: "2", name: "Dune", members: ["3"] },
  },
};
```
  <div>
```tsx
const action = {
  type: "UPDATE_POSITION",
  payload: {
    id: "1",
    position: "Senior Full Stack Developer",
  },
}
// reducer
const updated = action.payload;
const henry = store.employees[updated.id];
if (henry) henry.position = updated.position;
```
  </div>
</div>

---
transition: none
---

# How can store normalization be done?

<v-click>

Design normalized stores.

</v-click>

<v-clicks>

- Each type of data gets its own "table" keyed by ID.
- Each "data table" should store the individual items in an object, with the IDs of the items as keys and the items themselves as the values.
- Any references to individual items should be done by storing the item's ID.
- Arrays of IDs should be used to indicate ordering.

</v-clicks>

<v-click at="2">

```ts
type Employee = { id: string; name: string; position: string; team: string };
const employees: Record<string, Employee> = {
    1: { id: "1", name: "Henry", position: "Full Stack Engineer", team: "1" },
    2: { id: "2", name: "Lance", position: "Full Stack Engineer", team: "1" },
    3: { id: "3", name: "Paul", position: "Full Stack Engineer", team: "2" },
};
const store = {
    employees,
    sortedEmployees: { byNameAZ: ["1", "2", "3"] },
};
```

</v-click>

<a href="https://redux.js.org/usage/structuring-reducers/normalizing-state-shape" target="_blank" rel="noopener noreferrer"><span class="absolute bottom-4 right-14 text-xs opacity-50">_Normalizing State Shape | Redux_, 2021</span></a>

---
transition: none
hideInToc: true
---

# How can store normalization be done?

Relationships.

<v-clicks>

- Relationships can be expressed through linked properties.
- Relationships can be expressed through linked tables.
- Many-to-many relationships are recommended to use linked tables.

</v-clicks>

<v-click at="1">

```ts {monaco}
export const store = {
  employees: {
    1: { id: "1", name: "Henry", position: "Full Stack Engineer", team: "1" },
    2: { id: "2", name: "Lance", position: "Full Stack Engineer", team: "1" },
    3: { id: "3", name: "Paul", position: "Full Stack Engineer", team: "2" },
  },
  teams: {
    1: { id: "1", name: "Plutus", members: ["1", "2"] },
    2: { id: "2", name: "Dune", members: ["3"] },
  },
};
```

</v-click>

---
hideInToc: true
---

# How can store normalization be done?

Create normalized data.

<v-clicks depth="2" >

- By hand.
- With libraries.
    - [Normalizr](https://github.com/paularmstrong/normalizr) normalizes nested JSON according to a schema.
    - [Redux Toolkit](https://redux-toolkit.js.org/) provides [createEntityAdapter](https://redux-toolkit.js.org/usage/usage-guide#normalizing-with-createentityadapter).

</v-clicks>

---

# Quiz

```ts {monaco}
export const store = {
  employees: {
    1: { id: "1", name: "Henry", position: "Full Stack Engineer", team: "1" },
    2: { id: "2", name: "Lance", position: "Full Stack Engineer", team: "1" },
    3: { id: "3", name: "Paul", position: "Full Stack Engineer", team: "2" },
  },
  teams: {
    1: { id: "1", name: "Plutus", members: ["1", "2"] },
    2: { id: "2", name: "Dune", members: ["3"] },
  },
};
```

If Lance and Paul swap teams with each other, which approach is better to get the number of members in Plutus's team?

````md magic-move
```ts
const PLUTUS_TEAM_ID = "1"
// A,
const count = useSelector(s => s.teams[PLUTUS_TEAM_ID].members.length);
// B,
const count = useSelector(s => s.teams[PLUTUS_TEAM_ID].members).length;
// or A and B are the same
```

```ts
const PLUTUS_TEAM_ID = "1"
// Answer is A
const count = useSelector(s => s.teams[PLUTUS_TEAM_ID].members.length);
```
````

---
layout: center
---

# Thank You! 🖤

<PoweredBySlidev class="mt-10 important-flex flex-justify-center" />

---
layout: center
---

# Q&A
