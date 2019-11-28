<template>
  <v-list nav>
    <v-list-group
      v-for="(batch, i) in batches"
      :key="i"
      v-model="batch.selected"
    >
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title
            v-text="batch.source.startedDateTime"
          ></v-list-item-title>
        </v-list-item-content>
      </template>

      <v-list-item v-for="request in batch.calls.requests" :key="request.url">
        <v-list-item-content>
          <v-list-item-title v-text="request.url"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<script>
export default {
  name: "CallsList",
  props: {
    batches: {
      type: Array
    }
  },
  data() {
    return {
      selectedCall: null
    };
  }
};
</script>

<style scoped></style>
