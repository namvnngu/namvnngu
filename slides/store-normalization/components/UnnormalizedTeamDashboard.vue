<script setup>
  import { ref, onUnmounted } from "vue";

  const store = {
    employees: [
      { id: "1", name: "Henry", position: "Full Stack Engineer", team: { id: "1", name: "Plutus" } },
      { id: "2", name: "Lance", position: "Full Stack Engineer", team: { id: "1", name: "Plutus" } },
      { id: "3", name: "Paul", position: "Full Stack Engineer", team: { id: "2", name: "Dune" } },
    ],
    teams: [
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

  const teamIds = ref({});
  const employeeIds = ref({});
  const fetching = ref(false);
  let timeoutId = -1;

  const fetchTeams = () => {
    clearTimeout(timeoutId);
    fetching.value = true;
    timeoutId = setTimeout(() => {
      store.teams[0].members[0].position = "Senior Full Stack Engineer";
      store.teams[0].members[1] = {
        id: "3",
        name: "Paul",
        position: "Full Stack Engineer"
      };
      store.teams[1].members[0] = {
        id: "2",
        name: "Lance",
        position: "Full Stack Engineer"
      };
      fetching.value = false;
    }, 2000);
  }

  onUnmounted(() => clearTimeout(timeoutId));
</script>
<template>
  <div class="border rounded p-4">
    <div class="flex gap-4">

      <div class="flex-1">
        <div class="flex justify-between items-center text-xl font-bold text-gray-900">
          <span>Teams</span>
          <button
            class="group relative inline-block text-xs font-medium text-gray-950 focus:outline-none active:text-gray-500"
            :class="{ 'opacity-50 pointer-events-none': fetching }"
            @click="fetchTeams"
          >
            <span
              class="absolute rounded inset-0 translate-x-0 translate-y-0 bg-gray-950 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
            ></span>
            <span class="relative flex items-center gap-2 rounded border border-current bg-white px-2 py-1">
              <svg class="inline w-3 h-3 text-gray-300 fill-gray-950" :class="{ 'animate-spin': fetching }" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 489.645 489.645">
                <path d="M460.656,132.911c-58.7-122.1-212.2-166.5-331.8-104.1c-9.4,5.2-13.5,16.6-8.3,27c5.2,9.4,16.6,13.5,27,8.3 c99.9-52,227.4-14.9,276.7,86.3c65.4,134.3-19,236.7-87.4,274.6c-93.1,51.7-211.2,17.4-267.6-70.7l69.3,14.5 c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-122.8-25c-20.6-2-25,16.6-23.9,22.9l15.6,123.8 c1,10.4,9.4,17.7,19.8,17.7c12.8,0,20.8-12.5,19.8-23.9l-6-50.5c57.4,70.8,170.3,131.2,307.4,68.2 C414.856,432.511,548.256,314.811,460.656,132.911z"></path>
              </svg>
            </span>
          </button>
        </div>
        <div class="h-px bg-gradient-to-r from-neutral-500 to-transparent mt-1 mb-6"></div>
        <div class="space-y-4">
          <div v-for="(team) in store.teams">
            <div
                class="flex justify-between items-center border rounded-lg px-4 py-2 text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                :class="{ 'bg-gray-100 text-gray-700': teamIds[team.id] }"
                @click="teamIds[team.id]=!teamIds[team.id]"
                >
                <span>{{ team.name }}</span>
                <span class="font-bold">{{ teamIds[team.id]  ? "—" : "+" }}</span>
            </div>
            <dl v-if="teamIds[team.id]" class="mt-2 space-y-2.5">
              <div
                  v-for="(member) in team.members"
                  class="flex justify-between items-center px-4 text-gray-500 text-xs"
              >
                  <dt>{{ member.name }}</dt>
                  <dd>{{ member.position }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div class="w-px bg-gray-100"></div>

      <div class="flex-1">
        <div class="text-xl font-bold text-gray-900">Employees</div>
        <div class="h-px bg-gradient-to-r from-neutral-500 to-transparent mt-1 mb-6"></div>
        <div class="space-y-4">
          <div v-for="(employee) in store.employees">
            <div
                class="flex justify-between items-center border rounded-lg px-4 py-2 text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                :class="{ 'bg-gray-100 text-gray-700': employeeIds[employee.id] }"
                @click="employeeIds[employee.id]=!employeeIds[employee.id]"
                >
                <span>{{ employee.name }}</span>
                <span class="font-bold">{{ employeeIds[employee.id]  ? "—" : "+" }}</span>
            </div>
            <dl v-if="employeeIds[employee.id]" class="mt-2 space-y-2.5">
              <div class="flex justify-between items-center px-4 text-gray-500 text-xs">
                <dt class="font-medium text-gray-900">Name</dt>
                <dd class="text-gray-700">{{ employee.name }}</dd>
              </div>
              <div class="flex justify-between items-center px-4 text-gray-500 text-xs">
                <dt class="font-medium text-gray-900">Position</dt>
                <dd class="text-gray-700">{{ employee.position }}</dd>
              </div>
              <div class="flex justify-between items-center px-4 text-gray-500 text-xs">
                <dt class="font-medium text-gray-900">Team</dt>
                <dd class="text-gray-700">{{ employee.team.name }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
