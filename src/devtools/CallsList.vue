<template>
  <v-list nav>
    <v-subheader>Calls</v-subheader>
    <v-list-item-group v-model="selectedCall" color="primary">
      <v-list-item v-for="(call, i) in calls" :key="i">
        <v-list-item-content>
          <v-list-item-title v-html="call.startedDateTime"></v-list-item-title>
          <v-list-item-subtitle
            v-html="call.startedDateTime"
          ></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: "CallsList",
  props: {
    calls: {
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
